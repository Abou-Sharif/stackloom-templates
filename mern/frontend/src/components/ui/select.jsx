import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { selectTriggerClasses } from "@/lib/ui-variant-classes";
import { cn } from "@/lib/utils";

const SelectContext = React.createContext({});

const Select = React.forwardRef(
  ({ className, children, defaultValue, value: controlledValue, onValueChange, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolled;
    const listId = React.useId();

    const handleValueChange = (newValue) => {
      if (!isControlled) setUncontrolled(newValue);
      onValueChange?.(newValue);
      setOpen(false);
    };

    React.useEffect(() => {
      if (!open) return;
      const onDoc = (e) => {
        if (ref?.current?.contains(e.target)) return;
        setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }, [open, ref]);

    return (
      <SelectContext.Provider
        value={{ open, setOpen, value, onValueChange: handleValueChange, listId }}
      >
        <div ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </div>
      </SelectContext.Provider>
    );
  },
);
Select.displayName = "Select";

const SelectTrigger = React.forwardRef(({ className, variant = "outline", children, ...props }, ref) => {
  const { open, setOpen, value, listId } = React.useContext(SelectContext);
  const variantClass = selectTriggerClasses[variant] || selectTriggerClasses.outline;

  return (
    <button
      ref={ref}
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={listId}
      className={cn(variantClass, className)}
      onClick={() => setOpen(!open)}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(true);
        }
        if (e.key === "Escape") setOpen(false);
      }}
      {...props}
    >
      {children || <span>{value}</span>}
      <ChevronDown className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef(({ className, placeholder, ...props }, ref) => {
  const { value } = React.useContext(SelectContext);
  return (
    <span ref={ref} className={cn("block truncate", className)} {...props}>
      {value || placeholder}
    </span>
  );
});
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open, listId } = React.useContext(SelectContext);
  if (!open) return null;

  return (
    <div
      ref={ref}
      id={listId}
      role="listbox"
      className={cn(
        "absolute z-50 mt-1 max-h-60 min-w-[8rem] w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext);
  const isSelected = selectedValue === value;

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        isSelected && "bg-accent text-accent-foreground",
        className,
      )}
      onClick={() => onValueChange(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onValueChange(value);
        }
      }}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center" aria-hidden>
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  );
});
SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} role="separator" {...props} />
));
SelectSeparator.displayName = "SelectSeparator";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectSeparator };
