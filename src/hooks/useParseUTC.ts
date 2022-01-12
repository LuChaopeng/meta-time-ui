/**
 * 将UTC时间字符串解析为一组参数
 * @param {String} UTC UTC时间字符串 "2021-11-12T07:58:26.398Z"
 * @return {Number[]} dateArr 返回数字数组 [2021,12,12,7,58,26,398]
 * 遇到TS参数个数不匹配的问题，暂未解决，所以这个函数没用上
 */

const useParseUTC = (UTC: string) => {
  const dateArr: number[] = new Array(7)
  dateArr[0] = Number(UTC.slice(0, 4))
  dateArr[1] = Number(UTC.slice(5, 7))
  dateArr[2] = Number(UTC.slice(8, 10))
  dateArr[3] = Number(UTC.slice(11, 13))
  dateArr[4] = Number(UTC.slice(14, 16))
  dateArr[5] = Number(UTC.slice(17, 19))
  dateArr[6] = Number(UTC.slice(20, 23))
  return dateArr
}

export default useParseUTC
