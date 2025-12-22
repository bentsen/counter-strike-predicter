"use server";

import { IFromValues } from "@/app/ai/cs-round-predictor/(stepper)/Stepper";
import axios from "axios";

export async function predictRound(data: IFromValues) {
  const url = process.env.HF_API_URL;
  const token = process.env.HF_API_TOKEN;

  if (!url || !token) {
    throw new Error("Missing API URL or Token");
  }

  try {
    const response = await axios.post<{ ct: number; t: number }>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err: unknown) {
    console.error("API Error Server Action:", err);
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `API Error: ${err.response.status} ${err.response.statusText}`
      );
    }
    throw new Error("Failed to fetch prediction");
  }
}
