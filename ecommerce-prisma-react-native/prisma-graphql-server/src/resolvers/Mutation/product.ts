import { getUserId, Context } from "../../utils";
import { createWriteStream } from "fs";
import * as shortid from "shortid";

const storeUpload = async ({ stream, filename }): Promise<any> => {
  const path = `images/${shortid.generate()}`;
  return new Promise((resolve, reject) => {
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ path }))
      .on("error", reject);
  });
};

const processUpload = async (upload) => {
  const { stream, filename, mimetype, encoding } = await upload;
  const { path } = await storeUpload({ stream, filename });
  return path;
};

export const product = {
  async createProduct(parent, { name, price, picture }, ctx: Context, info) {
    const userId = getUserId(ctx);
    console.log(userId);
    return ctx.prisma.createProduct({
      name,
      price,
      pictureUrl: await processUpload(picture),
      seller: {
        connect: { id: userId },
      },
    });
  },
};
