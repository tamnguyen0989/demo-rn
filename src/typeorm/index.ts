import { getClickedNumber } from "../services/clicked.service";
import { AppDataSource } from "./data-source"
import { Clicked } from "./entity/Clicked";
import { Uploaded } from "./entity/Uploaded";

AppDataSource.initialize().then(async () => {
    const clickeds = await AppDataSource.manager.find(Clicked)
    if(clickeds.length === 0) {
      const clicked = new Clicked()
      clicked.person = 1
      clicked.photo = 10
      clicked.scan = 25
      clicked.signature = 6
      clicked.vehicle = 3
      await AppDataSource.manager.save(clicked)
    }

    const uploaded = await AppDataSource.manager.find(Uploaded)
    if(uploaded.length === 0) {
      const uploaded = new Uploaded()
      uploaded.uri = ''
      await AppDataSource.manager.save(uploaded)
    }

}).catch(error => console.log(error))

export const getDataSource = (delay = 1000) => {
    if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (AppDataSource.isInitialized) resolve(AppDataSource);
        else reject("Failed to create connection with database");
      }, delay);
    });
  };
