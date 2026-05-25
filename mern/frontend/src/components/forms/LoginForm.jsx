import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormRow, FormActions } from "@/components/layout/FormLayout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const { login } = useAuth();
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(login)}>
      <FormRow>
        <FormField label="Email" error={formState.errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
        </FormField>
        <FormField label="Password" error={formState.errors.password?.message}>
          <Input id="password" type="password" autoComplete="current-password" {...register("password")} />
        </FormField>
      </FormRow>
      <FormActions>
        <Button className="w-full" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? <LoadingSpinner className="p-0" label="Signing in" /> : "Sign in"}
        </Button>
      </FormActions>
    </form>
  );
}
