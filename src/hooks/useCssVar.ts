import { useEffect, useState } from "react";

export const useCssVar = (name: string) => {
    const [value, setValue] = useState("#000000");

    useEffect(() => {
        setValue(getComputedStyle(document.querySelector('main')).getPropertyValue(name));
    }, [name, setValue])

    return value;
}