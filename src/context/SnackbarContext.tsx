import { createContext, ReactNode, useEffect, useState } from "react";
import * as React from "react";
import { useDelayQueue } from "../hooks/useDelayQueue";
import { SnackBar, snackBarMessageType } from "../components/SnackBar/SnackBar";

type contextType = {
    updateContext: (x: snackBarMessageType) => void
}

export const snackbarContext = createContext<contextType>({
    updateContext: () => null
})

export const SnackbarContext = ({ children }: { children: ReactNode }) => {
    const [snackbarVisibility, setSnackbarVisibility] = useState(false);

    // handle snackbar
    const handleSnackBarMessage = (message: snackBarMessageType) => {
        setSnackbarVisibility(true);
        return new Promise<void>((resolve) =>
            setTimeout(() => {
                setSnackbarVisibility(false);
                setTimeout(resolve, 200);
            }, message.duration - 200)
        );
    };

    const [[currentElement], addElement] = useDelayQueue<snackBarMessageType>(
        handleSnackBarMessage
    );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electronAPI.receive("snack:add", (_: unknown, snackMessage: snackBarMessageType) => {
      addElement(snackMessage)
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.electronAPI.removeListener("snack:add");
    };
  }, []);

    return (
        <snackbarContext.Provider value={{ updateContext: addElement }}>
            {children}
            <SnackBar visibility={snackbarVisibility} {...currentElement} />
        </snackbarContext.Provider>
    )
}