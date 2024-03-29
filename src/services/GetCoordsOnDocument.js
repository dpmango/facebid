import isRetinaDisplay from 'helpers/isRetinaDisplay';

const GetCoordsOnDocument = (elem) => {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top  = box.top +  scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  if ( isRetinaDisplay() ){
    return { top: top, left: left };
  } else {
    return { top: Math.round(top), left: Math.round(left) };
  }

}

export default GetCoordsOnDocument
