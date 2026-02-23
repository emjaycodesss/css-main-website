import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js + WebGL — heaviest deps, rarely change → long cache life
          'vendor-three': ['three', 'shadergradient', '@react-three/fiber', '@react-three/drei'],
          // Animation runtimes
          'vendor-animation': ['gsap', '@gsap/react', 'motion'],
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Scroll + UI utilities
          'vendor-ui': ['lenis', 'lucide-react', 'clsx', 'tailwind-merge', 'class-variance-authority'],
        },
      },
    },
  },
})
