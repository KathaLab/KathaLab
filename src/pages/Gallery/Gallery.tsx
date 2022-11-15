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

export const Gallery = ({switchPage}: componentType) => {

  const { languageDico } = useContext(LocalizationContext);

  return <>
    <HeaderGallery></HeaderGallery>
    
    <div className={style.galleryExplication}>{languageDico[LocalizationName.galleryExplication]}</div>
    <h1>{languageDico[LocalizationName.titleGallery]}</h1>
    <button onClick={() => switchPage(Pages.Playground)}>{languageDico[LocalizationName.titlePlayground]}</button>
    <div className={style.cardList}>
      <CardGallery></CardGallery>
      <CardGallery></CardGallery>
      <CardGallery></CardGallery>
    </div>
    
  </>
}