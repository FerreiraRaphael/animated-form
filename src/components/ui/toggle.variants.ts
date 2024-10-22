import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

export const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-muted text-secondary-foreground shadow-sm hover:bg-foreground/60 hover:text-primary-foreground data-[state=on]:bg-foreground data-[state=on]:text-primary-foreground hover:data-[state=on]:bg-foreground/80",
        fidelity: cn(
          "transition shadow-sm bg-muted border-muted border",
          "hover:shadow hover:text-primary hover:border-primary/60",
          "data-[state=on]:text-primary data-[state=on]:border-primary hover:data-[state=on]:border-primary/80"
        )
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
