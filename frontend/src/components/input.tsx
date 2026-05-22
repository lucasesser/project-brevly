import { cva, type VariantProps } from "class-variance-authority"
import Text from "./text"
import Warning from "../assets/icons/warning.svg?react"

const inputVariants = cva("border rounded-lg font-open-sans text-sm/4.5 h-12 px-4 font-normal items-center w-full outline-none",
    {
        variants: {
            variant: {
                "default": "border-gray-300",
                "active": "border-blue-base",
                "error": "border-danger"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
)

interface inputs extends VariantProps<typeof inputVariants>, React.InputHTMLAttributes<HTMLInputElement>{
    title: string,
    placeholder?: string,
    className?: string,
    value?: string,
    errorMessage?: string
}

const colorMap = {
  default: "",
  active: "text-blue-base",
  error: "text-danger"
}

export default function Input({title, placeholder, className, errorMessage, variant, ...props}: inputs) {

    return(
        <div className="flex flex-col justify-start gap-2">
            <Text variant="Text Xs" className={colorMap[variant as keyof typeof colorMap]}>{title}</Text>
            <input className={inputVariants({variant, className})} placeholder={placeholder} {...props}/>
            {variant === "error" && <div className="flex items-center gap-2"><Warning className="fill-danger size-3"/><Text variant="Text Sm">{errorMessage}</Text></div>}
        </div>
    )
}