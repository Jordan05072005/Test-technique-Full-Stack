import { defineConfig } from 'vite'
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, path.resolve(__dirname, '../')); 
  return {
		plugins: [react(), tailwindcss()],
		optimizeDeps: {
    	include: ["@radix-ui/react-checkbox"]
  	},
  	ssr: {
    // Empêche Vite/SSR de laisser le paquet non-transpilé
    	noExternal: ["@radix-ui/react-checkbox"]
  	},
		 define: {
    'import.meta.env.VITE_JWT_KEY': JSON.stringify(env.VITE_JWT_KEY),},
		resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
	server: {
    host: true,
    port: 5173,
		proxy: {
      '/api': {
        target: 'http://back:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
  }},
	css: {
    postcss: './tailwind.config.ts', // ← assure-toi que ce fichier existe
  },
}})

