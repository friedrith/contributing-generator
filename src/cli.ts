#!/usr/bin/env node

import generator from './generator'
import packageJson from '../package.json'

if (['--version', '-v'].find(arg => process.argv.includes(arg))) {
  console.log('v' + packageJson.version)
} else {
  generator()
}
