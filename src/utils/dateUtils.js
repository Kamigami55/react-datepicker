import { CALENDAR_MONTHS } from '../constants/dateConstants'

const zeroPad = (value, length) => `${value}`.padStart(length, '0')

export const getMonthDays = (month, year) => {
  const months30 = [4, 6, 9, 11]
  const leapYear = year % 4 === 0 // TODO 更詳細閏年判定

  return month === 2 ? (leapYear ? 29 : 28) : months30.includes(month) ? 30 : 31
}

export const getMonthFirstDay = (month, year) => {
  return +new Date(toDateString({ year, month, day: 1 })).getDay() + 1
}

export const getPreviousMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12
  const prevMonthYear = month > 1 ? year : year - 1

  return { month: prevMonth, year: prevMonthYear }
}

export const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1
  const nextMonthYear = month < 12 ? year : year + 1

  return { month: nextMonth, year: nextMonthYear }
}

export function monthText(monthNum) {
  if (monthNum < 1 || monthNum > 12) return '???'
  return CALENDAR_MONTHS[monthNum - 1]
}

export function toDateString({ year, month, day }) {
  return `${year}-${zeroPad(month, 2)}-${zeroPad(day, 2)}`
}

export function toDateObject(dateISOString) {
  const date = new Date(dateISOString)
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }
}
