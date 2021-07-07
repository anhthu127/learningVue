import { API_CONFIG } from "../config";
import { Api } from "@/api/Api";
import User from "@/types/entities/User";
import UserBody from "@/types/bodies/UserBody";

/**
 * Export class UserApi
 */
export default class UserApi extends Api {
  /**
   * Constructor
   */
  public constructor() {
    super(API_CONFIG);
    this.apiName = "user";
  }

  /**
   * Get users
   * @returns Promise<User[]>
   */
  public async getUsers(): Promise<User[]> {
    return await this.doRequest("get", "/users/");
  }

  /**
   * Get user
   * @returns Promise<User>
   */
  public async getUser(id: number): Promise<User> {
    return await this.doRequest("get", "/users/" + id);
  }

  /**
   * Create user
   *
   * @return Promise<boolean>
   */
  public async createUser(data: UserBody): Promise<boolean> {
    return await this.doRequest("post", "/users/", data);
  }

  /**
   * Update user
   *
   * @return Promise<boolean>
   */
  public async updateUser(id: number, data: UserBody): Promise<boolean> {
    return await this.doRequest("put", "/users/" + id, data);
  }

  /**
   * Delete user
   *
   * @return Promise<boolean>
   */
  public async deleteUser(id: number): Promise<boolean> {
    return await this.doRequest("delete", "/users/" + id);
  }
}
