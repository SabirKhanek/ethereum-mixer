import { STATUS } from "../shared/constants/status_codes";
import {
  // StandardHttpError,
  // StandardHttpSuccess,
  axios,
} from "../shared/axios_client";
// import { AxiosResponse } from "axios";
// All the services will be here
export async function getToSendAddress(receiver_address: string) {
  receiver_address;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { address: "0x3534TRE6DSF43DFSGFDY5EYJHK535TRGDGR546" };
}

export async function confirmTxn(value: {
  txnHash: string;
  receiver_address: string;
}) {
  value;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { status: STATUS.OK, message: "SUCCESS" };
}

export interface RegisterMixerResponseObj {
  wallet_address: string;
  deposit_wallet: string;
  delay: number;
  requestStaleIn: number;
  updatedAt: Date;
  createdAt: Date;
}

// interface RegisterMixerResponse extends StandardHttpSuccess {
//   data: RegisterMixerResponseObj;
// }

// interface InitMixerResponse extends StandardHttpSuccess {
//   data: { success: string };
// }

// try {
//         const response = await axios.post<StandardHttpError,RegisterMixerResponse,{receiver_address:string}>("/register_mixer_request", {receiver_address});
//         return response.
//     } catch(err: StandardHttpError) {
//         const error = err as StandardHttpError
//         error.
//     }
export async function register_mixer_request(
  receiver_address: string,
  delay: string
) {
  const requestBody = {
    receiver_address,
    delay,
  };
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const resp = await axios.post("/register_mixer_request", requestBody);
  console.log(resp);
  return resp;
}

export async function init_mixer(receiver_address: string, txn_hash: string) {
  const resp = await axios.post("/init_mixer", { receiver_address, txn_hash });
  console.log(resp);
  return resp;
}

export async function notify_mixer(receiver_address: string) {
  const resp = await axios.post("/notify_mixer", { receiver_address });
  console.log(resp);
  return resp;
}