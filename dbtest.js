        AWS.config.update({
			region: "us-east-2",
			accessKeyId : "", 
			secretAccessKey : ""
		});
		var docclient = new AWS.DynamoDB.DocumentClient({
			region: "us-east-2"
        });
        // Parameter object for using query
		var paramass = {
			TableName: "BloodSugarRecords",
			KeyConditionExpression: "#id = :i",
			ExpressionAttributeNames: {
				"#id": "id"
			},
			ExpressionAttributeValues: {
				':i' : 1
			}
        };
        //testing query
		var results = docclient.query(paramass, function(err, data)
		{
			if(err) console.log("error", err);
			else console.log("Success", data.Items);
			
        });


        //parameter object for using scan
		var paramass2 = {
			TableName: "BloodSugarRecords",
			FilterExpression: "#date = :date", 
			ExpressionAttributeNames: { 
				"#date": "date"
			},
			ExpressionAttributeValues: {
				':date' : "2019-02-17"
			}
        };
        //testing scan
		var results2 = docclient.scan(paramass2, function(err, data)
		{//
			if(err) console.log("error", err);
			else console.log("Success", data.Items);
			
        });
        
        //Parameter object for put
		var putparams = {//
			TableName: "BloodSugarRecords", 
			Item: {
				"id" : 5,
				"date" : "2019-03-21",
				"asdf" : "test3",
				"value" : "blood sugar aaaa"
			}
        };
        //Testing put
		var res3 = docclient.put(putparams, function(err, data)
		{//
			if(err) console.log("error", err);
			else console.log("Success", data.Items);
			
		});