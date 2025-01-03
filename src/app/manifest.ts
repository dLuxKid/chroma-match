import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: "#ff7043",
    background_color: "#fafafa",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "icon512_rounded.png",
        type: "image/png",
      },
    ],
    orientation: "portrait",
    display: "standalone",
    dir: "auto",
    lang: "en-US",
    name: "ChromaMatch",
    scope: "/",
    start_url: "/",
    description:
      "Discover the perfect outfit combinations with ChromaMatch. Use AI to upload your clothes and find your best matches effortlessly. Elevate your style today!",
    id: "chromamatch_by_godkid",
  };
}
