export function isValidBEP20Address(address: string) {
    if(!address) return false
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(address);
}

export function isValidTransactionHash(hash: string) {
    if(!hash) return false
    const regex = /^0x[a-fA-F0-9]{64}$/;
    return regex.test(hash);
  }