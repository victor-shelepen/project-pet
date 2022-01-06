import { runCommand } from 'console-command-manager'
import { allocateApplication, disposeApplication } from '../app'
import { groups as userGroups, commands as userCommands} from './user'
import { groups as appGroups, commands as appCommands} from './app'
import { groups as currencyGroups, commands as currencyCommands} from './currency'

require('dotenv').config();

(async function () {
  await allocateApplication()

  const groups = [
    ...appGroups,
    ...userGroups,
    ...currencyGroups
  ]
  const commands = [
    ...appCommands,
    ...userCommands,
    ...currencyCommands
  ]

  await runCommand(
    process.argv.slice(2),
    commands,
    groups,
    {
      DateFactory: Date
    }
  )

  await disposeApplication()
})()