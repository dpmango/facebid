import React from 'react';
import isBase64 from 'is-base64';
import Image from '../components/Helpers/Image'

const RenderImage = (img) => {

  if ( isBase64(img) ){
    return(
      <React.Fragment>
        <span
          className="base64-image"
          style={{
            backgroundImage: `url(${img})`
          }}
        />
      </React.Fragment>
    )
  }

  return(
    <Image file={img} />
  )
}

export default RenderImage