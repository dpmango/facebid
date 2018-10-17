import React, {Fragment} from 'react';

const Image = (props) => {
  const { file, folder } = props;
  const imgExt = file.split('.').pop()
  const imgName = file.slice(0, file.length - imgExt.length - 1)
  let have2x = true
  const folderName = folder ? folder + "/" : ""

  try {
    require(`images/${folderName}${imgName}@2x.${imgExt}`)
  } catch(err) {
    have2x = false
  }

  return (
    <Fragment>
      {have2x ?
        <img
          src={require(`images/${folderName}${imgName}.${imgExt}`)}
          srcSet={require(`images/${folderName}${imgName}@2x.${imgExt}`)  + ' 2x'}
          alt={imgName} />
        :
        <img
          src={require(`images/${folderName}${imgName}.${imgExt}`)}
          alt={imgName} />
      }
    </Fragment>
  )
}

export default Image
