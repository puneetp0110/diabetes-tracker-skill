"use strict";

const utils = require("../utils");
const c = require("../classifier");
const axios = require('axios');

module.exports ={

  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'GetPreviousData'
  },
  async handle(handlerInput) {
    const { accessToken } = handlerInput.requestEnvelope.context.System.user;
    let speechText = '';

    if (!accessToken) {
      speechText = 'You must authenticate with your Amazon Account to use this skill. I sent instructions for how to do this in your Alexa App';
      return handlerInput.responseBuilder
        .speak(speechText)
        .withLinkAccountCard()
        .getResponse();
    }

    if(handlerInput.requestEnvelope.request.dialogState === 'COMPLETED'){
      const amznProfileUrl = `https://api.amazon.com/user/profile?access_token=${accessToken}`;
      try {
        const response = await axios.get(amznProfileUrl);
        const searchPhrase = handlerInput.requestEnvelope.request.intent.slots.searchPhrase.value;
        let classification = c.classify(searchPhrase);
        speechText= `${classification}  ${searchPhrase} `;
        let type = "";
        let useremail = response.data.email;
        if(classification === 'blood sugar record'){
          type = "Blood Sugar";
          useremail = response.data.email;
          return new Promise((resolve, reject)=>{
            utils.pullItem(type, type =>{
            if(type){
              console.log("GetItem succeeded:", JSON.stringify(type, null, 2));
              speechText = `Your last blood sugar recorded was ${type.blood_sugar}`;
            }
            else{
              speechText = "Response is Null";
            }
            const response = handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(speechText)
            .getResponse();
            resolve(response);
            return;
              });
              });
          }
          else if(classification === 'meal record'){
            type = "Meal";
            useremail = response.data.email;
            return new Promise((resolve, reject)=>{
              utils.pullItem(type, type =>{
              if(type){
                console.log("GetItem succeeded:", JSON.stringify(type, null, 2));
                speechText = `You had ${type.description} and recorded your blood sugar as ${type.blood_sugar}`;
              }
              else{
                speechText = "Response is Null";
              }
              const response = handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(speechText)
            .getResponse();
            resolve(response);
            return;
            });
            });
        }
        else if(classification === 'workout record'){
          type = "Exercise";
          useremail = response.data.email;
          return new Promise((resolve, reject)=>{
            utils.pullItem(type, type =>{
            if(type){
              console.log("GetItem succeeded:", JSON.stringify(type, null, 2));
              speechText = `I have a record of ${type.description} as your last workout and your blood sugar was ${type.blood_sugar}`;
            }
            else{
              speechText = "Response is Null";
            }
            const response = handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard(speechText)
          .getResponse();
        resolve(response);
        return;
          });
          });

      }
        return handlerInput.responseBuilder.speak(speechText)
        .getResponse();
      } catch (error) {
        console.error(error);
        speechText = 'Hello!';
        return handlerInput.responseBuilder.speak(speechText)
      }

    }
    else
    return handlerInput.responseBuilder
    .addDelegateDirective()
    .getResponse();
  }

};
