import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormRow, FormActions } from "@/components/layout/FormLayout";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function RegisterForm() {
  const { register: createAccount } = useAuth();
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(createAccount)}>
      <FormRow>
        <FormField label="Name" error={formState.errors.name?.message}>
          <Input id="name" autoComplete="name" {...register("name")} />
        </FormField>
        <FormField label="Email" error={formState.errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
        </FormField>
        <FormField label="Password" error={formState.errors.password?.message}>
          <Input id="password" type="password" autoComplete="new-password" {...register("password")} />
        </FormField>
      </FormRow>
      <FormActions>
        <Button className="w-full" disabled={formState.isSubmitting}>Create account</Button>
      </FormActions>
    </form>
  );
}
