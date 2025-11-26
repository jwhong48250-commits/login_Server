// 회원 가입 정보
import MongoDB from "mongodb";
import { getUsers } from "../db/database.mjs";

const ObjectID = MongoDB.ObjectId;

// 사용자 아이디에 대한 사용자를 리턴
export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => result.insertedId.toString());
}

// 로그인
// export async function login(userid, password) {
//   const user = users.find(
//     (user) => user.userid === userid && user.password === password
//   );
//   return user;
// }

export async function findByUserid(userid) {
  return getUsers().find({ userid }).next().then(mapOptionalUser);
}

export async function findById(id) {
  return getUsers()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalUser);
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
