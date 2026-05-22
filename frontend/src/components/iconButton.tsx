import { useState } from "react";

interface iconInputs extends React.ComponentProps<"button"> {
    className?: string,
    svg: React.FC<React.ComponentProps<"svg">>
    variant?: "Default" | "Hover"
}

export default function IconButton({className, svg: SvgComponent, variant="Default", ...props}: iconInputs) {
    const [hovered, setHover] = useState("")
    const buttonClass =
        "size-8 bg-gray-200 rounded-sm flex justify-center items-center " +
        className + " " +
        hovered
    return(
        <button className={buttonClass} onMouseEnter={() => setHover("border border-b-blue-base")} onMouseLeave={() => setHover("")} {...props}>{<SvgComponent className="fill-gray-600 size-4"/>}</button>
    )
}