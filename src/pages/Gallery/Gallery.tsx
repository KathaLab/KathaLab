import React, {useContext} from "react"
import { Pages } from "../../app"
import {LocalizationName, Language, LanguageToLocalization} from "../../localization";
import LocalizationContext from "../../context/LocalizationContext";

type componentType = {
  switchPage: (page: Pages) => void
}


export const Gallery = ({switchPage}: componentType) => {

  const { language } = useContext(LocalizationContext);

  return <>
    <h1>{LanguageToLocalization[language][LocalizationName.titleGallery]}</h1>
    <button onClick={() => switchPage(Pages.Playground)}>{LanguageToLocalization[language][LocalizationName.titlePlayground]}</button>
  </>
}
