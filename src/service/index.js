import http from "../utils/http";
import apiUrl from "./api";

let services = {};

Object.keys(apiUrl).forEach((item) => {
  const apiParam = apiUrl[item];
  services[item] = function (param = {}, config = {}, url) {
    return http[apiParam.method](url || apiParam.url, param, Object.assign({}, apiParam.config || {}, config));
  };
});

export default services;
