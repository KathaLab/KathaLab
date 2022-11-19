import { createContext } from "react";
import { snackBarMessageType } from "../components/SnackBar/SnackBar";

type contextType = {
    updateContext: (x: snackBarMessageType) => void
}

export default createContext<contextType>({
    updateContext: () => null
})