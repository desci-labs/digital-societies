
export const queryIpfsHash = async (cid: string) => {
  try {
    const res = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
    const data = res.json();
    return data;
  } catch (e) {
    return null;
  }
}