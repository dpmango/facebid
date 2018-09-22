import isRetinaDisplay from 'helpers/isRetinaDisplay';

const GetWindowScroll = () => {

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  if ( isRetinaDisplay() ){
    return { top: scrollTop, left: scrollLeft };
  } else {
    return { top: Math.round(scrollTop), left: Math.round(scrollLeft) };
  }

}

export default GetWindowScroll
