const sharp = require("sharp");
import { readFileSync } from "fs";

interface ConvertReport {
  data: any;
  progressMs: number;
}

const assetBase = "src/assets/";

const convertToWebP = async (path: string): Promise<ConvertReport> => {
  return await sharp(path).webp().toBuffer();
};

const convertToAVIF = async (path: string): Promise<ConvertReport> => {
  return await sharp(path).avif().toBuffer();
};

const measureTime = async (paths: string[], func: Function) => {
  const fileSizes: number[] = [];

  const start = Date.now();
  for await (const path of paths) {
    const buffer = await func(path);
    fileSizes.push(buffer.length);
  }
  const end = Date.now();

  const reports = paths.map((path, index) => {
    const compressedFileSize = fileSizes[index];
    const originalFileSize = readFileSync(path).length;
    const compressPercentage = (compressedFileSize / originalFileSize) * 100;
    return {
      compressPercentage,
      compressedFileSize,
      originalFileSize,
    };
  });

  const averageCompressPercentage =
    reports.reduce((acc, cur) => acc + cur.compressPercentage, 0) /
    reports.length;

  return {
    progressMs: end - start,
    reports,
    averageCompressPercentage,
  };
};

const main = async () => {
  const paths = new Array(10).fill("").map(() => `${assetBase}0.png`);
  console.log(
    `${paths.length}枚の画像を変換して、Bufferに書き出すのにかかった時間を計測します\n`
  );

  const webpResult = await measureTime(paths, convertToWebP);
  console.log("WebP --------------------");
  console.log(`ProgressTime: ${webpResult.progressMs / 1000}s`);
  console.log(`FileSize: ${webpResult.averageCompressPercentage}%`);

  const avifResult = await measureTime(paths, convertToAVIF);

  console.log("AVIF --------------------");
  console.log(`ProgressTime: ${avifResult.progressMs / 1000}s`);
  console.log(`FileSize: ${avifResult.averageCompressPercentage}%`);
};

main();
