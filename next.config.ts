// import { codeInspectorPlugin } from "code-inspector-plugin";
// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	images: {
// 		remotePatterns: [
// 			{
// 				protocol: "https",
// 				hostname: "res.cloudinary.com",
// 				port: "",
// 				pathname: "/**",
// 			},
// 		],
// 	},
// 	output: "standalone",
// 	webpack: (config, { dev, isServer }) => {
// 		config.plugins.push(codeInspectorPlugin({ bundler: "webpack" }));
// 		if (dev && !isServer) {
// 		}

// 		console.log("next.config.js/webpack.plugins", config.plugins);
// 		return config;
// 	},
// };

// export default nextConfig;
// // module.exports = nextConfig

const { codeInspectorPlugin } = require("code-inspector-plugin");
/** @type {import('next').NextConfig} */
const nextConfig = {
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
				hostname: "dummyimage.com",
			},
		],
	},
	output: "standalone",
	webpack: (config, { dev, isServer }) => {
		config.plugins.push(codeInspectorPlugin({ bundler: "webpack" }));
		return config;
	},
};
export default nextConfig;
// module.exports = nextConfig
