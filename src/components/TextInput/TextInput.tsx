import React, { useEffect, useRef } from "react";
import {useId} from "../../hooks/useId"
import style from "./TextInput.module.scss";

enum textInputType {
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
}

const collisionDomaine = ['eth0', 'eth1'];

export const TextInput = ({ placeholder, className, onChange, value, onBlur, autocommplete }: componentType) => {

  const id = "id_" + useId("data-list");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.value = value || ""
  }, [value])

  const handleChange = () => {
    onChange?.(inputRef.current.value);
  }

  return <>
    <input list={id} type="text" className={style.input + " " + className} onBlur={onBlur} placeholder={placeholder} onChange={handleChange} ref={inputRef} />
    {autocommplete && <datalist id={id} >
      {autocommplete?.map(item => <option key={item} value={item} />)}
    </datalist>
    }

  </>
};
