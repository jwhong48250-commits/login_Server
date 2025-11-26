import MongoDB, { ReturnDocument } from "mongodb";
import { getPosts } from "../db/database.mjs";
import * as UserRepository from "./auth.mjs";

const ObjectID = MongoDB.ObjectId;

// 모든 포스트를 리턴
export async function getALL() {
  return getPosts().find().sort({ createdAAt: -1 }).toArray();
}

// 사용자 아이디에 대한 포스트를 리턴
export async function getALLByUserid(userid) {
  return getPosts().find({ userid }).sort({ createdAAt: -1 }).toArray();
}

// 글번호에 대한 포스트를 리턴
export async function getById(id) {
  return getPosts()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalPost);
}

// 포스트 작성
export async function create(text, id) {
  return UserRepository.findById(id)
    .then((user) =>
      getPosts().insertOne({
        text,
        createdAt: new Date(),
        idx: user.id,
        name: user.name,
        userid: user.userid,
        url: user.url,
      })
    )
    .then((result) => {
      return getPosts().findOne({ _id: result.insertedId });
    });
}

// 포스트를 변경
export async function update(id, text) {
  return getPosts()
    .findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: { text } },
      { returnDocument: "after" }
    )
    .then((result) => result);
}

//포스트 삭제하기
export async function remove(id) {
  return getPosts().deleteOne({ _id: new ObjectID(id) });
}

function mapOptionalPost(post) {
  return post ? { ...post, id: post._id.toString() } : post;
}
