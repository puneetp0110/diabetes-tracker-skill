/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");
const axios = require('axios');

// Base Intent Handlers
const Launch = require("./intents/base/Launch");
const Help = require("./intents/base/Help");
const Stop = require("./intents/base/Stop");
const SessionEnd = require("./intents/base/SessionEnd");
const FallBack = require("./intents/base/FallBack");
// Custom Intents
const AddMeal = require('./intents/AddMeal');
const AddExercise = require('./intents/AddExercise');
const AddBloodSugar = require('./intents/AddBloodSugar');
const GetPreviousData = require('./intents/GetPreviousData');


const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    AddExercise,
    AddBloodSugar,
    Launch,
    AddMeal,
    GetPreviousData,
    Help,
    Stop,
    SessionEnd, 
    FallBack
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
