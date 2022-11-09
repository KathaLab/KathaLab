import React from "react";
import { Pages } from "../../app";
import { DeviceCard } from "./components/DeviceCard/DeviceCard";
import { Header } from "./components/Header/Header";
type componentType = {
  switchPage: (page: Pages) => void;
};

export const Playground = ({ switchPage }: componentType) => {
  const devices = [{ name: "a" }, { name: "b" }, { name: "c" }, { name: "d" }];

  return (
    <>
      <Header></Header>
      <ul>
        {devices.map(({ name }) => (
          <li key={name}>
            <DeviceCard></DeviceCard>
          </li>
        ))}
      </ul>
      <canvas></canvas>
      <aside></aside>
    </>
  );
};
