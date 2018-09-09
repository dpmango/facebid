import React from 'react';

const Image = (props) => {
  const { file, folder } = props;
  const imgExt = file.split('.').pop()
  const imgName = file.slice(0, file.length - imgExt.length - 1)

  const folderName = folder ? folder + "/" : ""
  return (
    <React.Fragment>
      <img src={require(`../../images/${folderName}${imgName}.${imgExt}`)} srcSet={require(`../../images/${folderName}${imgName}@2x.${imgExt}`)  + ' 2x'} alt=""/>
    </React.Fragment>
  )
}

export default Image
