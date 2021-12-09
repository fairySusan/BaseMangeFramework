import { CommonStateI } from './modules/common/Type';
import { UserStateI } from './modules/user/Type';


export interface RootState{
  common: CommonStateI,
  user: UserStateI
}
