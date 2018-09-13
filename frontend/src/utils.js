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
  return clone;
}

export const setWorkExperience = function (date) {
  let oDates = {
    day: '',
    month: '',
    year: ''
  }

  if (date.years === 0) {
    oDates.year = ''
  } else if (date.years === 1) {
    oDates.year = 'rok '
  } else if (date.years > 1 && date.years <= 4) {
    oDates.year = date.years + ' lata '
  } else if (oDiff.years > 4) {
    oDates.year = date.years + ' lat '
  }

  if (date.months === 0) {
    oDates.month = ''
  } else if (date.months === 1) {
    oDates.month = 'miesiąc '
  } else if (date.months > 1 && date.months <= 4) {
    oDates.month = date.months + ' miesiące '
  } else if (date.months > 4) {
    oDates.month = date.months + ' miesięcy '
  }

  if (date.days === 0) {
    oDates.day = ''
  } else if (date.days === 1) {
    oDates.day = date.days + ' dzień'
  } else {
    oDates.day = date.days + ' dni'
  }

  return oDates;
}

const actions = {

}
