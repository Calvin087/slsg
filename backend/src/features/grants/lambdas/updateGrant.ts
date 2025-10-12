import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { GrantUpdate, GrantUpdateSchema } from "../../../schemas/GrantSchema";
import { DynamoAdapter } from "../../../db/dynamo";

const updateGrant = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  // @ts-ignore
  const userSubId = event.requestContext?.authorizer?.claims?.sub;
  if (!userSubId) throw new Error("Missing user sub id");

  const grantId = event.pathParameters?.id;
  if (!grantId) throw new Error("Missing path param");

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing request body" }),
    };
  }

  try {
    const data = JSON.parse(event.body) as Partial<GrantUpdate>;

    const { grantId: _, userSubId: __, ...updates } = data;

    const updateData: GrantUpdate = GrantUpdateSchema.parse(updates);

    if (!Object.keys(updates).length) throw new Error("Nothing to update");

    await DynamoAdapter.updateItem(userSubId, grantId, updateData);

    return {
      statusCode: 204,
      body: JSON.stringify({ message: "Grant Updated" }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Failed to update grant", error: error }),
    };
  }
};

export const handler = updateGrant;
