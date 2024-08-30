import express from 'express'
import { AppDataSource } from './infrastructure/internal/database/postgresql/datasorce'
import { Router } from './delivery/routes'
require('dotenv').config()
class Main {
  private app: express.Application

  constructor() {
    this.app = express()
    this.router() 
  }

  private router() {
    this.app.use(express.json())
    this.app.use(express.static('public'))
    new Router(this.app)
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
