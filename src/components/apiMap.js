import React from "react";

const BASE_API = "/api/v0";

 const API_CONSTANT_MAP = {
  "saveroomlist": `${BASE_API}/SaveRoomList/`,
  "updateroomlist": `${BASE_API}/UpdateRoomlist/`,
  "updates3url": `${BASE_API}/UpdateS3Url/`,
  "removeroomlist": `${BASE_API}/RemoveRoomlist/`,
  "getroomlist": `${BASE_API}/GetRoomlist/`,
  "getroomlistbyname": `${BASE_API}/GetRoomlistByName/`,
  "sendemail": `${BASE_API}/sendemail/`
};

export default API_CONSTANT_MAP;