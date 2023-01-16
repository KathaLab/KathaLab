import React, { useEffect } from "react";
import style from "./ContextMenu.module.scss";

type option = {
  label?: string;
  onClick?: () => void;
  separator?: boolean;
  disabled?: boolean;
  options?: option[];
};

type componentType = {
  onHide?: () => void;
  options: option[];
  position?: {
    x: number;
    y: number;
  }
};

export const ContextMenu = ({ onHide, options, position }: componentType) => {

  useEffect(() => {
    console.log(position)
  }, [position])

  return (
    <>
      {onHide && <div className={style.background} onClick={onHide}></div>}
      <ul className={style.menu} style={{left: position.x, top: position.y}}>
        {options.map((option, index) => {
          if (option.separator) {
            return <span key={index} className={style.separator}></span>;
          }
          return (
            <li
              key={index}
              className={option.disabled ? style.disabled : ""}
              onClick={() => {
                if (!option.onClick) return;
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
