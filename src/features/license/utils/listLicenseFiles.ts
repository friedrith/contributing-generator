import { promises as fs } from 'node:fs'
import path from 'node:path'
import cleanLicenseName from './cleanLicenseName'
import getTemplatePath from '../../../getTemplatePath'

const TEMPLATES = getTemplatePath('LICENSE')

export const getFullPath = (basename: string) => path.join(TEMPLATES, basename)

const listLicenseFiles = async () =>
  (await fs.readdir(TEMPLATES))
    .filter(f => f.endsWith('.txt'))
    .map(license => ({
      value: getFullPath(license),
      name: cleanLicenseName(license),
    }))

export default listLicenseFiles
