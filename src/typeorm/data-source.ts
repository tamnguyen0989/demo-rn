import "reflect-metadata"
import { DataSource } from "typeorm"
import { Clicked } from "./entity/Clicked"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "expo",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Clicked],
    migrations: [],
    subscribers: [],
    driver: require("expo-sqlite")
})
