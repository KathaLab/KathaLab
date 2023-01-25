/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: fix les types
import React, { createContext, ReactNode, useEffect, useRef, useState } from "react";

export const dialogContext = createContext({
  updateContext: <T extends (...args: unknown[]) => any>(nodes: T, data: Parameters<T>[0]) => ({onClose: (func: any) => null}),
  close: () => null
});

export const DialogContext = ({ children }: {children: ReactNode}) => {
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [nodes, setNodes] = useState();

  const callback = useRef(() => null)

  useEffect(() => {
    !dialogVisibility && callback?.current?.()
  }, [dialogVisibility])

  const handleDialog = <T extends (...args: unknown[]) => any>(nodes: T, data: Parameters<T>[0]) => {
    setDialogVisibility(true);
    setNodes(nodes(data));

    return {
      onClose: (func: any) => callback.current = func
    }
  };

  return (
    <dialogContext.Provider
      value={{
        updateContext: handleDialog,
        close: () => setDialogVisibility(false)
      }}
    >
      {children}
      {dialogVisibility && <>{nodes}</>}
    </dialogContext.Provider>
  );
};
