import axios from "axios";
import { googleSignUpPayload } from "./types";

export const googleSignUpApi = async (payload: any) => {
  payload = { ...payload, providerId: payload.providerId };
  console.log(payload, "payload");
  try {
    const { data, status } = await axios.post("/api/auth/google", payload);
    console.log(data, status);
  } catch (error: any) {
    throw new Error(error);
  }
};
