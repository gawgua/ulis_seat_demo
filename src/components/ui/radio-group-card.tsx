import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

const RadioGroupCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-3", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroupCard.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupCardItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn("group", className)}
      {...props}
    >
      <Card className={cn(
        "cursor-pointer transition-all hover:border-blue-300 shadow-none",
        "group-focus:outline-none group-focus-visible:ring-2 group-focus-visible:ring-blue-500 group-focus-visible:ring-offset-2",
        "group-disabled:cursor-not-allowed group-disabled:opacity-50",
        "group-data-[state=checked]:border-blue-600 group-data-[state=checked]:bg-blue-50 group-data-[state=checked]:dark:bg-blue-400",
      )}>
        {children}
      </Card>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupCardItem.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroupCardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CardHeader>
>(({ className, ...props }, ref) => {
  return (
    <CardHeader ref={ref} className={className} {...props} />
  )
})
RadioGroupCardHeader.displayName = "RadioGroupCardHeader"

const RadioGroupCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof CardTitle>
>(({ className, ...props }, ref) => {
  return (
    <CardTitle ref={ref} className={className} {...props} />
  )
})
RadioGroupCardTitle.displayName = "RadioGroupCardTitle"

const RadioGroupCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof CardDescription>
>(({ className, ...props }, ref) => {
  return (
    <CardDescription ref={ref} className={className} {...props} />
  )
})
RadioGroupCardDescription.displayName = "RadioGroupCardDescription"

const RadioGroupCardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CardContent>
>(({ className, ...props }, ref) => {
  return (
    <CardContent ref={ref} className={className} {...props} />
  )
})
RadioGroupCardContent.displayName = "RadioGroupCardContent"

export {
  RadioGroupCard,
  RadioGroupCardItem,
  RadioGroupCardHeader,
  RadioGroupCardTitle,
  RadioGroupCardDescription,
  RadioGroupCardContent,
}
