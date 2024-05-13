
import { Router } from "express";
import { check } from "express-validator";
import { commentsGet, commentsPost, commentsPut, commentDelete, getCommentById } from './comment.controller.js';
import { existsCommentById } from "../helpers/db-validator.js";
import { validateFields } from "../middlewares/validate-fields.js";

const router = Router();

router.get("/", commentsGet);

router.get(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsCommentById),
        validateFields,
    ],
    getCommentById
);

router.post(
    "/create",
    [
        check("publicationId", "this comment is required").not().isEmpty(),
        check("comment", "this id is required").not().isEmpty(),
        check("author", "this id is required").not().isEmpty(),
        validateFields,
    ],
    commentsPost
);

router.put(
    "/edit/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsCommentById),
        validateFields,
    ], commentsPut
);

router.delete(
    "/delete/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsCommentById),
        validateFields,
    ], commentDelete
);

export default router;
