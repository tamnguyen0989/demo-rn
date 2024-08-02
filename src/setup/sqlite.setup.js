import * as SQLite from 'expo-sqlite'

import { tbClicked, tbUploaded } from '../constants/sqlite.constants'
import { Platform } from 'react-native'
import { getWebSto, isMobile, setWebSto } from '../utils/helper'
import { clickedSto, uploadedSto } from '../constants/storage.constant'

let db = null

if (isMobile()) db = SQLite.openDatabaseSync('demo.db')

export async function initDatabase(db) {
  if (isMobile()) {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS ${tbClicked} (id INTEGER PRIMARY KEY AUTOINCREMENT, person INTEGER, photo INTEGER, scan INTEGER, signature INTEGER, vehicle INTEGER)`,
    )

    const clickeds = await db.getAllAsync(`SELECT * FROM ${tbClicked}`)

    if (clickeds?.length === 0)
      await db.runAsync(
        `INSERT INTO ${tbClicked} (person, photo, scan, signature, vehicle) VALUES (1, 10, 25, 6, 3)`,
      )

    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS ${tbUploaded} (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT, type INTEGER)`,
    )

    const uploadedImages = await db.getAllAsync(
      `SELECT * FROM ${tbUploaded} WHERE type = 1`,
    )
    if (uploadedImages?.length === 0)
      await db.runAsync(`INSERT INTO ${tbUploaded} (uri, type) VALUES ('', 1)`)

    const uploadedSignatures = await db.getAllAsync(
      `SELECT * FROM ${tbUploaded} WHERE type = 2`,
    )
    if (uploadedSignatures?.length === 0)
      await db.runAsync(`INSERT INTO ${tbUploaded} (uri, type) VALUES ('', 2)`)
  } else {
    const initClickeds = [
      {
        id: 1,
        person: 1,
        photo: 10,
        scan: 25,
        signature: 6,
        vehicle: 3,
      },
    ]
    const initUploadeds = [
      { id: 1, uri: '', type: 1 },
      { id: 2, uri: '', type: 2 },
    ]

    const clickeds = getWebSto(clickedSto) || []
    if (clickeds.length === 0) setWebSto(clickedSto, initClickeds)

    const uploadeds = getWebSto(uploadedSto) || []
    if (uploadeds.length === 0) setWebSto(uploadedSto, initUploadeds)
  }
}

export default db
