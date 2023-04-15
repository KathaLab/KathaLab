import React, { useEffect, useState, useContext } from "react"
import { TextInput } from "../../../../../components/TextInput/TextInput";
import { localizationContext } from "../../../../../context/LocalizationContext";
import { LocalizationName } from "../../../../../localization";

type componentType = {
    list?: string[],
    className: string,
    onChange?: (value: string[]) => void;
    onBlur?: () => void;
    getCommands?: (commands: string[]) => void;
}

export const ListCommand = ({ list, className, onChange, onBlur, getCommands }: componentType) => {
    const { languageDico } = useContext(localizationContext);
    const [values, setValues] = useState<string[]>([...list, ""]);

    const handleValueChange = (value: string, index: number) => {
        setValues(oldValues => {
            oldValues[index] = value;
            const add = oldValues.every(Boolean);
            add && oldValues.push("");
            return [...oldValues];
        })
    }

    const handleBlur = () => {
        setValues(oldValues => {
            return [...oldValues].filter((value,i, arr) => value || i === arr.length-1);
        });
        onblur && onBlur();
        getCommands && getCommands(values);
    }
    useEffect(() => {
        onChange && onChange(values);
    }, [values, onchange])

    useEffect(() => {
        setValues([...list, ""])
    }, [list])

    return (
        <ul>
            {values.map((command, i) => (
                <li key={i}>
                    <TextInput 
                        placeholder={values[i] || languageDico[LocalizationName.newCommand]} 
                        value={values[i]}
                        className={className} 
                        onBlur={handleBlur} onChange={(value: string) => handleValueChange(value, i)}></TextInput>
                </li>
            ))}
        </ul>
    )
}
