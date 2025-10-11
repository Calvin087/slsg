import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  Grant,
  GrantSchema,
  GrantUpdate,
  GrantUpdateSchema,
} from "../schemas/GrantSchema";

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME!;
if (!TABLE_NAME) throw new Error("TABLE_NAME not set");

export const DynamoAdapter = {
  putItem: async (grant: Grant) => {
    const grantData = GrantSchema.parse(grant);

    await ddb.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: grantData,
      }),
    );
    return grantData;
  },

  getItem: async (
    userSubId: string,
    grantId: string,
  ): Promise<Grant | undefined> => {
    const res = await ddb.send(
      new GetCommand({ TableName: TABLE_NAME, Key: { userSubId, grantId } }),
    );

    return res.Item ? GrantSchema.parse(res.Item) : undefined;
  },

  queryByUserId: async (userSubId: string): Promise<Grant[]> => {
    const res = await ddb.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "userSubId = :userSubId",
        ExpressionAttributeValues: { ":userSubId": userSubId },
      }),
    );

    return (res.Items || []).map((item) => GrantSchema.parse(item));
  },

  updateItem: async (
    userSubId: string,
    grantId: string,
    updates: GrantUpdate,
  ) => {
    const validUpdates = GrantUpdateSchema.parse(updates);

    if (!Object.keys(validUpdates).length) return;

    // "#status": "status", "#notes": "notes" Reserved keyword avoidance
    const expressionNames = Object.fromEntries(
      Object.keys(validUpdates).map((key) => [`#${key}`, key]),
    );

    // ":status: "Approved", ":notes": "Lorem ipsum" Values to placeholders
    const expressionValues = Object.fromEntries(
      Object.entries(validUpdates).map(([key, value]) => [`:${key}`, value]),
    );

    // #status = :status, #notes = :notes
    const updateExpression = Object.keys(validUpdates)
      .map((key) => `#${key} = :${key}`)
      .join(", ");

    await client.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { userSubId, grantId },
        UpdateExpression: `SET ${updateExpression}`,
        ExpressionAttributeNames: expressionNames,
        ExpressionAttributeValues: expressionValues,
      }),
    );
  },

  delete: async (userSubId: string, grantId: string) => {
    await ddb.send(
      new DeleteCommand({ TableName: TABLE_NAME, Key: { userSubId, grantId } }),
    );
  },
};
