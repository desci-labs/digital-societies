
export const queryIpfsHash = async (cid: string) => {
  try {
    const res = await fetch(`/api/queryIpfsHash?cid=${cid}`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log('/api/queryIpfsHash Error: ', e)
    return null;
  }
}