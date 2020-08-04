var fs = require('fs');
var path = require('path');

const axios = require('axios');
const uniqid = require('uniqid');
const http = require('https');

var controller = {
     
    generarTokenPaypal: async function(req, res, next) {
        console.log("Ruta Activada");
        

        //Se genera un token de acceso de autorizacion basic
        //username = clientid, password = secret

        let username = 'AYXxAxg3oovITCa8YbBxnYdSvr991R_l2kLDweO5eOVWeEVR5G_BBKop9fg9LzcqeSJHT2mmZzZicaE0';
        let password = 'EKF_HmawlhixX2M3XmcgYjewCenC7PaxbSIRusbXCO7v9fOjuNJdPcmZWaEJu6Z_wmvi-zIdu8fQ9M45';

        (async() =>{
          try {
                    const { data: {access_token, token_type}} = await axios({
                        url: 'https://api.sandbox.paypal.com/v1/payment-experience/web-profiles/XP-8YTH-NNP3-WSVN-3C76',//cambiar esta url en produccion https://api.paypal.com
                        method: 'post',
                        headers: {
                          Accept: 'application/json',
                          'Accept-Language': 'en_US',
                          'content-type': 'application/x-www-form-urlencoded',
                        },
                        auth: {
                          username: 'AYXxAxg3oovITCa8YbBxnYdSvr991R_l2kLDweO5eOVWeEVR5G_BBKop9fg9LzcqeSJHT2mmZzZicaE0',//tu username es tu client id
                          password: 'EKF_HmawlhixX2M3XmcgYjewCenC7PaxbSIRusbXCO7v9fOjuNJdPcmZWaEJu6Z_wmvi-zIdu8fQ9M45',//tu password es tu secret
                        },
                        params: {
                          grant_type: 'client_credentials',
                        },
                    });
                    //Muestra si devuleve con exito
                    return res.status(200).send({
                        status : 'success',  
                        message: "Su token es:",
                        access_token : access_token,
                        token_type   : token_type
                      });
               } 
               catch (error){
                   console.log('Error', error);
                   return res.status(400).send({
                       status: 'error',
                       message: 'error de paypal revisar logs'
                   })

               }
        })();
        return res.status(200).send({
            status: 'success',
            message: 'Generando Token'
        });
    }

}

module.exports = controller;