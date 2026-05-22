import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const textVariants = cva("", {
    variants:{
        variant: {
            "Text Xl": ["text-2xl/8", "font-open-sans", "font-bold"],
            "Text Lg": ["text-lg/6", "font-open-sans", "font-bold"],
            "Text Md": ["text-sm/4.5", "font-open-sans", "font-semibold"],
            "Text Sm": ["text-xs/4", "font-open-sans", "font-normal"],
            "Text Xs": ["text-tiny/3.5", "font-open-sans", "font-normal", "uppercase"]
        }
    },
    defaultVariants: {
        variant: "Text Md"
    }
})

interface TextInputs extends VariantProps<typeof textVariants>{
    as?: keyof React.JSX.IntrinsicElements,
    className?: string,
    children: React.ReactNode
}

export default function Text({as = "span", className, variant, children, ...props}: TextInputs) {
    return React.createElement(
        as,
        {
            className: textVariants({variant, className}),
            ...props
        },
        children
    )
}