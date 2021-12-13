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
      const users = await User
        .find()
      const objectUsers = users.map(u => u.toObject())
      console.table(objectUsers)
    }
  },
  {
    name: 'reset_password',
    group: 'user',
    title: 'Resets the password.',
    handler: async ({request}) => {
      const [ email, password] = request.values
      if (!password) {
        console.log('The password is absent.')
        return
      }
      const user = await User.findOne({ email })
      if (!user) {
        console.log(`The user with the email ${email} is not found.`)
        return
      }
      user.password = password
      await user.save()
      console.log(`${email} has changed the password successfuly.`);
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
