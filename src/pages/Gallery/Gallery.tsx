import React, { useEffect, useState } from "react"
import { Pages } from "../../app"
import style from "./Gallery.scss"
import { CardGallery } from './Components/CardGallery/CardGallery'
import { Lab } from "../../model/Lab";

type componentType = {
  switchPage: (page: Pages, option?: { lab?: Lab }) => void
  labs: Lab[];
  setSelectedLab: (lab: Lab) => void;
  handleDelete: (labId: string) => void;
}

export const Gallery = ({ switchPage, labs, setSelectedLab, handleDelete }: componentType) => {

  const [search, setSearch] = useState<string>("");
  const [labList, setLabList] = useState<Lab[]>(labs);

  useEffect(() => {
    setLabList(labs);
  }, [labs]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setLabList(labs.filter(lab => lab.labName.toLowerCase().includes(value.toLowerCase())));
  } 

  return <div className={style.container}>
    <div className={style.search}>
      <input type="text" className={style.searchInput} placeholder="Searching a lab ?" value={search} onChange={handleSearch}/>
    </div>
    <div className={style.cardList}>
      {
        labList.map((lab, index) => {
          return <CardGallery lab={lab} name={lab.labName} key={index} onClick={() => {switchPage(Pages.Playground); setSelectedLab(labList.find((l) => lab.id === l.id))}} onDelete={() => handleDelete(lab.id)}></CardGallery>
        })
      }
      <button className={style.btnCreateTopology} onClick={() => {setSelectedLab(undefined); switchPage(Pages.Playground) }}>+</button>
    </div>
  </div>
}
