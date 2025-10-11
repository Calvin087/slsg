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
    const { userSubId, grantId, ...rest } = GrantSchema.parse(grant);

    const item = { PK: userSubId, SK: grantId, ...rest };

    await ddb.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      }),
    );
    return item;
  },

  getItem: async (PK: string, SK: string): Promise<Grant | undefined> => {
    const res = await ddb.send(
      new GetCommand({ TableName: TABLE_NAME, Key: { PK, SK } }),
    );
    return res.Item ? GrantSchema.parse(res.Item) : undefined;
  },

  queryByPK: async (PK: string): Promise<Grant[]> => {
    const res = await ddb.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :pk",
        ExpressionAttributeValues: { ":pk": PK },
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

  delete: async (PK: string, SK: string) => {
    await ddb.send(
      new DeleteCommand({ TableName: TABLE_NAME, Key: { PK, SK } }),
    );
  },
};
