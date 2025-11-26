// 글 관련한거

import express from "express";
import * as postController from "../controller/post.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";
import { isAuth } from "../middleware/auth.mjs";

const router = express.Router();

const validatePost = [
  body("text").trim().isLength({ min: 4 }).withMessage("최소 4자 이상 입력"),
  validate,
];

// 전체 포스트 가져오기
// 특정 아이디에 대한 포스트 가져오기
// HTTP://127.0.0.1:8000/post
// HTTP://127.0.0.1:8000/post?userid=XXX
router.get("/", isAuth, postController.getPosts);

// 글 번호에 대한 포스트 가져오기
// HTTP://127.0.0.1:8000/post/:id
router.get("/:id", isAuth, postController.getPost);

// 포스트 쓰기
// HTTP://127.0.0.1:8000/post/
router.post("/", isAuth, validatePost, postController.createPost);

// 포스트 수정하기
// HTTP://127.0.0.1:8000/post/:id
router.put("/:id", isAuth, validatePost, postController.updataePost);

// 포스트 삭제하기
// HTTP://127.0.0.1:8000/post/:id
router.delete("/:id", isAuth, postController.deletePost);

export default router;
// npm i express-validator
