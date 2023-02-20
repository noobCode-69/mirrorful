import chalk from 'chalk'
import path from 'path'
import { PackageManager } from './helpers/get-pkg-manager'
import { isWriteable } from './helpers/is-writeable'
import { makeDir } from './helpers/make-dir'
import spawn from 'cross-spawn'

export async function init({
  appPath,
  packageManager,
}: {
  appPath: string
  packageManager: PackageManager
}) {
  const root = path.resolve(appPath)

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.'
    )
    console.error(
      'It is likely you do not have write permissions for this folder.'
    )
    process.exit(1)
  }

  // TODO(Danilowicz): everything is development right now
  const NODE_ENV = 'development'
  await makeDir('.mirrorful')
  const port = 5050 // don't hard code this
  const result = spawn.sync('yarn', ['run', 'dev'], {
    stdio: 'inherit',
  })

  const useYarn = packageManager === 'yarn'
  console.log(`${chalk.green('Success!')} 🚀`)
  console.log()
  console.log(`Running on port ${chalk.cyan(port.toString())}`)
  console.log()
  console.log('Inside your project, you can run:')
  console.log()
  console.log(chalk.cyan(`  ${useYarn ? 'yarn run ' : 'npx '}mirrorful`))
  console.log('to start the mirrorful development server at any time.')
  console.log()
}
