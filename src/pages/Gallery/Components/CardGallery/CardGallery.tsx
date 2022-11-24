import React, { MouseEvent, useRef } from "react";
import styles from "./CardGallery.scss";

type ComponentType = {
  onClick: () => void;
  onDelete: () => void;
  name: string;
};

export const CardGallery = ({ onClick, name, onDelete }: ComponentType) => {

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
      <h2 className={styles.cardTitle}>{name || "Untitled"}</h2>
      <span ref={btnRef} onClick={onDelete} className={styles.deleteBtn + " material-icons material-symbols-outlined"}>close</span>
    </div>
  );
};
