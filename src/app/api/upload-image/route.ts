import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: false,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
  invalidate: true,
  resource_type: "auto" as "auto",
};

export async function POST(req: Request) {
  const { image } = await req.json();

  if (!image)
    return Response.json({
      status: "error",
      message: "Image is required",
    });

  try {
    const result = await cloudinary.uploader.upload(image, options);

    return Response.json({
      status: "success",
      message: "Image uploaded",
      image: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      status: "error",
      message: "Error uploading image",
    });
  }
}
