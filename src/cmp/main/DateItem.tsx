import React, {useEffect, useState} from 'react';
import moment, {Moment} from "moment";
import 'moment/locale/fr'
import 'moment/locale/es'

interface PropsTypes {
    dateStart: Moment;
    dateEnd: Moment;
    lang: 'fr' | 'en' | 'es';
    weekEnd: boolean;
    dataLength: number;
    scale: 'day' | 'year' | 'month'
}

const DateItem = ({dateStart, scale, dataLength, weekEnd, dateEnd, lang}: PropsTypes) => {

    const [days, setDays] = useState<Moment[]>([]);
    const [months, setMonths] = useState<{ month: string, count: number }[]>([]);
    const [years, setYears] = useState<{ year: string, count: number }[]>([]);

    useEffect(() => {
        let dataDay: Moment[] = [];
        dataDay.push(dateStart.clone());
        while (dateEnd.valueOf() > dateStart.valueOf()) {
            dataDay.push(dateStart.add(1, "days").clone());
        }
        setDays(dataDay);


        const dateMonth = dataDay.map(x => x.clone().format("MM-YYYY"));

        const month = Array.from(new Set(dateMonth))

        const dataMonths: { month: string, count: number }[] = [];

        month.forEach(x => {
            dataMonths.push({
                month: x,
                count: scale === 'month' ? 1 : dateMonth.filter(s => s === x).length
            });
        })

        setMonths(dataMonths);

        const dateYear = scale === "month" ? month.map(x => x.split('-')[1]) : dataDay.map(x => x.clone().format("YYYY"));

        const year = Array.from(new Set(dateYear));

        const dataYears: { year: string, count: number }[] = [];

        year.forEach(x => {
            dataYears.push({year: x, count: scale === "year" ? 2 : dateYear.filter(s => s === x).length})
        })

        setYears(dataYears);


    }, [scale, dateEnd, weekEnd, dateStart]);


    return (
        <div className="w-100 d-flex flex-column">


            <div className="d-flex">
                {years.map((x, i) => (
                    <div key={i}
                         id={x.year}
                         className="border d-flex justify-content-center align-items-center p-1"
                         style={{
                             minWidth: 24 * x.count,
                             width: 24 * x.count,
                             height: 24
                         }}>{x.count === 1 ? x.year.slice(2) : x.year}</div>))}
            </div>

            {
                scale === "month" ||scale ===  "day" ? <div className="d-flex w-100">
                    {months.map((x, i) => (
                        <div key={i}
                             className="border d-flex justify-content-center align-items-center p-1"
                             id={x.month}
                             style={{
                                 minWidth: 24 * x.count,
                                 width: 24 * x.count,
                                 height: 24
                             }}>{scale === "month" ? moment('15-' + x.month, "DD-MM-YYYY").locale(lang).format("MM") : moment('15-' + x.month, "DD-MM-YYYY").locale(lang).format("MMMM")}</div>))}
                </div> : null
            }


            {
                scale === 'day' ? <>
                    <div className="d-flex w-100">
                        {days.map(x => (
                            <div id={moment(x.valueOf()).clone().format('DD-MM-YYYY')} key={x.valueOf()}
                                 className="d-flex justify-content-center align-items-center"
                                 style={{
                                     border: '1px solid #dee2e6',
                                     borderSpacing: 0,
                                     padding: '5px',
                                     width: 24,
                                     minWidth: 24,
                                     height: 24
                                 }}>{x.format('DD')}</div>))}
                    </div>

                    <div className="d-flex w-100">
                        {days.map(x => (
                            <div id={moment(x.valueOf()).clone().format('DD-MM-YYYY')} key={x.valueOf()}
                                 className="d-flex justify-content-center align-items-center"
                                 style={{
                                     border: '1px solid #dee2e6',
                                     borderRight: weekEnd && x.day() === 6 ? 'none' : '1px solid #dee2e6',
                                     borderLeft: weekEnd && x.day() === 0 ? 'none' : '1px solid #dee2e6',
                                     borderSpacing: 0,
                                     width: 24,
                                     minWidth: 24,
                                     height: 24
                                 }}>
                                {
                                    weekEnd && (x.day() === 0 || x.day() === 6) ?
                                        <div style={{
                                            width: 24,
                                            textAlign: "center",
                                            zIndex: 30,
                                            marginTop: 48 * dataLength,
                                            paddingBottom: 48 * dataLength,
                                            backgroundColor: "black",
                                            color: "white"
                                        }}>
                                            {x.locale(lang).format('dd')[0].toUpperCase()}
                                        </div> :
                                        x.locale(lang).format('dd')[0].toUpperCase()
                                }
                            </div>))}
                    </div>
                </> : null
            }


        </div>
    );
};

export default DateItem;
