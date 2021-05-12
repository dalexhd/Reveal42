module.exports = {
	future: {
		purgeLayersByDefault: true
	},
	purge: {
		enabled: process.env.NODE_ENV === "production",
		content: [
			"components/**/*.vue",
			"layouts/**/*.vue",
			"pages/**/*.vue",
			"plugins/**/*.js",
			"nuxt.config.js",
			// TypeScript
			"plugins/**/*.ts",
			"nuxt.config.ts"
		]
	},
	important: true,
	theme: {
		extend: {}
	},
	variants: {},
	plugins: []
};
