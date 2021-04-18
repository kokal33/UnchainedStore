import { User } from "../models/backendModels";

    export function setUser(user: User) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    }

    export function getUser() {
      const userString = localStorage.getItem("loggedInUser");
      if (userString)
          return JSON.parse(userString) as User;
      return undefined;
    }

    export function clearCache() {
      localStorage.removeItem("loggedInUser");
    }

