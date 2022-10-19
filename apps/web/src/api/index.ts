
export const queryIpfsHash = async (cid: string) => {
  const res = await fetch(`/api/queryIpfsHash?cid=${cid}`);
  const data = await res.json();
  return data;
}
export const queryIpfsURL = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}