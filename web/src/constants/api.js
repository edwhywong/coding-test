const END_POINT = process.env.API_END_POINT || "http://localhost:4000";

export const API = {
  GET_PHOTO_LIST_BY_TYPE: (type) => END_POINT + `/photos?type=${type}`,
};
