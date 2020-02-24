//Api Methods
const POST = 'POST';
const GET = 'GET';
const PUT = 'PUT';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOnRydWUsImlkIjoiTVc1YWZaaEJBTlE5aTgyTERZZUwiLCJpYXQiOjE1Nzc1OTMxOTcsImV4cCI6MTczNTM4MTE5N30.6wsBGF8CLsfaQ3OSQjuip8JtoFtV_y-sknha6ZoojYQ';
// Multipart Form Data Header for multimedia
const MULTIPART_APP_HEADER = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data;',
  Authorization: 'Basic YWRtaW46YWRtaW4=',
};

const BASE_URL = 'http://34.93.234.46/api/v1/';

const api = {
  sendOTP: BASE_URL + 'generateOTP',
  authenticateUser: BASE_URL + 'auth',

  rewardCategories: BASE_URL + 'categories',
  rewardList: BASE_URL + 'rewards',
  reward_redemptio: BASE_URL + 'reward_redemption/',
  getDataFromIntelligence: BASE_URL + 'videointelligence/',
  profileDetail: BASE_URL + 'user/',
  newProfileDetail: BASE_URL + 'appuserupdate/',

  healthDetail: BASE_URL + 'healthprofile/' + '',
  updateUserSetting: BASE_URL + 'update_settings',

  dashBoardDetail: BASE_URL + 'dashboard?user_id=',
  activitiesList: BASE_URL + 'activities?user_id=',
  getOrders: BASE_URL + 'orders/',
  updateUserDetail: BASE_URL + 'profileupdate/',

  gettMultipleQuestions: BASE_URL + 'screening_questions',
  saveeMultipleQuestions: BASE_URL + 'screening_questions',

  updateProfileImage: BASE_URL + 'asset/image/user_profile/',
  getAllCities: BASE_URL + 'location/cities',
};

//sendOTP
const generateOTP = jsonObj => {
  return fetch(api.sendOTP, {
    method: POST,
    body: jsonObj,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};
// Authenticate User
const authenticateUser = jsonObj => {
  return fetch(api.authenticateUser, {
    method: POST,
    body: jsonObj,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

// get Reward Categories
const getRewardCategories = () => {
  return fetch(api.rewardCategories, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

// Get Reward list
const getRewardListing = jsonobj => {
  let header =
    jsonobj == undefined
      ? {
          method: GET,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.accessToken,
          },
        }
      : {
          method: POST,
          body: jsonobj,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.accessToken,
          },
        };
  return fetch(api.rewardList, header)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

const getRewardRedemption = jsonObj => {
  return fetch(api.reward_redemptio + jsonObj, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(err => console.log(err));
};

const getUserDetails = id => {
  return fetch(api.profileDetail + id, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

// get user profile Detail
const updateUserProfile = (id, jsonObj) => {
  return fetch(api.newProfileDetail + id, {
    method: PUT,
    body: jsonObj,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

//User Health Detail
const getHealthDetail = jsonObj => {
  return fetch(api.healthDetail + jsonObj, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

//User Health Detail
const updateUserSetting = jsonObj => {
  return fetch(api.updateUserSetting, {
    method: PUT,
    body: jsonObj,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

const dashBoardDetails = userId => {
  return fetch(api.dashBoardDetail + userId, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

const getActivities = userId => {
  return fetch(api.activitiesList + userId, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);

      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

const getAllOrders = userId => {
  return fetch(api.getOrders + userId, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);

      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

const updateUserDetail = (userId, jsonObj) => {
  return fetch(api.updateUserDetail + userId, {
    method: PUT,
    body: jsonObj,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

const getMultipleQuestions = gender => {
  return fetch(api.gettMultipleQuestions + '?gender=' + gender, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

const saveMultipleQuestions = jsonObj => {
  return fetch(api.saveeMultipleQuestions, {
    method: POST,
    body: jsonObj,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

const updateUserImage = (userId, profileImage) => {
  return fetch(api.updateProfileImage + userId, {
    method: POST,
    body: profileImage,
    headers: {
      'Content-Type': 'multipart/form-data;',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

const getDataFromIntelligenceAPI = mobileNumber => {
  return fetch(api.getDataFromIntelligence + mobileNumber, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

const getAllCities = () => {
  return fetch(api.getAllCities, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.accessToken,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      return '';
    });
};

export const Api = {
  generateOTP,
  authenticateUser,
  getRewardCategories,
  getRewardListing,
  getRewardRedemption,
  getUserDetails,
  updateUserProfile,
  dashBoardDetails,
  updateUserSetting,
  getActivities,
  getAllOrders,
  updateUserDetail,
  getMultipleQuestions,
  saveMultipleQuestions,
  getDataFromIntelligenceAPI,
  updateUserImage,
  getAllCities,
};

// Generator Functions Calling Api
// function* authenticateUser(jsonObj) {
//   const response = yield fetch(api.authenticateUser, {
//     method: POST,
//     body: jsonObj,
//     headers: {   'Content-Type': 'application/json',   Authorization: 'Bearer ' + global.accessToken, }
//   });
//   console.log(response);
//   const responseJson = yield response.status === 200
//     ? JSON.parse(response._bodyInit)
//     : [];
//   console.log(responseJson);
//   return responseJson;
// }
