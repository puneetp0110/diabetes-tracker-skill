let config = {}

config.dynamo = {}
config.dynamo.tableName = "diabetes-activity-tracker"
config.dynamo.region = "us-east-1"
config.dynamo.partitionKey = "type"
config.dynamo.sortKey = "timestamp"
config.accessKeyId = ""
config.secretAccessKey = ""

module.exports = config