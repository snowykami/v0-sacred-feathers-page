import { ImageResponse } from "next/og"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 20,
        background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: "6px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "6px",
          fontSize: "16px",
        }}
      >
        👑
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "2px",
          right: "4px",
          fontSize: "12px",
        }}
      >
        🪶
      </div>
    </div>,
    {
      ...size,
    },
  )
}
