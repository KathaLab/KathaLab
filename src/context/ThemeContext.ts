import {createContext, Dispatch, SetStateAction} from "react";

type contextType = {
    theme : string
    updateContext: Dispatch<SetStateAction<string>>
}

export default createContext<contextType>({
    theme: "",
    updateContext: () => null
})