import { cardVariantClasses } from "@/lib/ui-variant-classes";
import { cn } from "@/lib/utils";

export function Card({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(cardVariantClasses[variant] || cardVariantClasses.default, className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("space-y-1.5 p-[var(--card-padding)]", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h2 className={cn("text-xl font-semibold", className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-[var(--card-padding)] pt-0", className)} {...props} />;
}
