const AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = {
    connectToServer: async () => {
        try {
            console.log('✅ DynamoDB Client Initialized');
        } catch (error) {
            console.error('❌ Error connecting to DynamoDB:', error);
        }
    },
    dynamoDB
};

