import React from "react"

export const HamburgerIcon = ({style, color}) => {
    return (
        <svg className={style} viewBox="0 0 100 80" width="30" height="40">
            <rect rx={10} fill={color?color:"white"} width="100%" height="10"></rect>
            <rect rx={10} fill={color?color:"white"} y="30" width="100%" height="10"></rect>
            <rect rx={10} fill={color?color:"white"} y="60" width="100%" height="10"></rect>
        </svg>
    )
}

export default HamburgerIcon