
import Router from "@koa/router";

const router = new Router();

import UserController from "../controller/user.js";
import validation from "../../middleware/validation.js";
import userValidation from "../validation/user.js";

router.post("/v1/users", validation(userValidation.create), UserController.create);
router.put("/v1/users/:id", validation(userValidation.update), UserController.update);
router.delete("/v1/users/:id", validation(userValidation.delete), UserController.delete);
router.get("/v1/users/:id", validation(userValidation.get), UserController.get);
router.get("/v1/users", validation(userValidation.list), UserController.list);

export default new Router().use("/api", router.routes());
