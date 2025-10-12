import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoAdapter } from "../../../db/dynamo";

const getGrant = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  // @ts-ignore
  const userSubId = event.requestContext?.authorizer?.claims?.sub;
  if (!userSubId) throw new Error("Missing user sub id");

  const grantId = event.pathParameters?.id;
  if (!grantId) throw new Error("Missing path param");

  try {
    const data = await DynamoAdapter.getItem(userSubId, grantId);

    if (!data) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Grant not found" }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Failed to fetch grant", error }),
    };
  }
};

export const handler = getGrant;
