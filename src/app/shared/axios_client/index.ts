import { Axios } from "axios";
export const axios = new Axios({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [(data) => JSON.stringify(data)],
  transformResponse: [(data) => JSON.parse(data)],
});

export interface StandardHttpSuccess {
  success: true;
  message: string;
  data?: unknown;
  statusCode: number;
}

export interface StandardHttpError {
  success: boolean;
  message: string;
  statusCode: number;
}
