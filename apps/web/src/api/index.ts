
export const queryIpfsHash = async (cid: string) => {
  const res = await fetch(`/api/queryIpfsHash?cid=${cid}`);
  const data = await res.json();
  return data;
  // try {
  // } catch (e) {
  //   console.log('/api/queryIpfsHash Error: ', e)
  //   return null;
  // }
}