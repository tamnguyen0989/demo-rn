import "reflect-metadata"
import { DataSource } from "typeorm"
import { Clicked } from "./entity/Clicked"
import { Uploaded } from "./entity/Uploaded"

export const AppDataSource = new DataSource({
    type: "expo",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Clicked, Uploaded],
    migrations: [],
    subscribers: [],
    driver: require("expo-sqlite")
})
