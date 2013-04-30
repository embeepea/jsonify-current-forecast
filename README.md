JSONify-Climate-Data
==================

Uses jQuery to parse hourly forecast data from the XML files provided by the <a href="http://www.weather.gov/">National Weather Service</a>.

Installation
==========

Clone this repository and add desired NOAA XML files to the Data directory.

To parse files: <br />
  Load the data file as text, then use the handleXML function to process the data.

See test.html for an example. 


Usage
==========
        
The object is returned in the following format:
               
    obj = {  
              Element : {
                          type : {  
                                    year: {
                                            month: [
                                                      day : [
                                                                [hour:value] // the value is stored 
                                                                             // in the array at the location 
                                                                             // which corresponds to the hour
                                                            ]
                                                   ]
                                          }
                                  }
                        }	
          }
               
    
Examples
==========

<b>Accessing XML data:<b> 

When parsing the Avl_0411-0418.xml stored in the Data directory, these are some examples of the data which can be accessed.

<i>To access the hourly temperature value for April 11, 2013 at 12pm:</i>

    obj.temperature['hourly'][2013][3][10][12] // will return 68

<i>To access the relative humidity value for April 14, 2013 at 7pm:</i>

    obj.humidity['relative'][2013][3][13][19] //will return 40


Additional Information
==========

<a href="http://forecast.weather.gov/MapClick.php?lat=35.59275&lon=-82.5564559&unit=0&lg=english&&FcstType=digital">This example</a> shows the table on the NWS site, and in the upper right-hand corner is the XML button to load the XML file containing this data.
