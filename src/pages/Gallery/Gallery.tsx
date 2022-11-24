import React, { useContext } from "react"
import { Pages } from "../../app"
import { LocalizationName } from "../../localization";
import LocalizationContext from "../../context/LocalizationContext";
import style from "./Gallery.scss"
import { CardGallery } from './Components/CardGallery/CardGallery'
import { Lab } from "../../model/Lab";

type componentType = {
  switchPage: (page: Pages, option?: { lab?: Lab }) => void
  labs: Lab[];
  setSelectedLab: (lab: Lab) => void;
}

export const Gallery = ({ switchPage, labs, setSelectedLab }: componentType) => {

  const { languageDico } = useContext(LocalizationContext);

  return <div className={style.container}>
    <div className={style.galleryExplication}>{languageDico[LocalizationName.galleryExplication]}</div>
    <div className={style.cardList}>
      {
        labs.map((lab, index) => {
          return <CardGallery name={lab.name} key={index} onClick={() => {switchPage(Pages.Playground); setSelectedLab(labs.find((l) => lab.id === l.id))}}></CardGallery>
        })
      }
      <button className={style.btnCreateTopology} onClick={() => {setSelectedLab(undefined); switchPage(Pages.Playground) }}>+</button>
    </div>
  </div>
}
