import api from "./api";
class TransactionService {
  async listDataTable(limit) {
    return api
      .get(`transaction?limit=${limit}`)
      .then((response) => {
        // console.log(response);
        return response.data;
      })
      .then(({ data }) => data);
  }

  async setSelection(data) {
    return api
      .post(`transaction`, data)
      .then((response) => response.data)
      .then(({ data }) => data);
  }
}

export default new TransactionService();
