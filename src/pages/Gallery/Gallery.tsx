import React, {useContext} from "react"
import { Pages } from "../../app"
import {LocalizationName} from "../../localization";
import LocalizationContext from "../../context/LocalizationContext";

type componentType = {
  switchPage: (page: Pages) => void
}

export const Gallery = ({switchPage}: componentType) => {

  const { languageDico } = useContext(LocalizationContext);

  return <>
    <h1>{languageDico[LocalizationName.titleGallery]}</h1>
    <button onClick={() => switchPage(Pages.Playground)}>{languageDico[LocalizationName.titlePlayground]}</button>
    <button onClick={() => switchPage(Pages.Settings)}>Settings</button>
  </>
}
