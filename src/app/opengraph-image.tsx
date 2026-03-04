import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "MOOD K ENTERTAINMENT";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #1c1816 0%, #262018 40%, #1c1816 100%)",
          position: "relative",
        }}
      >
        {/* Subtle accent glow */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "35%",
            width: "30%",
            height: "40%",
            background: "radial-gradient(ellipse, rgba(212, 180, 133, 0.08) 0%, transparent 70%)",
          }}
        />

        {/* Top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            width: "60%",
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(212, 180, 133, 0.4), transparent)",
          }}
        />

        {/* MOOD K - large */}
        <div
          style={{
            fontSize: "96px",
            fontWeight: 100,
            color: "#f2ece4",
            letterSpacing: "24px",
            lineHeight: 1,
          }}
        >
          MOOD K
        </div>

        {/* ENTERTAINMENT - smaller */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 100,
            color: "#f2ece4",
            letterSpacing: "18px",
            marginTop: "16px",
          }}
        >
          ENTERTAINMENT
        </div>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, rgba(212, 180, 133, 0.6), transparent)",
            marginTop: "32px",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: "16px",
            fontWeight: 300,
            color: "#d4b485",
            letterSpacing: "8px",
            marginTop: "24px",
            opacity: 0.7,
            fontStyle: "italic",
          }}
        >
          Management with Intention
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "20%",
            width: "60%",
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(212, 180, 133, 0.4), transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
