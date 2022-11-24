import React, { useEffect, useRef } from "react";
import {useId} from "../../hooks/useId"
import style from "./TextInput.module.scss";

export enum textInputType {
  TEXT = "text",
  NUMBER = "number",
  AUTOCOMPLETE = "autocomplete"
}

type componentType = {
  placeholder?: string,
  className?: string,
  value?: string,
  onChange?: (params?: string) => void,
  onBlur?: () => void,
  autocommplete?: string[];
  type?: textInputType
}

const collisionDomaine = ['eth0', 'eth1'];

export const TextInput = ({ placeholder, className, onChange, value, onBlur, autocommplete, type }: componentType) => {

  // const exceptThisSymbols = ["e", "E", "+", "-"];
  // onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
  
  const id = "id_" + useId("data-list");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.value = value || ""
  }, [value])

  const handleChange = () => {
    onChange?.(inputRef.current.value);
  }


  return <>
    <input list={id} type={type} className={style.input + " " + className} onBlur={onBlur} placeholder={placeholder} onChange={handleChange} ref={inputRef} />
    {autocommplete && <datalist id={id} >
      {autocommplete?.map(item => <option key={item} value={item} />)}
    </datalist>
    }

  </>
};
