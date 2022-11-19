import React from "react";
import style from "./TextInput.module.scss";

export const TextInput = ({placeholder}: {placeholder?: string}, {classname}: {classname?: string}) => {
  return <input type="text" className={classname?classname:style.input} placeholder={placeholder}/>;
};
