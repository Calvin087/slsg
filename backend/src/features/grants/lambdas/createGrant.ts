import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoAdapter } from "../../../db/dynamo";
import { Grant, GrantSchema } from "../../../schemas/GrantSchema";
import { randomUUID } from "crypto";

const createGrant = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  // @ts-ignore
  const userSubId = event.requestContext?.authorizer?.claims?.sub;
  if (!userSubId) throw new Error("Missing user sub id");

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing request body" }),
    };
  }

  const grantId = randomUUID();

  try {
    const grantBody = JSON.parse(event.body);

    const grantData: Grant = GrantSchema.parse({
      userSubId,
      grantId,
      ...grantBody,
    });

    await DynamoAdapter.putItem(grantData);

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Grant Created" }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Failed to create grant", error: error }),
    };
  }
};

export const handler = createGrant;
