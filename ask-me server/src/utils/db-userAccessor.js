const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

async function getAllUsers() {
  console.log("in accessor");

  try {
    const command = new ScanCommand({
      TableName: "Users"
    });

    const response = await ddbDocClient.send(command);

    console.log("📦 Users from DynamoDB:");
    response.Items.forEach((user, index) => {
      console.log(` ${JSON.stringify(user)}`);
    });

    return response.Items;
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    throw err;
  }
}

async function addUser(user) {
  console.log("📤 Adding user to DynamoDB:", user);

  try {
    const command = new PutCommand({
      TableName: "Users",
      Item: user
    });

    await ddbDocClient.send(command);

    console.log("User added successfully");
    return { success: true, message: "User added" };
  } catch (err) {
    console.error("Error adding user:", err);
    throw err;
  }
}

const getUserByEmail = async (email) => {

  const params = {
    TableName: 'Users',
    IndexName: 'email-index',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  };

  try {
    const result = await ddbDocClient.send(new QueryCommand(params));
    if (result.Items.length === 0) {
      return null;
    }
    return result.Items[0];

  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    throw new Error('Failed to get user by email');
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getUserByEmail,
};
