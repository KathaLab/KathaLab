import { useRef } from "react";

export const useCssVar = (name: string) => {
    const ref = useRef<string>("#000000");

    ref.current = getComputedStyle(document.querySelector('main')).getPropertyValue(name);

    return ref.current;
}