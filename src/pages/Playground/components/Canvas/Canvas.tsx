import React, { useEffect, useRef } from 'react'
import { Device } from '../../../../model/Device';
import style from './Canvas.module.scss'

type ComponentType = {
  topoJson: Device[]
};

export const Canvas = ({ topoJson }: ComponentType) => {
  const canvasRef = useRef(null)

  const drawJson = (json: Device[]) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    json.forEach((device, i) => {
      const img = new Image();
      img.src = device.imageUrl;
      img.onload = () => ctx.drawImage(img, 0, i * 100, 100, 100);
    })
  }

  // const draw = (x: number, y: number) => {
  //   const canvas = canvasRef.current
  //   const ctx = canvas.getContext('2d')
  //   ctx.fillStyle = 'rgb(200, 0, 0)'
  //   ctx.fillRect(x - 1, y - 1, 2, 2)
  // }

  useEffect(() => {
    const rect = canvasRef.current.getBoundingClientRect();
    canvasRef.current.width = rect.width;
    canvasRef.current.height = rect.height;

    drawJson(topoJson);
    // canvasRef.current.onmousemove = (evt: MouseEvent) => {
    //   const scaleX = 1 //canvasRef.current.width / rect.width;
    //   const scaleY = 1 //canvasRef.current.height / rect.height;
    //   draw((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY)
    // }
  }, [topoJson])

  return <canvas ref={canvasRef} className={`${style.canvas}`}></canvas>
}
