// https://gateway.pinata.cloud/ipfs/bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m

export const queryIpfsHash = async (cid: string) => {
  const res = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
  const data = res.json();
  return data;
}