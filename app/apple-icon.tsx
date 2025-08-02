import { ImageResponse } from "next/og"

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 60,
        background: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: "20px",
        position: "relative",
        boxShadow: "inset 0 0 0 4px rgba(255,255,255,0.1)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "30px",
          fontSize: "50px",
          filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
        }}
      >
        👑
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          right: "25px",
          fontSize: "35px",
          filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
        }}
      >
        🪶
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "14px",
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        SF
      </div>
    </div>,
    {
      ...size,
    },
  )
}
