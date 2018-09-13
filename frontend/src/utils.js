import moment from 'moment'

export const createRateDate = function (rateDate) {
  let day = parseFloat(moment(rateDate).format('D')),
    month = parseFloat(moment(rateDate).format('M')),
    dayOfWeek = parseFloat(moment(rateDate).weekday())

  if (dayOfWeek === 6) {
    if (day !== 1) {
      day = day - 1
      rateDate.setDate(day)
    } else {
      rateDate = new Date(rateDate.getFullYear(), rateDate.getMonth() - 1, 0)
    }
  } else if (dayOfWeek === 0) {
    if (day !== 1) {
      day = day - 2
      rateDate.setDate(day)
    } else {
      rateDate = new Date(rateDate.getFullYear(), rateDate.getMonth() - 1, 0)
      day = moment(rateDate).format('D')
      day = day - 1
      rateDate.setDate(day)
    }
  }

  return rateDate
}

export const formatDateForBackend = function (date) {
  return '\/Date(' + new Date(date).getTime().toString() + ')\/'
}

export const dateStringToObj = function (date) {
  if (date !== null) {
    return new Date(parseInt(date.substring(6, date.length - 2)))
  }
}

export const createClone = function (data) {
  let clone = JSON.parse(
    JSON.stringify(data)
  );
  if (clone.constructor === Array) {
    for (let key in clone[0]) {
      for (let i = 0; i < clone.length; i++) {
        if (key.toLowerCase().includes("date")) {
          clone[i][key] = new Date(clone[i][key])
        }
      }
    }
  } else {
    for (let key in clone) {
      if (key.toLowerCase().includes("date")) {
        clone[key] = new Date(clone[key])
      }
    }
  }
  return clone;
}
