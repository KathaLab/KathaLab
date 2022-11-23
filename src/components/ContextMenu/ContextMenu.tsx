import React from "react";
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
};

export const ContextMenu = ({ onHide, options }: componentType) => {
  return (
    <>
      {onHide && <div className={style.background} onClick={onHide}></div>}
      <ul className={style.menu}>
        {options.map((option, index) => {
          if (option.separator) {
            return <span key={index} className={style.separator}></span>;
          }
          return (
            <li key={index} className={option.disabled ? style.disabled : ""} onClick={option?.onClick}>
              {option?.label}
              {option?.options && <span className={style.expand + " material-icons material-symbols-outlined"}>chevron_right</span>}
              {option.options && <ul className={style.menu}>
                {option.options.map((opt, index) => {
                  if (opt.separator) {return (<span key={index} className={style.separator}></span>);}
                  return (<li key={index} className={opt.disabled ? style.disabled : ""} onClick={opt?.onClick}>{opt?.label}</li>);
                })}
              </ul>}
            </li>
          );
        })}
      </ul>
    </>
  );
};