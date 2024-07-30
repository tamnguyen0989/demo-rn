import { getDataSource } from "../typeorm";
import { Clicked } from "../typeorm/entity/Clicked";

export const getClickedNumber = async () => {
  const AppDataSource = await getDataSource();
  const clickedRepo = AppDataSource.getRepository(Clicked);
  return await clickedRepo.find();
};

export const updateClickedNumber = async (clicked) => {
  const AppDataSource = await getDataSource();
  const clickedRepo = AppDataSource.getRepository(Clicked);
  return await clickedRepo.save(clicked);
};
