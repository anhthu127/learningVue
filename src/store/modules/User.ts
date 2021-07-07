import UserBody from "@/types/bodies/UserBody";
import UserApi from "@/api/apis/UserApi";
import { inject, InjectionKey, reactive } from "vue";
import User, { UserInit } from "@/types/entities/User";
import { UserStoreType } from "@/types/stores/UserStoreType";

export const UserStoreKey: InjectionKey<UserStoreType> = Symbol("useUserStore");
export const UserKey: InjectionKey<User> = Symbol("user");

export function useUserStore(): UserStoreType {
  const store = inject(UserStoreKey);
  if (!store) {
    throw new Error(`${UserStoreKey} is not provided`);
  }
  return store;
}

export function userStore(): UserStoreType {
  const api = new UserApi();
  const users: User[] = reactive([]);
  const user: User = reactive(UserInit);

  return {
    users,
    user,
    async getUserListApi() {
      users.length = 0;
      const rs = await api.getUsers();
      rs.forEach((it: User) => {
        users.push(it);
      });
    },
    async getUserApi(id: number) {
      const response = await api.getUser(id);
      user.id = response.id;
      user.name = response.name;
      user.email = response.email;
    },
    async deleteUserApi(id: number) {
      return await api.deleteUser(id);
    },
    async createUserApi(data: UserBody) {
      return await api.createUser(data);
    },
    async updateUserApi(id: number, data: UserBody) {
      return await api.updateUser(id, data);
    },
  };
}
