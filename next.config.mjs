import CopyPlugin from "copy-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  transpilePackages: [
    "@electric-sql/pglite-react", // Optional
    "@electric-sql/pglite",
    "drizzle-orm",
    "drizzle-kit",
  ],
  webpack: (config, { isServer, buildId, dev, webpack }) => {
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    });
    config.module.rules.push({
      test: /\.sql$/,
      type: "asset/source",
    });
    config.plugins.push(
      new CopyPlugin({
        patterns: [{ from: "drizzle", to: "assets/drizzle" }],
      })
    );
    return config;
  },
};

export default nextConfig;
