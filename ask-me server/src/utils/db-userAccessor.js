// src/utils/db-userAccessor.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const emojis = ['😀', '🎉', '🚀', '💡', '🎶', '🌟', '🐱‍👤', '🧠', '📚', '🧁'];

async function getAllUsers() {
  console.log("in accessor");
  
  try {
    const command = new ScanCommand({
      TableName: "Users"
    });

    const response = await ddbDocClient.send(command);

    console.log("📦 Users from DynamoDB:");
    response.Items.forEach((user, index) => {
      const emoji = emojis[index % emojis.length];
      console.log(`${emoji} ${JSON.stringify(user)}`);
    });

    return response.Items;
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    throw err;
  }
}

module.exports = {
  getAllUsers,
};
