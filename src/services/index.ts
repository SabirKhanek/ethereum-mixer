import { STATUS } from "../shared/constants/status_codes";

// All the services will be here
export async function getToSendAddress(reciever_address: string) {
    reciever_address;
    await new Promise((resolve)=>setTimeout(resolve,1000))
    return {address:'0x3534TRE6DSF43DFSGFDY5EYJHK535TRGDGR546'}
}

export async function confirmTxn(value: {txnHash: string, reciever_address: string}) {
    value;
    await new Promise((resolve)=>setTimeout(resolve,1000))
    return {status: STATUS.OK, message: 'SUCCESS'}
}