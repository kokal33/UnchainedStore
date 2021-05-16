import { User } from "../models/backendModels";

    export function setUserLocal(user: User) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    }

    export function getUserLocal() {
      const userString = localStorage.getItem("loggedInUser");
      if (userString)
          return JSON.parse(userString) as User;
      return undefined;
    }

    export function clearCache() {
      localStorage.removeItem("loggedInUser");
    }

