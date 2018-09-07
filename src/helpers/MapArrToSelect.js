// create react-select value/label pair from arr entiries

const MapArrToSelect = (arr) => {
  return arr.map(el => {
    return { value: el, label: el }
  })
}

export default MapArrToSelect
