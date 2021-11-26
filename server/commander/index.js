import { runCommand } from 'console-command-manager'
import { allocateApplication, disposeApplication } from '../app'
import User from '../db/User'
import faker from 'faker'

require('dotenv').config();

(async function () {
  await allocateApplication()

  await runCommand(
    [
      {
        name: 'user_list',
        title: 'Prints users',
        handler: async () => {
          const users = await User.find()      
          console.log(users)
        }
      },
      {
        name: 'user_generate_fake',
        title: 'Generate and save a fake user.',
        handler: async () => {
          const user = new User({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: '123456'
          })      
          await user.save()
          console.log(user)
          console.log(`${user.name} with email ${user.email} has been generated.`)
        }
      },
      {
        name: 'user_test',
        title: 'Testing...',
        handler: async ({request, injection: {console, DateFactory}}) => {
          const imageUrl = faker.image.city()
          console.log(imageUrl)
        }
      },
    ],
    {
      DateFactory: Date
    },
    process.argv.slice(2)
  )

  await disposeApplication()
})()