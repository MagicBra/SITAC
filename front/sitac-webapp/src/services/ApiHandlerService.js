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
    }
  },
  getList(endpoint, callback) {
    axios.get(`${this.config().baseUrl}/${endpoint}/`, this.config().configAPI).then(callback).catch(this.toastError)
  },
  getById(endpoint, id, callback) {
    axios.get(`${this.config().baseUrl}/${endpoint}/${id}`, this.config().configAPI).then(callback).catch(this.toastError)
  },
  put(endpoint, id, body, callback) {
    axios.put(`${this.config().baseUrl}/${endpoint}/${id}`, body, this.config().configAPI).then(callback).catch(this.toastError)
  },

  toastError(error) {
    var msg = "Erreur iconnue !";

    if (error.response.status == 401){
      msg = "Vous n'êtes pas connecté !"
      router.push("/");
    }
    else if (error.response.status == 403)
      msg = "Vous n'êtes pas autorisé !"
    else if (error.response.status == 404)
      msg = "Ressource introuvable !"

    Toast.open({
      message: msg,
      type: "is-danger",
    });
  }
}