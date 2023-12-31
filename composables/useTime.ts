import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/es'

export const useTime = () => {
  dayjs.extend(durationPlugin)
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.locale('es')

  const formatTime = (time: string, format: string) => dayjs(time).format(format)
  // const todayAtMidnight = () =>
  const duration = (seconds: Number) => {
    // @ts-ignore
    const d = dayjs.duration(seconds * 1000)
    return {
      days: d.days(),
      hours: d.hours(),
      minutes: d.minutes(),
      seconds: d.seconds()
    }
  }

  function textTimeToSeconds (text: string): number {
    const daysMatch = text.match(/(\d+)d/)
    const hoursMatch = text.match(/(\d+)h/)
    const minutesMatch = text.match(/(\d+)m/)
    const secondsMatch = text.match(/(\d+)s/)

    const days = daysMatch ? parseInt(daysMatch[1], 10) : 0
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0
    const seconds = secondsMatch ? parseInt(secondsMatch[1], 10) : 0

    return (days * 24 * 3600) + (hours * 3600) + (minutes * 60) + seconds
  }

  function secondsTextFormat (seconds: number): string {
    let text = ''
    const { days, hours, minutes } = duration(seconds)
    if (days) { text += `${days}d ` }
    if (hours) { text += `${hours}h ` }
    if (minutes) { text += `${minutes}m` }
    return text
  }

  return {
    now: dayjs,
    duration,
    formatTime,
    textTimeToSeconds,
    secondsTextFormat
  }
}
