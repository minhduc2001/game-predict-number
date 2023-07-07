import api from "./api";
class SessionService {
  async getTurn() {
    return api
      .get("session/get-turn")
      .then((response) => response.data)
      .then(({ data }) => data);
  }
  async getCLTX() {
    return api
      .get("session/cltx")
      .then((response) => response.data)
      .then(({ data }) => data);
  }
}

export default new SessionService();
