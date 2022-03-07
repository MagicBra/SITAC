import router from '../router'
import axios from 'axios'

import { ToastProgrammatic as Toast } from "buefy";



export default {
  config() {
    return {
      baseUrl: "http://localhost:9000",
      configAPI: {
        headers: { Authorization: `Bearer ${window.token}` },
      },
      routePathLogin : "/"
    }
  },

  auth(user, pass, callback, msgErrors, errorCallback) {
    const authentification = {
      auth: {
        username: user,
        password: pass,
      },
    };
    var context = this;
    axios.post(`${this.config().baseUrl}/auth/`, "", authentification).then(callback).catch((error) => {
      context.toastError(error, msgErrors, context.config())
      if(errorCallback)
        errorCallback(error)
    });
  },

  create(endpoint, params, body, callback, msgErrors, errorCallback) {
    var context = this;
    var prms = this.generateParams(params);

    axios.post(`${this.config().baseUrl}/${endpoint}?${prms}`, body, this.config().configAPI).then(callback).catch((error) => {
      context.toastError(error, msgErrors, context.config())
      if(errorCallback)
        errorCallback(error)
    });
  },

  getList(endpoint, params, callback, msgErrors, errorCallback) {
    var context = this;
    var prms = this.generateParams(params);

    axios.get(`${this.config().baseUrl}/${endpoint}?${prms}`, this.config().configAPI).then(callback).catch((error) => {
      context.toastError(error, msgErrors, context.config())
      if(errorCallback)
        errorCallback(error)
    });
  },

  getById(endpoint, id, params, callback, msgErrors, errorCallback) {
    var context = this;
    var prms = this.generateParams(params);

    axios.get(`${this.config().baseUrl}/${endpoint}/${id}?${prms}`, this.config().configAPI).then(callback).catch((error) => {
      context.toastError(error, msgErrors, context.config())
      if(errorCallback)
        errorCallback(error)
    });
  },

  put(endpoint, id, body, callback, msgErrors, errorCallback) {
    var context = this;
    axios.put(`${this.config().baseUrl}/${endpoint}/${id}`, body, this.config().configAPI).then(callback).catch((error) => {
      context.toastError(error, msgErrors, context.config())
      if(errorCallback)
        errorCallback(error)
    });
  },

  toastError(error, msgErrors, config) {
    var status = error.response.status;

    var defaultError = "Erreur inconnue";

    var msg = [];
    msg[401] = "Vous n'êtes pas connecté à votre compte";
    msg[403] = "Vous n'êtes pas autorisé";
    msg[404] = "Ressource introuvable";

    if (msgErrors != null)
      msgErrors.forEach(function callback(value, index) {
        msg[index] = value;
      });

    Toast.open({
      message: msg[status] !== undefined ? msg[status] : defaultError,
      type: "is-danger",
    });

    // If token has expired, route to login page
    if (error.response.status == 401 && router.currentRoute.path != config.routePathLogin)
      router.push(config.routePathLogin);
  },

  generateParams(paramsJson){
    var prms = [];
    for (var prop in paramsJson) {
      if(paramsJson[prop]!="")
        prms.push(prop+"="+paramsJson[prop])
    }
    return prms.join("&");
  }
}