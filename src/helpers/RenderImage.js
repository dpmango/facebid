import React from 'react';
import isBase64 from 'is-base64';
import Image from 'components/Helpers/Image';
import ImportImageAsRequire from './ImportImageAsRequire'

const RenderImage = (img, folder, renderAsBackgroundImage) => {

  if ( !img ) {
    return null
  }

  let resultImg

  if ( isBase64(img) ){
    resultImg = img
  }

  if ( renderAsBackgroundImage ){
    resultImg = ImportImageAsRequire(img, folder)
  }

  if ( isBase64(img) || renderAsBackgroundImage){
    return(
      <span
        className="cover-bg-image"
        style={{
          backgroundImage: `url(${resultImg})`
        }} />
    )
  }

  // default case
  return <Image folder={folder} file={img} />
}

export default RenderImage
