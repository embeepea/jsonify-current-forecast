function handleXML(xmlstring) {
    'use strict';

    var xmldoc = $.parseXML(xmlstring),
        $xml = $(xmldoc),
        obj = {},
        $data,
        elementName,
        elementType,
        timeTag,
        dateText,
        dateObj,
        date,
        year,
        month,
        day,
        hour,
        elementValue,
        $parameters,
        $parameterData,
        $elementData,
        $timeData,
        timeArr = [],
        $time,
        $location,
        location,
        latitude,
        longitude,
        count,
        $weatherConditions,
        weatherType,
        weatherCoverage;


    $xml.find('data').each(function () {
        $data = $(this);
        $data.find('time-layout').each(function () {
            $time = $(this);
            $time.children().each(function () {
                $timeData = $(this);
                timeTag = this.tagName;
                if (timeTag === 'end-valid-time') {
                    dateText = $timeData.text();
                    dateObj = {'year': Number(dateText.substring(0, 4)),
                                   'month' : Number(dateText.substring(5, 7)),
                                   'day' : Number(dateText.substring(8, 10)),
                                   'hour' : Number(dateText.substring(11, 13))};
                    timeArr.push(dateObj);
                }
            });
        });

        $data.find('location').each(function () {
            $location = $(this);
            location = $location.find('city').text();
            latitude = $location.find('point').attr('latitude');
            longitude = $location.find('point').attr('longitude');
            if (!obj.location) {
                obj.location = {};
            }
            if (!obj.location.latitude) {
                obj.location.latitude = Number(latitude);
            }
            if (!obj.location.longitude) {
                obj.location.longitude = Number(longitude);
            }
            if (!obj.location.city) {
                obj.location.city = location;
            }
        });


        $data.find('parameters').each(function () {
            $parameters = $(this);
            $parameters.children().each(function () {
                $parameterData = $(this);
                elementName = this.tagName;
                elementType = $parameterData.attr('type');
                count = 0;
                $parameterData.children().each(function () {
                    $elementData = $(this);
                    elementValue = $elementData.text();
                    date = timeArr[count];
                    year = date.year; //four-digit year
                    month = date.month;
                    day = date.day; //day of month
                    hour = date.hour;

                    if (!obj[elementName]) {
                        obj[elementName] = {};
                    }

                    if (elementType !== undefined) {
                        if (!obj[elementName][elementType]) {
                            obj[elementName][elementType] = {};
                        }

                        if (!obj[elementName][elementType][year]) {
                            obj[elementName][elementType][year] = [];
                        }

                        if (!obj[elementName][elementType][year][month - 1]) {
                            obj[elementName][elementType][year][month - 1] = [];
                        }

                        if (!obj[elementName][elementType][year][month - 1][day - 1]) {
                            obj[elementName][elementType][year][month - 1][day - 1] = [];
                        }
                        if ((elementValue !== undefined) && (elementValue !== '')) {
                            obj[elementName][elementType][year][month - 1][day - 1][hour] = Number(elementValue);
                        }

                    } else {
                        if (!obj[elementName][year]) {
                            obj[elementName][year] = [];
                        }

                        if (!obj[elementName][year][month - 1]) {
                            obj[elementName][year][month - 1] = [];
                        }

                        if (!obj[elementName][year][month - 1][day - 1]) {
                            obj[elementName][year][month - 1][day - 1] = [];
                        }

                        if (elementName === 'weather') {
                            $elementData.find('value').each(function () {
                                $weatherConditions = $(this);
                                weatherType = $weatherConditions.attr('weather-type');
                                weatherCoverage = $weatherConditions.attr('coverage');

                                if (weatherType !== undefined) {
                                    if (!obj[elementName][year][month - 1][day - 1][hour]) {
                                        obj[elementName][year][month - 1][day - 1][hour] = {};
                                    }

                                    if (!obj[elementName][year][month - 1][day - 1][hour][weatherType]) {
                                        obj[elementName][year][month - 1][day - 1][hour][weatherType] = weatherCoverage;
                                    }
                                }
                            });
                        } else {

                            if ((elementValue !== undefined) && (elementValue !== '')) {
                                obj[elementName][year][month - 1][day - 1][hour] = Number(elementValue);
                            }
                        }
                    }


                    if (count < timeArr.length - 1) {
                        count = count + 1;
                    } else {
                        count = 0;
                    }
                });
            });
        });
    });

    return obj;

} //end handleXML
