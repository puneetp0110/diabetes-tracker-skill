"use strict";

var natural = require('natural');
var classifier = new natural.BayesClassifier();

function classify(searchPhrase) {
  classifier.addDocument('what is my blood sugar', 'blood sugar record');
  classifier.addDocument('blood sugar', 'blood sugar record');
  classifier.addDocument('my blood sugar has been up and down what was it yesterday', 'blood sugar record');
  classifier.addDocument('what is my average blood sugar', 'blood sugar record');
  classifier.addDocument('I cannot remmeber my blood sugar', 'blood sugar record');
  classifier.addDocument('what was my blood sugar yesterday', 'blood sugar record');
  classifier.addDocument('what was my last meal', 'meal recommendation');
  classifier.addDocument('What did I have to eat yesterday', 'meal record');
  classifier.addDocument('I can not remember what I had to eat', 'meal record');
  classifier.addDocument('What did I eat yesterday', 'meal record');
  classifier.addDocument('what was my last meal', 'meal record');
  classifier.addDocument('Tell me my last meal', 'meal record');
  classifier.addDocument('Alexa can you tell me my meal', 'meal record');
  classifier.addDocument('I do not remember what I ate', 'meal record');
  classifier.addDocument('What should I eat', 'meal record');
  classifier.addDocument('Did I workout yesterday', 'workout record');
  classifier.addDocument('What workout did I do yesterday', 'workout record');
  classifier.addDocument('Can you tell me what exercise I did last', 'workout record');
  classifier.addDocument('exercise', 'workout record');
  classifier.addDocument('workout', 'workout record');
  classifier.addDocument('What has my workout routine been', 'workout record');
  classifier.addDocument('How much should i work out today', 'workout recommendation');

  classifier.train();
  return classifier.classify(searchPhrase);
};

exports.classify = classify;
