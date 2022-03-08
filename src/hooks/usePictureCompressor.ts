/**
 * 将读取的图片压缩（将压缩和显示的步骤分开）
 * @param {String} path 图片路径
 * @return {Promise<string>} 包含 data URI（base64编码的图片）的DOMString
 */

const usePictureCompressor = async (path: string) => {
  const image = new Image()
  image.src = path
  let compressedPicture: string = ''
  let width: number = 0
  let height: number = 0
  // 这里声明返回值的泛型类型
  await new Promise<HTMLImageElement>((resolve) => {
    image.onload = () => {
      resolve(image)
    }
  })
    .then((res) => {
      console.log(res.width, '  ', res.height)
      // 图片长边大于1000则压至一千，短边等比例压缩，使用canvas绘制实现压缩，但压缩后的图片上传服务器，并以合适的尺寸（这里要再做调整）显示
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // document.body.appendChild(canvas)
      if (res.width > res.height && res.width > 1000) {
        canvas.width = 1000
        canvas.height = 1000 * res.height / res.width
      } else if (res.height > res.width && res.height > 1000) {
        canvas.height = 1000
        canvas.width = 1000 * res.width / res.height
      } else {
        canvas.height = res.height
        canvas.width = res.width
      }
      width = canvas.width
      height = canvas.height;
      (ctx as CanvasRenderingContext2D).drawImage(res, 0, 0, width, height)
      compressedPicture = canvas.toDataURL('image/jpeg')
    })
  console.log(compressedPicture)
  return { compressedPicture, width, height }
}

export default usePictureCompressor
