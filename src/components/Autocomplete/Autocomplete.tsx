import React from "react";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import style from './Autocomplete.module.scss'
import styleInput from './../../components/TextInput/TextInput.module.scss'

type AutocompleteType = {
    classInput?: string,
    defaultValue?: string,
    datalist: string[],
    onChange?: (value: string) => void,
    placeholder?: string
}

export const Autocomplete = ({defaultValue, datalist, onChange, placeholder, classInput}: AutocompleteType) => {
    const [state, setState] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const [index, setIndex] = useState(null);

    
    const componentRef = useRef(null);

    const getAutocomplete = () => {
        console.log(datalist);
        console.log(datalist.length)
        return [...datalist].filter(
            (data, index) => index === datalist.indexOf(data) && data.includes(value)
        );
    };

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key === "ArrowUp") {
                setIndex((old: number) => (old === null ? 0 : Math.max(old - 1, 0)));
            } else if (event.key === "ArrowDown") {
                setIndex((old: number) => (old === null ? 0 : old + 1));
            } else if (event.key === "Enter" && index != null) {
                const list = getAutocomplete();
                setValue(list[index % list.length]);
                onChange(list[index % list.length]);
            }
        };
        document.addEventListener("keydown", handler);

        return () => {
            document.removeEventListener("keydown", handler);
        };
    }, [index]);

    return (
        <div ref={componentRef} className={style.autocomplete + " " + classInput}>
            <input
                className={styleInput.input + " " + style.input}
                placeholder={placeholder}
                type="text"
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                    setIndex(null)
                }
                }
                onBlur={(e) => setState(false)}
                onFocus={(e) => setState(true)}
                value={value} />
            <ul className={style.list}>
                {state && datalist.length>0 &&
                    getAutocomplete().map((data, idx, self) => (
                        <li
                            key={data}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={(e) => { setValue(data); onChange(data) }}
                            className={(index !== null && index % self.length === idx? style.item +" " + style.itemHover : style.item)}>
                            {data}
                        </li>
                    ))}
            </ul>
        </div>
    );
};
