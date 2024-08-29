import { DataSource } from "typeorm"
import "reflect-metadata"
import { MeasureModel } from "./model/measure"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [MeasureModel]
})