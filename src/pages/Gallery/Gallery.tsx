import React, { useContext, useEffect, useState } from "react"
import { Pages } from "../../app"
import { LocalizationName } from "../../localization";
import LocalizationContext from "../../context/LocalizationContext";
import style from "./Gallery.scss"
import { HeaderGallery } from './Components/HeaderGallery/HeaderGallery'
import { CardGallery } from './Components/CardGallery/CardGallery'
import { Lab } from "../../model/Lab";

type componentType = {
  switchPage: (page: Pages, option?: { lab?: Lab }) => void
}

const handleListSave = (_: unknown, data: string[]) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  data.forEach(filename => window.electronAPI.loadData(filename))
}

export const Gallery = ({ switchPage }: componentType) => {

  const { languageDico } = useContext(LocalizationContext);
  const [lab, setLabs] = useState<Lab[]>([]);


  const handleFileSave = (_: unknown, data: Lab[]) => {
    setLabs(data);
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electronAPI.receive("save:load", handleFileSave);
 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electronAPI.loadSave();

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.electronAPI.removeListener("save:load");
    }
  }, [])


  function handleClick() {
    switchPage(Pages.Playground)
  }

  return <div className={style.container}>
    {/* <HeaderGallery switchPage={switchPage}></HeaderGallery> */}
    <div className={style.galleryExplication}>{languageDico[LocalizationName.galleryExplication]}</div>
    <div className={style.cardList}>
      {
        lab.map((lab, index) => {
          return <CardGallery name={lab.labName} key={index} onClick={() => switchPage(Pages.Playground, { lab })}></CardGallery>
        })
      }
      <button className={style.btnCreateTopology} onClick={() => { handleClick() }}>+</button>
    </div>
  </div>
}
