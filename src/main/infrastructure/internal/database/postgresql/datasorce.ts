import { DataSource } from "typeorm"
import "reflect-metadata"
require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "isabelle.db.elephantsql.com",
    port: 5432,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: []
})