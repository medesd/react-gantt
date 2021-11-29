import React, {useEffect, useState} from 'react';
import {DataType} from "../../tools/Types";
import moment, {Moment} from "moment";
import ReactTooltip from "react-tooltip";


interface PropsType {
    data: DataType[];
    start: Moment;
    excludeToolTip: string[];
    scale: 'day' | 'year' | 'month';
}

const FillData = ({data, start, scale, excludeToolTip}: PropsType) => {
    const [barPosition, setBarPosition] = useState<{ content: {}, color: string, width: number, left: number }[]>();

    const [dataPresent, setDataPresent] = useState<number>(0);


    useEffect(() => {
        const fillData: { content: {}, color: string, width: number, left: number }[] = [];
        data.forEach(x => {
            if (x.dayRE < x.dayRS || x.dayEE < x.dayES) {
                console.error(`End Date must greater then Start Date`)
                return;
            }

            let leftEst = document.getElementById(moment(x.dayES.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
            let widthCalc = document.getElementById(moment(x.dayEE.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
            let startItem = document.getElementById(start.clone().format('DD-MM-YYYY'))?.offsetLeft;


            switch (scale) {
                case "month":
                    leftEst = document.getElementById(moment(x.dayES.valueOf()).format("MM-YYYY"))?.offsetLeft;
                    widthCalc = document.getElementById(moment(x.dayEE.valueOf()).format("MM-YYYY"))?.offsetLeft;
                    startItem = document.getElementById(start.format('MM-YYYY'))?.offsetLeft;
                    break;
                case "year":
                    leftEst = document.getElementById(moment(x.dayES.valueOf()).format("YYYY"))?.offsetLeft;
                    widthCalc = document.getElementById(moment(x.dayEE.valueOf()).format("YYYY"))?.offsetLeft;
                    startItem = document.getElementById(start.format('YYYY'))?.offsetLeft;
                    break;
                case "day":
                    leftEst = document.getElementById(moment(x.dayES.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
                    widthCalc = document.getElementById(moment(x.dayEE.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
                    startItem = document.getElementById(start.clone().format('DD-MM-YYYY'))?.offsetLeft;
                    break;
            }


            if (leftEst && widthCalc && startItem) {
                const rootPosition = leftEst - startItem;
                const rootWidth = widthCalc - leftEst;

                fillData.push({
                    content: x.rows,
                    color: "#00ff00",
                    width: rootWidth + 24,
                    left: rootPosition
                })
            } else {
                setDataPresent(f => (f + 1));
            }
            let leftReel = document.getElementById(moment(x.dayRS.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
            let widthCalcR = document.getElementById(moment(x.dayRE.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
            switch (scale) {
                case "month":
                    leftReel = document.getElementById(moment(x.dayES.valueOf()).format("MM-YYYY"))?.offsetLeft;
                    widthCalcR = document.getElementById(moment(x.dayEE.valueOf()).format("MM-YYYY"))?.offsetLeft;
                    break;
                case "year":
                    leftReel = document.getElementById(moment(x.dayES.valueOf()).format("YYYY"))?.offsetLeft;
                    widthCalcR = document.getElementById(moment(x.dayEE.valueOf()).format("YYYY"))?.offsetLeft;
                    break;
                case "day":
                    leftReel = document.getElementById(moment(x.dayES.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
                    widthCalcR = document.getElementById(moment(x.dayEE.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
                    break;
            }


            if (leftReel && widthCalcR && startItem) {
                const rootPosition = leftReel - startItem;
                const rootWidth = widthCalcR - leftReel;

                fillData.push({
                    content: x.rows,
                    color: "#ff0000",
                    width: rootWidth + 24,
                    left: rootPosition
                })
            } else {
                setDataPresent(f => (f + 1));
            }
        })
        setBarPosition(fillData);


    }, [start, scale, data, dataPresent]);


    return (
        <div style={{height: 48 * data.length}} className="w-100 position-relative">
            {
                barPosition?.map((x, i) => {

                    const elements = Object.keys(x.content).filter(f => !excludeToolTip.includes(f)).map(f => {
                        // @ts-ignore
                        return `<tr><td>${f}</td><td>: ${x.content[f]}</td></tr>`
                    })


                    return <div data-tip={`<table class="table-dark w-100"><tbody>${elements.join('')}</tbody></table>`}
                                key={i}
                                className="position-absolute"
                                style={{
                                    margin: "1px 0",
                                    top: 24 * i,
                                    backgroundColor: x.color,
                                    height: 22,
                                    border: x.color === '#00ff00' ? "1px solid #00dd00" : "1px solid #dd0000",
                                    borderRadius: 5,
                                    width: x.width,
                                    left: x.left
                                }}>

                        <ReactTooltip className="p-0 rounded" html={true}/>
                    </div>
                })
            }
        </div>
    );
};

export default FillData;
