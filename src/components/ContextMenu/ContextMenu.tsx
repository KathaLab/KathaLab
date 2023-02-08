import React from "react";
import style from "./ContextMenu.module.scss";

export type option = {
  label?: string;
  onClick?: () => void;
  separator?: boolean;
  disabled?: boolean;
  options?: option[];
};

type componentType = {
  onHide?: () => void;
  options: option[];
  className?: string
  position?: {
    x: number;
    y: number;
  }
};

export const ContextMenu = ({ onHide, options, position, className }: componentType) => {

  return (
    <>
      {onHide && <div className={style.background} onClick={onHide} onContextMenu={onHide}></div>}
      <ul className={style.menu + ' ' + className} style={{left: position?.x, top: position?.y}}>
        {options.map((option, index) => {
          if (option.separator) {
            return <span key={index} className={style.separator}></span>;
          }
          return (
            <li
              key={index}
              className={option.disabled ? style.disabled : ""}
              onClick={() => {
                if (!option.onClick || option.disabled) return;
                option?.onClick?.();
                onHide();
              }}
            >
              {option?.label}
              {option?.options && (
                <span
                  className={
                    style.expand + " material-icons material-symbols-outlined"
                  }
                >
                  chevron_right
                </span>
              )}
              {option.options && (
                <ul className={style.menu}>
                  {option.options.map((opt, index) => {
                    if (opt.separator) {
                      return (
                        <span key={index} className={style.separator}></span>
                      );
                    }
                    return (
                      <li
                        key={index}
                        className={opt.disabled ? style.disabled : ""}
                        onClick={opt?.onClick}
                      >
                        {opt?.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};
