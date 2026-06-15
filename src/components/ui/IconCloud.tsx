"use client";

import React from "react";
import { Cloud } from "react-icon-cloud";
import iconsData from "@/data/icons-data.json";

const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      maxWidth: "480px",
      margin: "0 auto"
    },
  },
  options: {
    reverse: true,
    depth: 0.8,
    wheelZoom: false,
    imageScale: 2.2,
    activeCursor: "pointer",
    tooltip: "native" as const,
    initial: [0.08, -0.08],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.03,
    minSpeed: 0.012,
  },
};

function getBase64Svg(path: string, color: string, title: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" style="fill: ${color};" viewBox="0 0 24 24" height="52" width="52"> <title>${title}</title> <path d="${path}"></path> </svg>`;
  const base64 = typeof window !== "undefined"
    ? window.btoa(unescape(encodeURIComponent(svg)))
    : Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

export function IconCloud() {
  const icons = React.useMemo(() => {
    return Object.values(iconsData).map((icon) => {
      const src = getBase64Svg(icon.path, icon.hex, icon.title);
      return (
        <a 
          key={icon.slug} 
          href={`https://simpleicons.org/icons/${icon.slug}`} 
          target="_blank" 
          rel="noreferrer"
          title={icon.title}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <img 
            src={src} 
            alt={icon.title} 
            width={52} 
            height={52}
            style={{ width: "52px", height: "52px", objectFit: "contain" }}
          />
        </a>
      );
    });
  }, []);

  return (
    <div className="flex items-center justify-center size-full relative">
      <Cloud options={cloudProps.options} containerProps={cloudProps.containerProps}>
        {icons}
      </Cloud>
    </div>
  );
}
