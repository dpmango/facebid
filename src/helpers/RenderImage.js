import React from 'react';
import isBase64 from 'is-base64';
import Image from 'components/Helpers/Image';
import ImportImageAsRequire from './ImportImageAsRequire'

const RenderImage = (img, folder, renderAsBackgroundImage) => {

  if ( isBase64(img) ){
    return(
      <span
        className="cover-bg-image"
        style={{
          backgroundImage: `url(${img})`
        }} />
    )
  }

  if ( renderAsBackgroundImage ){
    return(
      <span
        className="cover-bg-image"
        style={{
          backgroundImage: `url(${ImportImageAsRequire(img, folder)})`
        }} />
    )
  }

  return(
    <Image folder={folder} file={img} />
  )
}

export default RenderImage
