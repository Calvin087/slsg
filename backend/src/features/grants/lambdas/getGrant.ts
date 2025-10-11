import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

const getGrant = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "ok" }),
  };
};

export const handler = getGrant;
