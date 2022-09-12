
export const queryIpfsHash = async (cid: string) => {
  try {
    const res = await fetch(`https://ipfs.io/ipfs/${cid}`);
    const data = res.json();
    return data;
  } catch (e) {
    return null;
  }
}