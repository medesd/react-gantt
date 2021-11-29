import React from 'react';
import Chart from "./cmp/Chart";
import {DataType} from "./tools/Types";
import moment from "moment";

function App() {
    const data: DataType[] = [
        {
            rows: {name: "test1", next: "next1"},
            dayES: moment('08-12-2019', 'DD-MM-YYYY'),
            dayRS: moment('08-12-2019', 'DD-MM-YYYY'),
            dayEE: moment(),
            dayRE: moment()
        },
        {
            rows: {name: "test2", next: "next2"},
            dayES: moment('08-12-2018', 'DD-MM-YYYY'),
            dayRS: moment('08-12-2018', 'DD-MM-YYYY'),
            dayEE: moment(),
            dayRE: moment()
        },
        {
            rows: {name: "test3", next: "next3"},
            dayES: moment('08-12-2017', 'DD-MM-YYYY'),
            dayRS: moment('08-12-2017', 'DD-MM-YYYY'),
            dayEE: moment(),
            dayRE: moment()
        },
        {
            rows: {name: "test3", next: "next3"},
            dayES: moment('08-12-2017', 'DD-MM-YYYY'),
            dayRS: moment('08-12-2017', 'DD-MM-YYYY'),
            dayEE: moment(),
            dayRE: moment()
        }
    ]
    return (
        <div>
            <Chart options={{lang: 'fr', data}}/>
        </div>
    );
}

export default App;
