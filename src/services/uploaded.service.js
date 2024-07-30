import { getDataSource } from "../typeorm";
import { Uploaded } from "../typeorm/entity/Uploaded";

export const getFiles = async () => {
  const AppDataSource = await getDataSource();
  const uploadedRepo = AppDataSource.getRepository(Uploaded);
  return await uploadedRepo.find();
};

export const uploadFile = async (uploaded) => {
  const AppDataSource = await getDataSource();
  const uploadedRepo = AppDataSource.getRepository(Uploaded);
  return await uploadedRepo.save(uploaded);
};
