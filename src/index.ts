const sharp = require("sharp");

interface ConvertReport {
  data: any;
  progressMs: number;
}

const assetBase = "src/assets/";

const convertToWebP = async (fileName: string): Promise<ConvertReport> => {
  return await sharp(`${assetBase}${fileName}`).webp().toBuffer();
};

const convertToAVIF = async (fileName: string): Promise<ConvertReport> => {
  return await sharp(`${assetBase}${fileName}`).avif().toBuffer();
};

const measureTime = async (func: Function) => {
  const fileNames = new Array(5).fill("").map(() => `0.png`);

  const start = Date.now();
  for await (const fileName of fileNames) {
    await func(fileName);
  }
  const end = Date.now();
  return end - start;
};

const main = async () => {
  const webPTime = await measureTime(convertToWebP);
  const avifTime = await measureTime(convertToAVIF);
  console.log(`WebP: ${webPTime}ms`);
  console.log(`AVIF: ${avifTime}ms`);
};

main();
