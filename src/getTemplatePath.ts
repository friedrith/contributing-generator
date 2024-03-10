import path from 'node:path'
import dirname from './services/dirname'

const getTemplatePath = (...filenames: string[]) =>
  path.join(dirname(import.meta.url), '..', 'templates', ...filenames)

export default getTemplatePath
