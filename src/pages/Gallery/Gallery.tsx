import React, {useContext} from "react"
import { Pages } from "../../app"
import {LocalizationName} from "../../localization";
import LocalizationContext from "../../context/LocalizationContext";
import style from "./Gallery.scss"
import {HeaderGallery} from './Components/HeaderGallery/HeaderGallery'
import {CardGallery} from './Components/CardGallery/CardGallery'

type componentType = {
  switchPage: (page: Pages) => void
}
let nbrGallery = 12;

export const Gallery = ({switchPage}: componentType) => {

  const { languageDico } = useContext(LocalizationContext);


  return <>
    <HeaderGallery></HeaderGallery>
    <div className={style.galleryExplication}>{languageDico[LocalizationName.galleryExplication]}</div>
    <div className={style.cardList}>
      {
        Array.from(Array(nbrGallery), (_, i) => <CardGallery key={i} onClick={() => switchPage(Pages.Playground)}></CardGallery>)
      }
      <button className={style.btn_createTopology}
          onClick={() =>{
            nbrGallery++;
            switchPage(Pages.Playground)
          }}
      >+</button>
    </div>
  </>
}
