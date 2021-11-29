import User from '../db/User'
import faker from 'faker'

export const groups = [
  {
    name: 'user',
    title: 'User',
    description: 'User operations'
  }
]

export const commands = [
  {
    name: 'list',
    group: 'user',
    title: 'Prints users',
    handler: async () => {
      const users = await User.find()      
      console.log(users)
    }
  },
  {
    name: 'generate_fake',
    title: 'Generate and save a fake user.',
    group: 'user',
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
]
