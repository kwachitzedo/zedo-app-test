import type { NextConfig } from "next";

const { codeInspectorPlugin } = require("code-inspector-plugin");

/** @type {NextConfig} */
const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "drive.google.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "dummyimage.com",
			},
		],
	},
	output: "standalone",
	webpack: (config: any) => {
		config.plugins?.push(codeInspectorPlugin({ bundler: "webpack" }));
		return config;
	},
};

export default nextConfig;
