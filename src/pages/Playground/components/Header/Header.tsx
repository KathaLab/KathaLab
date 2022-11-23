import React from "react";
import { Pages } from "../../../../app";
import { Button } from "../../../../components/Button/Button";
import { TextInput } from "../../../../components/TextInput/TextInput";

import style from "./Header.module.scss";

type componentType = {
  switchPage: (page: Pages) => void
  handleSave: () => void
  handleImport: () => void
  handleExport: () => void
  onNameChange: (name: string) => void
  name: string
}

export const Header = ({ switchPage, handleSave, handleExport, handleImport, onNameChange, name }: componentType) => {

  return (
    <header className={style.header}>
      <div className={style.left}>
        <Button type="icon" value="arrow_back" onclick={() => switchPage(Pages.Gallery)}></Button>
        <TextInput value={name} onChange={onNameChange} placeholder="Topologie n°1"></TextInput>
        <Button className= {style.settingButton}  type="icon" value="settings"></Button>
      </div>
      <div className={style.right}>
        <Button value="save" type="icon" onclick={handleSave}></Button>
        <Button value="Import" onclick={handleImport} ></Button>
        <Button value="Export" onclick={handleExport} ></Button>
      </div>
    </header>
  );
};
