import path from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'


export default defineConfig({
  base: './',
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'src/assets/*', dest: 'assets/' }, // 将 src/assets 下的文件复制到 dist/assets
        { src: 'basic.jpg', dest: 'assets/' }, // 将 src/assets 下的文件复制到 dist/assets
      ]
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'lansetechOnlineImageEditor',
      fileName: (format) => `online-image-editor-${format}.js`,
      formats: ['es'], // 生成 UMD 和 ES Module 格式
    }
  }
})
