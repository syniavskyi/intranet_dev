import moment from "moment";

export const createRateDate = function(rateDate) {
  let day = parseFloat(moment(rateDate).format("D")),
    month = parseFloat(moment(rateDate).format("M")),
    dayOfWeek = parseFloat(moment(rateDate).weekday());

  if (dayOfWeek === 6) {
    if (day !== 1) {
      day = day - 1;
      rateDate.setDate(day);
    } else {
      rateDate = new Date(rateDate.getFullYear(), rateDate.getMonth() - 1, 0);
    }
  } else if (dayOfWeek === 0) {
    if (day !== 1) {
      day = day - 2;
      rateDate.setDate(day);
    } else {
      rateDate = new Date(rateDate.getFullYear(), rateDate.getMonth() - 1, 0);
      day = moment(rateDate).format("D");
      day = day - 1;
      rateDate.setDate(day);
    }
  }

  return rateDate;
};

export const formatDateForBackend = function(date) {
  return "/Date(" + new Date(date).getTime().toString() + ")/";
};

export const dateStringToObj = function(date) {
  if (date !== null) {
    return new Date(parseInt(date.substring(6, date.length - 2)));
  }
};

export const createClone = function(data) {
  let clone = JSON.parse(JSON.stringify(data));
  if (clone.constructor === Array) {
    for (let key in clone[0]) {
      for (let i = 0; i < clone.length; i++) {
        if (key.toLowerCase().includes("date")) {
          clone[i][key] = new Date(clone[i][key]);
        }
      }
    }
  } else {
    for (let key in clone) {
      if (key.toLowerCase().includes("date")) {
        clone[key] = new Date(clone[key]);
      }
    }
  }
  return clone;
} 

export const formatToArray = function (data) {
  let dataSet;
   if(data[0].__metadata) {
    dataSet = data[0].__metadata.type;
   }
  let index, string;
  let array = [];

  for(let i = 0; i < data.length; i++) {
    if(data[i].__metadata) {
    delete data[i].__metadata;
  //  let pos = data[i].findIndex(x => x[i] == '__metadata');
  //  data[i].splice(pos, 1);
    }
    for(let key in data[i]) { 
      if(data[i][key].includes('||')) {
        while(data[i][key].length > 1) {
          index = data[i][key].indexOf('||');
          if(index > 0) {
              string = data[i][key].slice(0, index);
              array.push(string);
              index += 2;
              data[i][key] = data[i][key].substr(index, data[i][key].length);
          } 
          else {
              array.push(data[i][key]);
               data[i][key] = "";
          }
        }
         data[i][key] = array;
         array = [];
      } else {
           if(dataSet == 'ZGW_INTRANET_SRV.UserSkills' && key != "UserAlias" 
           || dataSet == 'ZGW_INTRANET_SRV.UserSkills' && key != "Language" 
           || dataSet == 'ZGW_INTRANET_SRV.Event' && key == 'Employee'
           || dataSet == 'ZGW_INTRANET_SRV.Event' && key == 'TargetGroup') {
              array.push(data[i][key]);
              data[i][key] = array;
              array = [];
      }
      }
    }
    return data;
  }
}  
export const formatToString = function(data) {
let formattedData = {};
  for(let key in data) {
    if(data[key]) {
      if(data[key].constructor === Array) {
        formattedData[key] = "";
        for(let i = 0; i < data[key].length; i++) {
          if(data[key].length <= 1) {
             formattedData[key] = data[key][i]
          }
          else {
            formattedData[key] += data[key][i] + '||';
          }
        } 
        if(formattedData[key].includes('||')) {
          formattedData[key] = formattedData[key].slice(0, formattedData[key].length-2);
        }
        data[key] = formattedData[key];
      }
    }
  }
  return data;
}

export const setWorkExperience = function(date) {
  let oDates = {
    day: "",
    month: "",
    year: ""
  };

  if (date.years === 0) {
    oDates.year = "";
  } else if (date.years === 1) {
    oDates.year = "rok ";
  } else if (date.years > 1 && date.years <= 4) {
    oDates.year = date.years + " lata ";
  } else if (oDiff.years > 4) {
    oDates.year = date.years + " lat ";
  }

  if (date.months === 0) {
    oDates.month = "";
  } else if (date.months === 1) {
    oDates.month = "miesiąc ";
  } else if (date.months > 1 && date.months <= 4) {
    oDates.month = date.months + " miesiące ";
  } else if (date.months > 4) {
    oDates.month = date.months + " miesięcy ";
  }

  if (date.days === 0) {
    oDates.day = "";
  } else if (date.days === 1) {
    oDates.day = date.days + " dzień";
  } else {
    oDates.day = date.days + " dni";
  }

  return oDates;
};
export const formatTimeForCalendar = function(data) {
  let format = data.slice(2, 4) + data.slice(5, 7) + data.slice(8, 10); 
  return data = moment(format, "hmm").format('HH:mm:ss'); 
}
export const formatTimeForBackend = function(data) {
  return "PT" + data.slice(0,2) + "H" + data.slice(3,5) + "M00S";
}
const actions = {};