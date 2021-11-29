## Documentation
## [Demo](https://codesandbox.io/s/github/MEDESD/react-gantt)

## Installation

- Git clone
- `npm install` 

## Run the app in the development mode
- `npm start`
- options

| property       | type            | default value | values                           | description                     |
|----------------|-----------------|---------------|----------------------------------|---------------------------------|
| data           | array of object | null          | dayES, dayEE, dayRS, dayRE, rows | data of the chart               |
| lang           | enum            | en            | en, fr, es                       | language of the calendar        |
| excludeToolTip | array of string | []            |                                  | exclude row from the tooltip    |
| excludeCol     | array of string | []            |                                  | exclude column from the table   |
| scroll         | number          | 1             | between 1 and 10                 | speed of zoom                   |
| defaultScale   | enum            | day           | day, month, year                 | scale of the zoom               |
| weekEnd        | boolean         | false         |                                  | exclude weekends from the chart |

- note
- dayES = date Estimated start
- dayEE =  date Estimated end
- dayRS = date Reel start
- dayRE = date Reel end


## About

React Gantt Chart is a simple chart that implements gantt functionality as 
a React components.

the project was tested and should work on:

 - Firefox 50+
 - Chrome 49+
 - Safari 10+
 - Edge 14+
 - IE 9+

Distributed under an MIT license.
