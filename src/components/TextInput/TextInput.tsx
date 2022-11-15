import React from "react";
import style from "./TextInput.module.scss";


export const TextInput = ({placeholder}: {placeholder?: string}) => {
  return <input type="text" className={style.input} placeholder={placeholder}/>;
};
