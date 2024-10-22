import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { Skeleton } from "./skeleton"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const textareaVariants = cva(
  "flex min-h-[60px] w-full rounded-md border border-input px-6 py-4 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        fidelity:
          "bg-muted rounded-none border-0 border-b-2 border-foreground focus-visible:border-primary focus-visible:ring-0 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)


const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps & VariantProps<typeof textareaVariants>>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

const SkeletonTextarea: React.FC<React.PropsWithChildren & { className?: string } & VariantProps<typeof textareaVariants>> = ({
  variant, className, children
}) => {
  return <Skeleton className={cn(textareaVariants({ variant, className }))} children={children} />
}

export { Textarea, SkeletonTextarea }
