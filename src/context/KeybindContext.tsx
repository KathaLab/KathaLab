import { createContext, ReactNode, useEffect, useRef, useState } from "react"
import * as React from "react";

type contextType = {
  handlers: [string, (() => void)][],
  on: (eventName: string, handlerFunction: () => void) => void,
  remove: (eventName: string, handlerFunction: () => void) => void,
}

type keybindType = {
  eventName: string,
  code: string[],
  ctrl: boolean
}

export const keyBindContext = createContext<contextType>({
  handlers: [],
  on: () => null,
  remove: () => null
})

export const KeybindContext = ({ keybinds, children }: { keybinds: keybindType[], children: ReactNode }) => {
  const pressed = useRef<Set<string>>(new Set())

  const [handlers, setHandlers] = useState<[string, () => void][]>([])

  useEffect(() => {
    pressed.current = new Set()

    document.onkeyup = (e) => pressed.current.delete(e.key)
    document.onkeydown = (e) => {
      pressed.current.add(e.key)
      keybinds.forEach((keybind: keybindType) => {
        if (
          e.ctrlKey === keybind.ctrl &&
          keybind.code.every((code) => pressed.current.has(code))
        ) handlers.forEach((element) => element?.[0] === keybind.eventName && element[1]());
      });
    }

  }, [keybinds, handlers])

  const on = (eventName: string, handlerFunction: () => void) => {
    setHandlers(old => [...old, [eventName, handlerFunction]])
  }

  const remove = (eventName: string, handlerFunction: () => void) => {
    setHandlers(old => old.filter(x => x[0] !== eventName && x[1] !== handlerFunction))
  }

  return (
    <keyBindContext.Provider value={{ handlers, on, remove }}>
      {children}
    </keyBindContext.Provider>
  )
}