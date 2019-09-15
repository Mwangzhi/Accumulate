function binary_value(val){
  const farr = new Float32Array(1)
  farr[0] = val
  const intBytes = new Int8Array(farr.buffer)
  const view = new DataView(intBytes.buffer)
  return view.getUint32()
}

function h_str(str, M) {
  return [...str].reduce( (hash, c) => {
    hash = (31 * hash + c.charCodeAt(0)) % M
    return hash
  }, 0)
}