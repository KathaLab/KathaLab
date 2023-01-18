import { number } from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useId } from "../../hooks/useId"
import style from "./TextInput.module.scss";

const textInputTypeValidator = {
  NUMBER: /[0-9]*/,
  IP: /[0-9\.]*/,
  AUTOCOMPLETE: "autocomplete",
  DEFAULT: /.*/,
}

export type textInputType = keyof typeof textInputTypeValidator

type componentType = {
  placeholder?: string,
  className?: string,
  value?: string,
  onChange?: (params?: string) => void,
  onBlur?: (value?: string) => void,
  autocommplete?: string[],
  type?: textInputType
}

export const TextInput = ({ placeholder, className, onChange, value, onBlur, autocommplete, type = "DEFAULT" }: componentType) => {

  const id = "id_" + useId("data-list");
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "")
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const temp = (event.target.value as string).match(textInputTypeValidator[type])?.[0]

    if (temp !== inputValue) {
      setInputValue(temp)
      onChange?.(temp);
    }
  }

  return <>
    <input
      value={inputValue}
      list={id}
      className={style.input + " " + className}
      onBlur={(event) => onBlur && onBlur(event.target.value)}
      placeholder={placeholder}
      onChange={handleChange}
    />

    {autocommplete && <datalist id={id}>
      {autocommplete?.map((item, index) => <option key={index} value={item} />)}
    </datalist>}
  </>
};
