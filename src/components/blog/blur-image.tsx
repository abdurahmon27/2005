"use client";
import React, { useState } from "react";

export function BlurImage({
  src,
  alt,
  className = "",
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: "#232425" }}
    >
      <img
        src={src}
        alt={alt}
        className={`transition-all duration-700 w-full h-full object-cover ${
          loaded ? "blur-0" : "blur-md scale-105 grayscale"
        } `}
        onLoad={() => setLoaded(true)}
        {...props}
      />
      {!loaded && <div className="absolute inset-0 bg-[#232425] animate-pulse" />}
    </div>
  );
}
