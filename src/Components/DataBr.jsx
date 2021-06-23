function DataBr(props){
    let dateISO = props.data
    const dateSlices = dateISO.split('-')
    return `${dateSlices[2]}/${dateSlices[1]}/${dateSlices[0]}`
  }


  export default DataBr