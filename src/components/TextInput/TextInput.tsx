import React, { useRef } from "react";
import style from "./TextInput.module.scss";

type componentType = {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
};

export const TextInput = ({placeholder, onChange, value}: componentType) => {
  const ref = useRef(null);

  const handleBlur = () => {
    onChange && onChange(ref.current.value);
  }

  return <input ref={ref} defaultValue={value} onBlur={handleBlur} type="text" className={style.input} placeholder={placeholder}/>;
};
