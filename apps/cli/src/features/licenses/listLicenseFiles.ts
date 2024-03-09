import { promises as fs } from 'node:fs'
import path from 'node:path'
import dirname from '../../services/dirname'
import cleanLicenseName from './cleanLicenseName'

// hack because of ESM
const TEMPLATES = path.join(dirname(import.meta.url), 'templates')

export const getFullPath = (basename: string) => path.join(TEMPLATES, basename)

const listLicenseFiles = async () =>
  (await fs.readdir(TEMPLATES))
    .filter(f => f.endsWith('.txt'))
    .map(license => ({
      value: getFullPath(license),
      name: cleanLicenseName(license),
    }))

export default listLicenseFiles
