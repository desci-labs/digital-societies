
export const queryIpfsHash = async (cid: string) => {
  const res = await fetch(`/api/queryIpfsHash?cid=${cid}`);
  const data = await res.json();
  return data;
}