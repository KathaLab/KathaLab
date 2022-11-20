import React from "react";
import style from "./TextInput.module.scss";

type componentType = {
  placeholder?: string,
  className?: string
}

export const TextInput = ({placeholder, className}: componentType ) => {
  return <input type="text" className={style.input + " " + className} placeholder={placeholder}/>;
};
