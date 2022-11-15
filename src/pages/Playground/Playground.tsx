import React from "react";
import { DeviceCard } from "./components/DeviceCard/DeviceCard";
import { Header } from "./components/Header/Header";
import { Canvas } from "./components/Canvas/Canvas";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss";
import { Pages } from "../../app"

type componentType = {
  switchPage: (page: Pages) => void
}

export const Playground = ({switchPage}: componentType) => {
  const devices = [{ name: "a" }, { name: "b" }, { name: "c" }, { name: "d" }];

  return (
    <div className={style.page}>
      <Header switchPage={switchPage}></Header>
      <div className={style.content}>
        <ul>
          {devices.map(({ name }) => (
            <li key={name}>
              <DeviceCard></DeviceCard>
            </li>
          ))}
        </ul>
        <Canvas></Canvas>
        <ConfigPanel></ConfigPanel>
      </div>
    </div>
  );
};
