import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} - ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#3F5D45",
          color: "#F4E6D8",
        }}
      >
        <div style={{ fontSize: 140, fontWeight: 700, letterSpacing: 4 }}>{site.name}</div>
        <div style={{ fontSize: 48, marginTop: 20 }}>{site.tagline}</div>
        <div style={{ width: 96, height: 4, background: "#B96F52", marginTop: 40 }} />
        <div style={{ fontSize: 26, marginTop: 30, maxWidth: 1000 }}>{site.expansion}</div>
      </div>
    ),
    size,
  );
}
