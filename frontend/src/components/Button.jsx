import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "bg-[#6E2FEC]",
    textColor = "text-white",
    hover = "hover:bg-[#5025D1]",
    className = "",
    ...props
}) {
  return (
    <button className={`font-bold py-2 rounded-lg shadow-md mb-4 ${bgColor} ${textColor} ${hover} ${className} `} {...props}>
        {children}
    </button>
  )
}

export default Button
