import React from "react"

export const Logo = ({color}) => {
    return (
        <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="M4,8.05V4.49A2.42,2.42,0,0,1,6.4,2h12A2.58,2.58,0,0,1,21,4.49V8.05a4.49,4.49,0,0,0-4,4.45V14H8V12.5A4.49,4.49,0,0,0,4,8.05ZM21.5,9A3.5,3.5,0,0,0,18,12.5V15H7V12.5a3.5,3.5,0,1,0-5,3.15V18.5A2.44,2.44,0,0,0,4,21v2H5V21H20v2h1V20.92a2.56,2.56,0,0,0,2-2.42V15.64A3.49,3.49,0,0,0,21.5,9Z" fill={color?color:"white"} /></svg>
    )
}

export default Logo