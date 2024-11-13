import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'


export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'src/assets/*', dest: 'assets/' }, // 将 src/assets 下的文件复制到 dist/assets
        { src: 'basic.jpg', dest: '.' }, // 将 src/assets 下的文件复制到 dist/assets
      ]
    })
  ],
  build: {
  }
})
