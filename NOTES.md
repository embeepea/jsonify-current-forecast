Write the following function:

```javascript
  function currentWeatherXMLObjectToStringArray(obj, parameters) {
      // 'obj'      : an object of the sort returned by handleXML()
      // 'parameters' : an array of objects, where each object has properties named 'parameter' and 'type',
      //              corresponding to a specific type of observed parameter in obj
      //
      //  returns  : an N x M array of strings -- i.e. an array of length N, where
      //             each item in the array is an array of length M.  Think of
      //             this as a spreadsheet of N rows and M columns. N is the
      //             number of time points in the file (i.e. the number of
      //             <end-valid-time> or <start-valid-time> tags inside the
      //             <time-layout> tag).  The first (position 0) of the M values in each
      //             row is the (end) time associated with the observation, and the
      //             other M-1 values on the row are the values of the parameters
      //             from the 'parameters' array associated with that time.
  }
```

For suppose `obj` is the object returned by passing the following XML file to `handleXML()`:


```xml
<dwml ...>
  ...
  <data>
    ...
    <time-layout ...>
      <start-valid-time>2013-04-11T11:00:00-04:00</start-valid-time>
      <end-valid-time>2013-04-11T12:00:00-04:00</end-valid-time>
      <start-valid-time>2013-04-11T12:00:00-04:00</start-valid-time>
      <end-valid-time>2013-04-11T13:00:00-04:00</end-valid-time>
      <start-valid-time>2013-04-11T13:00:00-04:00</start-valid-time>
      <end-valid-time>2013-04-11T14:00:00-04:00</end-valid-time>
      <start-valid-time>2013-04-11T14:00:00-04:00</start-valid-time>
      <end-valid-time>2013-04-11T15:00:00-04:00</end-valid-time>
    </time-layout>
    <parameters ...>
      <temperature type="hourly" ...>
        <value>68</value>
        <value>72</value>
        <value>73</value>
        <value>74</value>
      </temperature>
      <temperature type="dew point" ...>
        <value>54</value>
        <value>58</value>
        <value>52</value>
        <value>51</value>
      </temperature>
      <temperature type="wind chill" ...>
        <value xsi:nil="true"/>
        <value xsi:nil="true"/>
        <value xsi:nil="true"/>
        <value xsi:nil="true"/>
      </temperature>
      <probability-of-precipitation type="floating"...>
        <value>5</value>
        <value>6</value>
        <value>11</value>
        <value>16</value>
      </probability-of-precipitation>
      <wind-speed type="sustained" ...>
        <value>14</value>
        <value>15</value>
        <value>15</value>
        <value>15</value>
      </wind-speed>
      <direction type="wind" ...>
        <value>190</value>
        <value>190</value>
        <value>180</value>
        <value>180</value>
      </direction>
    </parameters>
  </data>
</dwml>
```

Then the call

```javascript
currentWeatherXMLObjectToStringArray(obj, [ { 'parameter' : 'temperature', 'type' : 'hourly' },
                                            { 'parameter' : 'temperature', 'type' : 'dew point },
                                            { 'parameter' : 'probability-of-precipitation' 'type' : 'floating' } ])
```

would return the array

```javascript
[[ "2013041112","68","54","5" ],
 [ "2013041113","72","58","6" ],
 [ "2013041114","73","52","11"],
 [ "2013041115","74","51","16"]]
```
