import { number } from "prop-types";
import React, { useEffect, useRef } from "react";
import { useId } from "../../hooks/useId"
import style from "./TextInput.module.scss";

const textInputTypeValidator = {
  NUMBER: /[0-9\.]*/,
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

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.value = value || "";
  }, [value])

  const handleChange = () => {
    const temp = (inputRef.current.value as string).match(textInputTypeValidator[type])?.[0]
    if (temp !== value) {
      inputRef.current.value = temp
      onChange?.(temp);
    }
  }

  return <>
    <input 
      list={id} 
      className={style.input + " " + className} 
      onBlur={() => onBlur && onBlur(inputRef.current.value)} 
      placeholder={placeholder} 
      onChange={handleChange} 
      ref={inputRef} />

    {autocommplete && <datalist id={id}>
      {autocommplete?.map(item => <option key={item} value={item} />)}
    </datalist>}
  </>
};
