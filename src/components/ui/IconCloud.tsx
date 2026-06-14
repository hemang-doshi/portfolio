"use client";

import React from "react";
import { Cloud } from "react-icon-cloud";

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

const iconSlugs = [
  "typescript",
  "javascript",
  "react",
  "nextdotjs",
  "tailwindcss",
  "nodedotjs",
  "python",
  "fastapi",
  "docker",
  "git",
  "supabase",
  "postgresql",
  "github",
  "openai",
  "html5",
  "css3",
  "googlecloud",
  "anthropic",
  "nextcloud",
  "pnpm"
];

export function IconCloud() {
  return (
    <div className="flex items-center justify-center size-full relative">
      <Cloud options={cloudProps.options} containerProps={cloudProps.containerProps}>
        {iconSlugs.map((slug) => {
          const url = `https://cdn.simpleicons.org/${slug}`;
          return (
            <a 
              key={slug} 
              href={`https://simpleicons.org/icons/${slug}`} 
              target="_blank" 
              rel="noreferrer"
              title={slug.charAt(0).toUpperCase() + slug.slice(1)}
              onClick={(e) => {
                // Prevent navigate, just print or do nothing, keeping it smooth
                e.preventDefault();
              }}
            >
              <img 
                src={url} 
                alt={slug} 
                width={52} 
                height={52}
                style={{ width: "52px", height: "52px", objectFit: "contain" }}
              />
            </a>
          );
        })}
      </Cloud>
    </div>
  );
}
