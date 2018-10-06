const FormatNumberWithSpaces = (str) => {
  if ( str )
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // with float
  // var parts = x.toString().split(".");
  // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  // return parts.join(".");
}

export default FormatNumberWithSpaces
