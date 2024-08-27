import express from 'express'
import { AppDataSource } from './infrastructure/internal/database/postgresql/datasorce'
import { Router } from './delivery/routes'
require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

class Main {
  private app: express.Application

  constructor() {
    this.app = express()
    this.router()
    this.setupGenerativeAI()  
  }

  private router() {
    this.app.use(express.json())
    new Router(this.app)
  }

  private setupGenerativeAI() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    async function run() {
      const chatSession = genAI.startChat({ history: [] })

      const result = await chatSession.sendMessage("INSERT_INPUT_HERE")
      console.log(result.response.text())
    }

    run()
  }

  public async initialize() {
    try {
      await AppDataSource.initialize()
    } catch (error) {
      console.log("Failed to initialize the database:", error)
      throw error
    }
  }

  public getApp() {
    return this.app
  }
}

export { Main }
