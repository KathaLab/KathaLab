import React, { ReactNode } from 'react'
import { KeybindContext } from './KeybindContext'
import { LocalizationContext } from './LocalizationContext'
import { SnackbarContext } from './SnackbarContext'
import { ThemeContext } from './ThemeContext'

export const GlobalContext = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext>
      <LocalizationContext>
        <KeybindContext>
          <SnackbarContext>
            {children}
          </SnackbarContext>
        </KeybindContext>
      </LocalizationContext>
    </ThemeContext>
  )
}
