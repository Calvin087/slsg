import { fetchAuthSession } from "aws-amplify/auth";
import type { Grant } from "../../../types/grants";

const restApi = import.meta.env.VITE_AWS_REST_API;

const getJwt = async () => {
  const session = await fetchAuthSession();
  const userSubId = session.userSub;
  const jwt = session.tokens?.idToken?.toString();

  if (!jwt || !userSubId) throw new Error("Missing Credentials");

  return { userSubId, jwt };
};

// TODO: Working
export const getGrantsByUserId = async () => {
  const { userSubId, jwt } = await getJwt();

  const response = await fetch(`${restApi}/users/${userSubId}/grants`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error during fetch Grants" }));
    throw new Error(errorData.message || "Failed to fetch user Grants");
  }
  const { data } = await response.json();
  return data;
};

// TODO: Need form for this
export const createGrant = async (grant: Grant) => {
  const { jwt } = await getJwt();
  const response = await fetch(`${restApi}/grants`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ grant }),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error during create Grant" }));
    throw new Error(errorData.message || "Failed to create Grant");
  }
  return response.json();
};

export const updateGrant = async (grantUpdate: Grant) => {
  const { jwt } = await getJwt();
  const { grantId } = grantUpdate;
  const response = await fetch(`${restApi}/grants/${grantId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ grantUpdate }),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error during update Grant" }));
    throw new Error(errorData.message || "Failed to update Grant");
  }
  return response.json();
};

export const deleteGrant = async (grantId: string) => {
  const { jwt } = await getJwt();
  const response = await fetch(`${restApi}/grants/${grantId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error during delete Grant" }));
    throw new Error(errorData.message || "Failed to delete Grant");
  }
  return response.json();
};
