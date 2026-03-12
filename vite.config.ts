import { fileURLToPath, URL } from 'node:url'
import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd())
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0', // 服务器地址
      open: env.VITE_OPEN === 'true', // 是否自动打开浏览器
      hmr: true, // 启用热更新9
      proxy: {
        '/api': {
          target: env.VITE_API_URL, // 目标服务器地址
          changeOrigin: true, // 是否修改请求头中的 Origin 字段
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
