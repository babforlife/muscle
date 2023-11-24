export const dateToString = (date: Date) => {
  if (!date) return
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return `${date.toLocaleDateString(undefined, options)} à ${date.getHours()}:${date.getMinutes()}`
}
