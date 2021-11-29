import React, {useEffect, useState} from 'react';
import {GanttType} from "../tools/Types";
import LeftPanel from "./main/LeftPanel";
import RightPanel from "./main/RightPanel";
import {FaMinus, FaPlus} from "react-icons/all";

interface PropsTypes {
    options: GanttType;
}


function Chart({options}: PropsTypes) {
    const [scale, setScale] = useState<'day' | 'month' | 'year'>(options.defaultScale || "day");

    const [style, setStyle] = useState<React.CSSProperties>({});
    useEffect(() => {
        switch (scale) {
            case "month":
                setStyle({fontSize: 15, height: 24})
                break;
            case "year":
                setStyle({fontSize: 15})
                break;
            case "day":
                setStyle({fontSize: 15, height: 72})
                break;
        }
    }, [scale])

    return (
        <div>
            <div className="d-flex w-100">
                <div className="w-50 h-100">

                    <div className="border-right border-left" style={style}/>


                    <LeftPanel exclude={options.excludeCol || []}
                               content={options.data.map(x => x.rows)}/>
                </div>
                <div className="w-50 h-100">
                    <RightPanel scale={scale} weekEnd={options.weekEnd || false} scroll={options.scroll || 1}
                                lang={options.lang || 'en'}
                                excludeToolTip={options.excludeToolTip || []}
                                data={options.data}/>
                </div>
            </div>
            <div className="row mx-5 my-1 justify-content-center">
                <div className="col-xs m-1">
                    <button onClick={() => {
                        switch (scale) {
                            case "day":
                                setScale("month");
                                break;
                            case "month":
                                setScale("year")
                                break;
                            default:
                                setScale(scale);
                                break;
                        }
                    }} className="btn btn-sm btn-secondary"><FaMinus className="mb-1"/></button>
                </div>
                <div onClick={() => {
                    switch (scale) {
                        case "year":
                            setScale("month");
                            break;
                        case "month":
                            setScale("day")
                            break;
                        default:
                            setScale(scale);
                            break;
                    }
                }} className="col-xs m-1">
                    <button className="btn btn-sm btn-secondary"><FaPlus className="mb-1"/></button>
                </div>
            </div>
        </div>
    );
}

export default Chart;
