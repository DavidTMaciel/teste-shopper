import { Main } from './main'

const port = 3000

async function CMD() {
  try {
    const cmd = new Main()
    await cmd.initialize()
    cmd.getApp().listen(port, () => console.log(`Server is running on port ${port}`))
  } catch (error) {
    console.log("Failed to initialize the database:", error)
  }
}

CMD()