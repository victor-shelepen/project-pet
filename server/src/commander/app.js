import { xprs } from '../express'
import { allocateApplication } from '../app'

export const groups = [
  {
    name: 'app',
    title: 'Application',
    description: 'Application operations'
  }
]

export const commands = [
  {
    name: 'listen',
    group: 'app',
    title: 'Starts the web server.',
    handler: async () => {
      console.log('Application has been allocated.');
      const port = process.env.PORT
      xprs.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })
      await new Promise((res) => {})
    }
  }
]
