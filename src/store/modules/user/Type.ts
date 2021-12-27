import { UserI } from "@/https/login/Type";
import { BasePowerItemI } from "@/https/setting/power/Type";

export interface UserStateI {
  userInfo: UserI | null,
  authList: BasePowerItemI[]
}