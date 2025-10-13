import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoAdapter } from "../../../db/dynamo";

const deleteGrant = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  // @ts-ignore
  const userSubId = event.requestContext?.authorizer?.claims?.sub;
  if (!userSubId) throw new Error("Missing user sub id");

  const grantId = event.pathParameters?.id;
  if (!grantId) throw new Error("Missing path param");

  try {
    await DynamoAdapter.delete(userSubId, grantId);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Grant deleted" }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Failed to delete grant", error }),
    };
  }
};

export const handler = deleteGrant;
