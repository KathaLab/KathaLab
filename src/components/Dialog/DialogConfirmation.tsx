import * as React from "react";
import dialogStyle from "./Dialog.module.scss"

type componentType = {
  text: string;
  Validate: () => void;
  Cancel: () => void;
};

export const DialogConfirmation = ({ text, Validate, Cancel }: componentType) => {
  return (
    <div className={dialogStyle.dialog}>
      <div className={dialogStyle.dialog__header}></div>
      <div className={dialogStyle.dialog__body}>{text}</div>
      <div className={dialogStyle.dialog__footer}>
        <button onClick={Validate}>Validate</button>
        <button onClick={Cancel}>Cancel</button>
      </div>
    </div>
  );
};
