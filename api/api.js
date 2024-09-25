const { default: axios } = require("axios");

const baseUrl = "https://tonclayton.fun/api/";
const api = {
  login: async function (token) {
    try {
      const response = await axios.post(
        `${baseUrl}user/login`,
        {},
        {
          headers: {
            "init-data": token,
          },
        }
      );
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  },
  farm: async function (token) {
    try {
      const response = await axios.post(
        `${baseUrl}user/start`,
        {},
        {
          headers: {
            "init-data": token,
          },
        }
      );
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  },
  status: async function (token) {
    try {
      const response = await axios.post(
        `${baseUrl}user/stats`,
        {},
        {
          headers: {
            "init-data": token,
          },
        }
      );
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  },
  statusDailyClaim: async function (token) {
    try {
      const response = await axios.post(
        `${baseUrl}user/daily-reward-status`,
        {},
        {
          headers: {
            "init-data": token,
          },
        }
      );
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  },
  dailyTask: async function (token) {
    try {
      const response = await axios.post(
        `${baseUrl}user/daily-tasks`,
        {},
        {
          headers: {
            "init-data": token,
          },
        }
      );
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  },
  dailyClaim: async function (token) {
    try {
      const response = await axios.post(
        `${baseUrl}user/daily-claim`,
        {},
        {
          headers: {
            "init-data": token,
          },
        }
      );
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  },
  questPartner: async function (token) {
    try {
      const response = await axios.post(
        `${baseUrl}user/partner/get`,
        {},
        {
          headers: {
            "init-data": token,
          },
        }
      );
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  },
  questPartnerComplete: async function (token, id_task) {
    try {
      const response = await axios.post(
        `${baseUrl}user/partner/complete/${id_task}`,
        {},
        {
          headers: {
            "init-data": token,
          },
        }
      );
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  },
  questPartnerCompleteReward: async function (token, id_task) {
    try {
      const response = await axios.post(
        `${baseUrl}user/partner/reward/${id_task}`,
        {},
        {
          headers: {
            "init-data": token,
          },
        }
      );
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  },
  gameStack: async function (token) {
    try {
      const response = await axios.post(
        `${baseUrl}stack/start`,
        {},
        {
          headers: {
            "init-data": token,
          },
        }
      );
      let numberAwal = 10;
      for (let index = 0; index < 8; index++) {
        const responseUpdate = await axios.post(
          `${baseUrl}stack/update`,
          { score: numberAwal },
          {
            headers: {
              "init-data": token,
            },
          }
        );
        numberAwal += 10;
        // console.log(`numberAwal hasil update`, numberAwal);
        // console.log(responseUpdate.data);
      }
      const updateScore = await axios.post(
        `${baseUrl}stack/end`,
        { score: numberAwal },
        {
          headers: {
            "init-data": token,
          },
        }
      );
      // console.log(updateScore.data);
      return updateScore.data;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  },
};

module.exports = api;
