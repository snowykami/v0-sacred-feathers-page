import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Sacred Feathers | 神圣羽毛帝国"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
        position: "relative",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 30% 20%, rgba(251, 191, 36, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* Crown icon */}
      <div
        style={{
          fontSize: "120px",
          marginBottom: "20px",
          filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))",
        }}
      >
        👑
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: "72px",
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          marginBottom: "20px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        Sacred Feathers
      </div>

      {/* Chinese title */}
      <div
        style={{
          fontSize: "48px",
          color: "#fbbf24",
          textAlign: "center",
          marginBottom: "30px",
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        神圣羽毛帝国
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: "28px",
          color: "#d1d5db",
          textAlign: "center",
          maxWidth: "800px",
          lineHeight: "1.4",
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        在虚拟世界中崛起的神圣帝国，以智慧与荣耀为基石
      </div>

      {/* Feather decorations */}
      <div
        style={{
          position: "absolute",
          top: "50px",
          left: "100px",
          fontSize: "40px",
          opacity: 0.3,
        }}
      >
        🪶
      </div>
      <div
        style={{
          position: "absolute",
          top: "150px",
          right: "120px",
          fontSize: "35px",
          opacity: 0.4,
        }}
      >
        🪶
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          left: "150px",
          fontSize: "45px",
          opacity: 0.2,
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
