import path from 'node:path'
import { promises as fs } from 'node:fs'

export const findProjectInfomation = async () => {
  let currentFile = path.resolve(process.cwd(), 'package.json')

  while (!fs.access(currentFile)) {
    currentFile = path.resolve(currentFile, '../package.json')
  }

  try {
    const content = JSON.parse(await fs.readFile(currentFile, 'utf-8'))

    return content
  } catch (error) {
    return null
  }
}
