import api from "./api";
import TokenService from "./token.service";

class AuthService {
  async login({ email, password }) {
    return api
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        if (!response.data.success) throw new Error(response.data.message);
        return response.data;
      })
      .then(({ data }) => {
        if (data.accessToken) {
          TokenService.setUser(data);
        }

        return data;
      })
      .catch((e) => {
        return e.message;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  async register({ email, password }) {
    return api
      .post("/auth/register", {
        email,
        password,
      })
      .then((response) => {
        if (!response.data.success) throw new Error(response.data.message);
        return response.data;
      })
      .then(({ data }) => {
        if (data.accessToken) {
          TokenService.setUser(data);
        }
        return data;
      })
      .catch((e) => {
        return e.message;
      });
  }

  async reloadUser() {
    return api
      .get("/user/me")
      .then((response) => {
        if (!response.data.success) throw new Error(response.data.message);
        return response.data;
      })
      .then(({ data }) => {
        console.log(data);
        if (data.accessToken) {
          TokenService.setUser(data);
        }

        return data;
      })
      .catch((e) => {
        return e.message;
      });
  }
}

export default new AuthService();
