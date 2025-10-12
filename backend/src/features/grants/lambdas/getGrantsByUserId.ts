import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoAdapter } from "../../../db/dynamo";

const getGrantsByUserId = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  // @ts-ignore
  const userSubId = event.requestContext?.authorizer?.claims?.sub;
  if (!userSubId) throw new Error("Missing user sub id");

  const userId = event.pathParameters?.userId;
  if (!userId) throw new Error("Missing userId on path param");

  if (userSubId !== userId) {
    return {
      statusCode: 403,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Forbidden - Move along" }),
    };
  }

  try {
    const data = await DynamoAdapter.queryByUserId(userId);

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

export const handler = getGrantsByUserId;
