import { Axios } from "axios";
export const axios = new Axios({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [(data) => JSON.stringify(data)],
  transformResponse: [
    (data) => {
      return JSON.parse(data);
    },
  ],
});

export interface StandardHttpSuccess<T> {
  success: true;
  message: string;
  data: T;
  statusCode: number;
}

export interface StandardHttpError {
  success: boolean;
  message: string;
  statusCode: number;
}
