import UserBody from "../bodies/UserBody";
import User from "../entities/User";

export interface UserStoreType {
  users: User[];
  user: User;
  getUserListApi: () => void;
  getUserApi: (id: number) => void;
  deleteUserApi: (id: number) => Promise<boolean>;
  createUserApi: (data: UserBody) => Promise<boolean>;
  updateUserApi: (id: number, data: UserBody) => Promise<boolean>;
}
