import React from "react";
import { Pages } from "../../../../app";
import { Button } from "../../../../components/Button/Button";
import { TextInput } from "../../../../components/TextInput/TextInput";

import style from "./Header.module.scss";

type componentType = {
  switchPage: (page: Pages) => void
  handleSave: () => void
}

export const Header = ({switchPage, handleSave}: componentType) => {
  return (
    <header className={style.header}>
      <div className={style.left}>
        <Button type="icon" value="arrow_back" onclick={() => switchPage(Pages.Gallery)}></Button>
        <TextInput placeholder="Topologie n°1"></TextInput>
        <Button type="icon" value="settings"></Button>
      </div>
      <div className={style.right}>
        <Button value="save" type="icon" onclick={handleSave}></Button>
        <Button value="Import"></Button>
        <Button value="Export"></Button>
      </div>
    </header>
  );
};
