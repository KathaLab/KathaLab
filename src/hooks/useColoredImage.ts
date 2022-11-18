export const useColoredImage : () => [(imageUrl: string, imageColor: string) => Promise<HTMLImageElement>, Record<string, Record<string, Promise<HTMLImageElement>>>] = (() => {

    const images : Record<string, Record<string, Promise<HTMLImageElement>>> =  {}

    const svgToColoredImage = async (url: string,color: string) => {
        const image = await fetch(url)
        const blob = await image.blob()
        const coloredSvg = (await blob.text()).replace(/#000000/g, color)
        const svg = new Blob([coloredSvg], { type: 'image/svg+xml' })
        const img = new Image();

        img.src = URL.createObjectURL(svg);

        return img;
    }

    const fn = (imageUrl: string, imageColor: string) => {

        if (!images?.[imageUrl]?.[imageColor]) {
            if(!images?.[imageUrl]) images[imageUrl] = {}
            images[imageUrl][imageColor] = svgToColoredImage(imageUrl, imageColor)
        }

        return images[imageUrl][imageColor]
    }

    return () => [fn, images]

})()