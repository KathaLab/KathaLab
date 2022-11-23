import React, { useEffect, useRef } from 'react'
import style from './SnackBar.module.scss'

export type snackBarMessageType = {
  message: string,
  icon: string,
  duration: number;
}

type componentType = snackBarMessageType & {
  visibility: boolean
}

export const SnackBar = ({ message, icon, duration, visibility }: componentType) => {

  const currentMessage = useRef<snackBarMessageType>();

  useEffect(() => {
    currentMessage.current = {message, icon, duration}
  }, [message, icon, duration])

  return (
    <div className={`${style.snackbar} ${visibility ? style.visible : ''}`}>
      <span className={style.icon + ' material-icons material-icons-outlined'}>{currentMessage.current?.icon}</span>
      <span>
        {currentMessage.current?.message}
      </span>
    </div>
  )
}
