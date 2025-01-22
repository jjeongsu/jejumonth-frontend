import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://api.visitjeju.net', // 실제 API 서버
  //       changeOrigin: true, // CORS 문제 해결
  //       rewrite: (path) => path.replace(/^\/api/, ''), // /api를 제거하여 실제 요청 경로를 맞춤
  //     },
  //   },
  // },
  // define: {
  //   // Vite가 환경 변수를 인식하도록 설정
  //   'process.env': process.env,
  // },
});