import isRetinaDisplay from 'helpers/isRetinaDisplay';

const ImportImageAsRequire = (img, folder) => {
  const folderName = folder ? folder + "/" : ""
  const imgExt = img.split('.').pop()
  const imgName = img.slice(0, img.length - imgExt.length - 1)

  console.log(isRetinaDisplay())
  let requiredImage = isRetinaDisplay() ?
    require(`images/${folderName}${imgName}@2x.${imgExt}`) :
    require(`images/${folderName}${imgName}.${imgExt}`)

  return requiredImage
}

export default ImportImageAsRequire
