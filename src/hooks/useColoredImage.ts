import { deviceToImage, DeviceType } from '../model/Device';

export const useColoredImage : () => [(imageUrl: string, imageColor: string) => HTMLImageElement, Record<string, Record<string, HTMLImageElement>>] = (() => {

    const images : Record<string, Record<string, HTMLImageElement>> =  {}

    const svgToColoredImage = (type: DeviceType,color: string) => {
        const svg = deviceToImage[type].replace(/#000000/g, color)
        const img = new Image();
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
        return img;
    }

    const fn = (type: DeviceType, imageColor: string) => {
        if (!images?.[type]?.[imageColor]) {
            if(!images?.[type]) images[type] = {}
            images[type][imageColor] = svgToColoredImage(type, imageColor)
        }

        return images[type][imageColor]
    }

    return () => [fn, images]

})()