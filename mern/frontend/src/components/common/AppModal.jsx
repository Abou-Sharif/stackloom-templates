import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { modalContentClasses } from "@/lib/ui-variant-classes";
import { useAppPreset } from "@/hooks/useAppPreset";
import { cn } from "@/lib/utils";

export function AppModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  variant: explicitVariant,
  className,
}) {
  const preset = useAppPreset();
  const variant = explicitVariant || preset?.componentLayouts?.modal || "centered";

  if (variant === "sheet") {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className={className}>
          {(title || description) && (
            <SheetHeader>
              {title && <SheetTitle>{title}</SheetTitle>}
              {description && <SheetDescription>{description}</SheetDescription>}
            </SheetHeader>
          )}
          {children}
          {footer && <SheetFooter>{footer}</SheetFooter>}
        </SheetContent>
      </Sheet>
    );
  }

  const contentClass = modalContentClasses[variant] || modalContentClasses.centered;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(contentClass, className)}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
