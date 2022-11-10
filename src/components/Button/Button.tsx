import React from "react";

type ButtonType = {
  type?: "icon" | "text",
  value?: string,
  onclick?: () => void
}

export const Button = ({ type, onclick, value }: ButtonType) => {
  return <button onClick={onclick}><span className={type === 'icon' ? "material-icons material-icons-outlined" : ""}>{value}</span></button>;
};
