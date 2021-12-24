/*
*按日期分组时间标签
*将传入的时间标签列表按时间排序，并按照日期分组，返回分组结果
*/
import type { TimeProps } from '@/components/Time.vue'
const compare = (Time1: TimeProps, Time2: TimeProps) => {
  if (Time1.timestamp > Time2.timestamp) {
    return -1
  } else if (Time1.timestamp < Time2.timestamp) {
    return 1
  } else {
    return 0
  }
}

const useTimeListByDate = (timeList: TimeProps[]) => {
  timeList.sort(compare)
  // 最终返回的数组
  const resultTimeList: TimeProps[][] = []
  // 按照日期分组的临时group，将被push到resultTimeList里
  let tempGroupByDate: TimeProps[] = []
  let date: number|null = null
  for (const time of timeList) {
    if (date === null) {
      date = time.timestamp.getDate()
      tempGroupByDate.push(time)
    } else if (time.timestamp.getDate() === date) {
      tempGroupByDate.push(time)
    } else {
      resultTimeList.push(tempGroupByDate)
      date = time.timestamp.getDate()
      tempGroupByDate = []
      tempGroupByDate.push(time)
    }
  }
  // push最后一组
  resultTimeList.push(tempGroupByDate)
  return resultTimeList
}

export default useTimeListByDate
