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
    {/*<button onClick={() => switchPage(Pages.Playground)}>{languageDico[LocalizationName.titlePlayground]}</button>*/}
    <div className={style.cardList}> 
    { function() {
      const nbrGallery = 10;
      const cards = [];
      for (let i = 0; i < nbrGallery; i++){
          cards.push(<div onClick={() => switchPage(Pages.Playground)}><CardGallery ></CardGallery></div>) ;
      }
      return cards;
    }()}
    </div>
    
  </>
}