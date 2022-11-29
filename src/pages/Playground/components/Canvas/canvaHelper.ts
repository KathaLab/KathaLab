import { MutableRefObject } from "react";
import { useCssVar } from "../../../../hooks/useCssVar";
import { useColoredImage } from "../../../../hooks/useColoredImage";
import { Lab } from "../../../../model/Lab";
import { deviceSize } from "../../../../model/Device";

export const renderJson = (json: Lab, canvasRef: MutableRefObject<HTMLCanvasElement>) => {

  const [getImg] = useColoredImage();
  const color = useCssVar("--clr-main-primary");

  const ctx = canvasRef.current.getContext("2d");
  if (!ctx) return;

  // render devices
  json.devices.forEach((device, i) => {
    if (!device.position)
    json.devices[i].position = device?.position || {
      x: 10,
      y: 10,
    };

  (async () => {
    const color2 = color;
    const test = await getImg(device.type, color2);
    test.onload = () => {
      ctx.drawImage(
        test,
        device?.position.x,
        device?.position.y,
        deviceSize.width,
        deviceSize.height
      );
    };

    test.complete && test.onload(null);
  })();

  ctx.textAlign = "center";
  ctx.fillStyle = color;
  ctx.font = "16px 'Be Vietnam Pro'";
  ctx.fillText(
    device.name,
    device?.position.x + deviceSize.width / 2,
    device?.position.y + deviceSize.height + 20
  );

  });


};