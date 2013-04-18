function handleXML(xmlstring) {
    'use strict';

    var xmldoc = $.parseXML(xmlstring),
        $xml = $(xmldoc),
        obj = {},
        tempObj = {};

    $xml.find('data').each(function () {
        var $data = $(this),
            $dataTags,
            dataTagName,
            tagName,
            elementName,
            elementType,
            timeTag,
            date,
            year,
            month,
            day,
            hour,
            elementValue;

        $data.children().each(function () {
            $dataTags = $(this);
            dataTagName = this.tagName;

            if (dataTagName === 'location') {

                if (!obj[dataTagName]) {
                    obj[dataTagName] = {};
                }

                $dataTags.children().each(function () {
                    $data = $(this);
                    tagName = this.tagName;
                    obj[dataTagName][tagName] = $data.text();
                    obj[dataTagName][tagName][$data.text()] = {};
                });
            } else if (dataTagName === 'parameters') {
                $dataTags.children().each(function () {
                    $data = $(this);
                    elementName = this.tagName;
                    elementType = $data.attr('type');

                    if (!obj[elementName]) {
                        obj[elementName] = {};
                    }
                    if ($data.attr('type') !== undefined) {
                        obj[elementName][elementType] = tempObj;
                    } else {
                        obj[elementName] = tempObj;
                    }

                    $data.children().each(function () {
                        $data = $(this);
                        elementValue = $data.text();
                    });

                    $xml.find('time-layout').each(function () {
                        $data = $(this);
                        $data.children().each(function () {
                            $data = $(this);
                            timeTag = this.tagName;
                            if (timeTag === 'end-valid-time') {
                                date = new Date($data.text());
                                year = date.getFullYear(); //four-digit year
                                month = date.getMonth();
                                day = date.getDate(); //day of month
                                hour = date.getHours();

                                if (!tempObj[year]) {
                                    tempObj[year] = [];
                                }

                                if (!tempObj[year][month]) {
                                    tempObj[year][month] = [];
                                }

                                if (!tempObj[year][month][day - 1]) {
                                    tempObj[year][month][day - 1] = [];
                                }

                                console.log(elementValue);
                                tempObj[year][month][day - 1][hour] = elementValue;
                            }
                        });
                    });
                });
            }
        });
    });
//*** REMOVE CONSOLE.LOG BEFORE COMMITTING ***//
    console.log(obj);
    //console.log(tempObj);
    return obj;

} //end handleXML
