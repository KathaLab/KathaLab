import React from "react";
import style from './Button.module.scss'

type ButtonType = {
  type?: "icon" | "text",
  value?: string,
  onclick?: () => void,
  className?: string
}

export const Button = ({ type, onclick, value, className }: ButtonType) => {
  return <button onClick={onclick} className={(type === 'icon' ? style.iconButton : style.textButton) + " " + className}>
    <span className={type === 'icon' ? "material-icons material-icons-outlined" : ""}>{value}</span>
    </button>;
};
