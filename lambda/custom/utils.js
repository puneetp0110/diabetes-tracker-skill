"use strict";

let config = require("./config");
let AWS = require("aws-sdk");


AWS.config.update({
  region: "us-east-1",
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
});
let docClient = new AWS.DynamoDB.DocumentClient({
  region: config.dynamo.region
});
//parameter object for using scan
var paramass2 = {
  TableName: "diabetes-activity-tracker",
};

module.exports = {
  putItem: function (useremail, type, attributes, bloodSugar, description) {
    console.log('hello');
    // Read from Dynamodb
    let putParam = {
      TableName: config.dynamo.tableName,
      Item: {
        type: `${type}`,
        id: "8",
        email: `${useremail} `,
        timestamp: new Date().toLocaleString(),
        attributes: `${attributes}`,
        blood_sugar: `${bloodSugar} mg/dl `,
        description: `${description}`,
      }
    };
    return docClient.put(putParam).promise();
  },

  pullItem: function(type, callback) {
    // Read from Dynamodb
    docClient.query(
      {
        TableName: config.dynamo.tableName,
        ExpressionAttributeNames: {
          "#type": "type"
        },
        ExpressionAttributeValues: {
          ":type": type, 
        },
        KeyConditionExpression: "#type = :type"
      },
      (err, data) => {
        if (err || data === undefined) {
          console.log("GetItem threw an error:", JSON.stringify(err, null, 2));
          callback(undefined);
        } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          if (data.Count > 0) {
            callback(data.Items[data.Count-1]);
          } else {
            callback(undefined);
          }
        }
      }
    );
  }
};


