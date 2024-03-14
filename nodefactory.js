export default function createKeyNode(k = null, nxt = null) {
  const key = k;
  const next = nxt;

  return { key, next };
}
