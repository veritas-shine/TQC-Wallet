/**
 *
 * @param time {Moment}
 * @param now {Moment}
 * @return {String}
 */
export function formatTime(time, now) {
  const weeks = now.diff(time, 'weeks')
  if (weeks > 1) {
    return time.format('YYYY-MM-DD HH:mm:ss')
  }
  const days = now.diff(time, 'days')
  if (days > 1) {
    return `${days}天前`
  }
  const hours = now.diff(time, 'hours')
  if (hours) {
    return `${hours}小时前`
  }
  const minutes = now.diff(time, 'minutes')
  if (minutes > 1) {
    return `${minutes}分钟前`
  }
  const seconds = now.diff(time, 'seconds')
  return `${seconds}秒前`
}
