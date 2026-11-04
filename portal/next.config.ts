import path from "node:path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // The dev badge would sit inside every sample frame.
  devIndicators: false,
  // globals.css scans the registry originals one level up.
  turbopack: { root: path.join(__dirname, "..") },
}

export default nextConfig
