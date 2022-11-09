import React from "react";
import { Button } from "../../../../components/Button/Button";
import { TextInput } from "../../../../components/TextInput/TextInput";

export const Header = () => {
  return (
    <header>
      <div>
        <Button type="icon"></Button>
        <TextInput></TextInput>
        <Button></Button>
      </div>
      <div>
        <Button></Button>
        <Button></Button>
      </div>
    </header>
  );
};
