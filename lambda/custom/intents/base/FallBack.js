"use strict";


module.exports = {

  // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.

  //              This handler will not be triggered except in that locale, so it can be

  //              safely deployed for any locale.

  canHandle(handlerInput) {

    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'

      && request.intent.name === 'AMAZON.FallbackIntent';

  },

  handle(handlerInput) {


    const FALLBACK_MESSAGE = `The  diabetes self management skill can't help you with that.  It can help you log activities such as meals, exercise or blood sugar levels. What can I help you with?`;

    const FALLBACK_REPROMPT = 'What can I help you with?';

    return handlerInput.responseBuilder

      .speak(FALLBACK_MESSAGE)

      .reprompt(FALLBACK_REPROMPT)

      .getResponse();

  },

};