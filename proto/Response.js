const CODE_MSG = require('../gui/http_message.json');

/**
 * @class Response
 * @description Objet de réponse du serveur vers le client
 */
module.exports = class Response {

    /**
     * Constructeur de l'objet Response
     * @param {Number} code Code HTTP 
     * @param {Object} data Objet JSON retournées au client
     * @param {String} message Message retourné au client. Facultatif
     */
    constructor(code, data, message) {
        this.code = code;
        this.data = data;
        this.message = message || CODE_MSG[code];
    }

    send(res){
        res.status(this.code).send(this);
    };

}
