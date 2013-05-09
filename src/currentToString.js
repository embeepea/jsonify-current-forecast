function getKeys(obj) {
    'use strict';
    var keys = [];

    for (var k in obj) {
        if (!obj.hasOwnProperty(k)){ 
            continue;
        }
        keys.push(k);
    }
    return keys;
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function currentWeatherXMLObjectToStringArray(obj, parameters) { 
    'use strict';
    var arrOfStrings = [],
        count,
        paramObj,
        param,
        type,
        key,
        years,
        year,
        months,
        month,
        days,
        day,
        hour,
        calendarMonth,
        calendarDay,
        value,
        tempObj,
        tempArr,
        newObj = {},
        fullDate;

    for (count = 0; count < parameters.length; count += 1) {
        paramObj = parameters[count];

        if (paramObj.type) {
            //if a type is specified
            param = paramObj.parameter;
            type = paramObj.type;
            tempObj = obj[param][type];

        } else {
            //if no type specified
            param = paramObj.parameter;
            tempObj = obj[param];
        }

        years = getKeys(tempObj);
        
        for (var i = 0; i < years.length; i += 1) {
            year = years[i];
            tempObj = tempObj[year];

            months = getKeys(tempObj);
   
            for (var j = 0; j < months.length; j += 1) {
                month = months[j];
                tempObj = tempObj[month];

                days = getKeys(tempObj);

                for (var k = 0; k < days.length; k += 1) {
                    day = days[k];
                    tempArr = tempObj[day];         
                    for (var l = 0; l < tempArr.length; l += 1) {
                        if (tempArr[l] !== undefined) {
                            hour = pad(l);
                            calendarMonth = Number(month) + 1;
                            value = String(tempArr[l]);
                            calendarMonth = pad(Number(month) + 1);
                            calendarDay = pad(Number(day) + 1);

                            fullDate = year + calendarMonth + calendarDay + hour;
                            if (!newObj[fullDate]) {
                                newObj[fullDate] = [];
                            }
                            
                            if (newObj[fullDate][0] !== fullDate) { 
                                newObj[fullDate].push(fullDate, value);
                            } else {
                                newObj[fullDate].push(value);
                            }
                        }
                    }
                }
            }
        }
    }


    //For every key (date) in newObj, push the array into arrayOfStrings.  
    for (var d in newObj) {
        arrOfStrings.push(newObj[d]);
    }
    
    //return sorted
    return arrOfStrings.sort();
}

