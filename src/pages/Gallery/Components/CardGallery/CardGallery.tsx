import React, { MouseEvent, useRef } from "react";
import { Lab } from "../../../../model/Lab";
import { Canvas } from "../../../Playground/components/Canvas/Canvas";
import styles from "./CardGallery.scss";

type ComponentType = {
  onClick: () => void;
  onDelete: () => void;
  lab: Lab;
  name: string;
};

export const CardGallery = ({lab, onClick, name, onDelete }: ComponentType) => {

  const btnRef = useRef(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === btnRef.current) onDelete();
    else onClick();
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        className={styles.img}
        draggable="false"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmf6NRBGvnf6CCrulwcD7Uta6gJitJtOs8tQ&usqp=CAU"
        alt="image de topologie"
      />
      {/* <Canvas topoJson={lab} ></Canvas> */}
      <h2 className={styles.cardTitle}>{name || "Untitled"}</h2>
      <span ref={btnRef} className={styles.deleteBtn + " material-icons material-symbols-outlined"}>close</span>
    </div>
  );
};
