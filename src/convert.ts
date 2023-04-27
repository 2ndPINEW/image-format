const sharp = require("sharp");

const assetBase = "src/assets/";
const outputBase = "outputs/";

const convertToWebP = async (fileName: string) => {
  const filePath = `${assetBase}${fileName}`;
  const outputPath = `${outputBase}${fileName}.webp`;
  await sharp(filePath).webp().toFile(outputPath);
};

const convertToAVIF = async (fileName: string) => {
  const filePath = `${assetBase}${fileName}`;
  const outputPath = `${outputBase}${fileName}.avif`;
  await sharp(filePath).avif().toFile(outputPath);
};
const main = async () => {
  const paths = new Array(1).fill("").map(() => `1.png`);
  for await (const path of paths) {
    await convertToWebP(path);
    await convertToAVIF(path);
  }
};

main();
