import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@config": path.resolve(__dirname, "./src/config"),
			"@services": path.resolve(__dirname, "./src/services"),
			"@context": path.resolve(__dirname, "./src/context"),
		},
	},
	plugins: [react({})],
});
