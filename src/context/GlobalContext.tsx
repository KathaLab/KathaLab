import React, { ReactNode } from 'react'
import { DialogContext } from './DialogContext'
import { KeybindContext } from './KeybindContext'
import { LocalizationContext } from './LocalizationContext'
import { SnackbarContext } from './SnackbarContext'
import { ThemeContext } from './ThemeContext'

export const GlobalContext = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext>
      <LocalizationContext>
        <KeybindContext>
          <DialogContext>
            <SnackbarContext>
              {children}
            </SnackbarContext>
          </DialogContext>
        </KeybindContext>
      </LocalizationContext>
    </ThemeContext>
  )
}
