import { Router } from "express";
import { check } from "express-validator";
import { getPublicationById, publicationDelete, publicationGet, publicationPost, publicationPut } from './publication.controller.js';
import { existsPublicationById } from "../helpers/db-validator.js"
import { validateFields } from "../middlewares/validate-fields.js";

const router = Router();

router.get("/", publicationGet)

router.get(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsPublicationById),
        validateFields,
    ],
    getPublicationById
);

router.post(
    "/create",
    [
        check("title", "this tittle is required").not().isEmpty(),
        check("description", "this description is required").not().isEmpty(),
        check("author", "this author is required").not().isEmpty(),
        check("url", "this author is required").not().isEmpty(),
        validateFields,
    ],
    publicationPost
);

router.put(
    "/edit/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsPublicationById),
        validateFields,
    ], publicationPut
);

router.delete(
    "/delete/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsPublicationById),
        validateFields,
    ], publicationDelete
);

export default router;