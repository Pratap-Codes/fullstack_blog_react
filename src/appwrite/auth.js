import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        {userId: ID.unique(),
        email,
        password,
        name,}
      );
      if (userAccount) {
        return this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.error("Appwrite :: createAccount :: error", error);
      return null; // ✅ doing something useful, not just rethrowing
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({email, password});
    } catch (error) {
      console.error("Appwrite :: login :: error", error);
      return null; // ✅ doing something useful
    }
  }

  async getCurrentUser(){
    try {
        return await this.account.get();
    } catch (error) {
        console.error("Appwrite service :: getCurrentUser :: error", error)
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;
