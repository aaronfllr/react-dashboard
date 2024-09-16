import UserService from "@src/services/UserService";
import { IReq, IRes } from "./common/types";
import HttpStatusCodes from "@src/common/HttpStatusCodes";

async function getAll(_: IReq, res: IRes) {
  return res.status(HttpStatusCodes.OK).json("Hey it works")
}

export default {
    getAll
} as const;