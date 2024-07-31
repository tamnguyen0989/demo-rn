// export const updateClickedNumber = async (db, clicked) => {
//   const { id, person, photo, scan, signature, vehicle } = clicked;
//   db.transaction((tx) => {
//     tx.executeSql(
//       `UPDATE ${tbClicked} SET person = ?, photo = ?, scan = ?, signature = ?, vehicle = ? WHERE id = ? `,
//       [person, photo, scan, signature, vehicle, id]
//     );
//   });
// };
