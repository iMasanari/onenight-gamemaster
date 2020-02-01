// @ts-ignore
import Fontmin from 'fontmin'
import { promises as fs } from 'fs'
import glob from 'glob-promise'

const main = async () => {
  const paths = await glob('./src/**/*.{html,vue,ts}')
  const files = await Promise.all(paths.map(path => fs.readFile(path, 'utf-8')))

  const text = `${files.join('')}0123456789`

  const fontmin = new Fontmin()
    .use(Fontmin.glyph({ text }))
    .use(Fontmin.ttf2woff())
    .src('fonts/*.ttf')
    .dest('src/generated/fonts')

  fontmin.run((err: any) => {
    if (err) { throw err }
  })
}

main()
