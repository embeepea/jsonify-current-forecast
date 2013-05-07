function currentWeatherXMLObjectToStringArray(obj, parameters) {
    var arrOfStrings = [],
        count,
        paramObj,
        param,
        type,
        key,
        years,
        months,
        days,
        tempObj,
        tempArr,
        newObj = {},
        fullDate;

    for (count = 0; count < parameters.length; count++) {
        paramObj = parameters[count]; 

        if (paramObj['type']) {
            //if a type is specified
            param = paramObj['parameter'];
            type = paramObj['type'];
            tempObj = obj[param][type];

        } else {
            //if no type specified
            param = paramObj['parameter'];
            tempObj = obj[param];
        }

        years = getKeys(tempObj);
        
        for (var i = 0; i < years.length; ++i) {
            year = years[i];
            tempObj = tempObj[year];

            months = getKeys(tempObj);
   
            for (var j = 0; j < months.length; ++j) {
                month = months[j];
                tempObj = tempObj[month];

                days = getKeys(tempObj);

                for (var k = 0; k < days.length; ++k) {
                    day = days[k];
                    tempArr = tempObj[day];         
                    for (var l = 0; l < tempArr.length; ++l) {
                        if (tempArr[l] !== undefined) {
                            hour = l;
                            calendarMonth = Number(month) + 1;
                            calendarDay = Number(day) + 1;
                            fullDate = year + calendarMonth + calendarDay + hour;
                            if (!newObj[fullDate]) {
                                newObj[fullDate] = [];
                            }
                            
                            if (newObj[fullDate][0] !== fullDate) { 
                                newObj[fullDate].push(fullDate, tempArr[l]);
                            } else {
                                newObj[fullDate].push(tempArr[l]);
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

function getKeys(obj) {
    var keys = [];

    for (var k in obj) {
        if (!obj.hasOwnProperty(k)){ 
            continue;
        }
        keys.push(k);
    }
    return keys;
}

