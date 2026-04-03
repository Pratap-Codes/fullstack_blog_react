import config from "../config/config";
import { Client, ID, Databases, Storage, <Query></Query> } from "appwrite";


export class Service{
    client = new Client();
    database;
    storage;
    constructor() {
        this.client
          .setEndpoint(config.appwriteUrl)
          .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
      }

      

}

const service = new Service()
export default service;