import React, {useRef} from 'react';
import {DataType} from "../../tools/Types";
import DateItem from "./DateItem";
import moment from "moment";
import FillData from "./FillData";

interface PropsType {
    data: DataType[];
    excludeToolTip: string[];
    lang: 'fr' | 'en' | 'es';
    scroll: number;
    weekEnd: boolean;
    scale: 'day' | 'year' | 'month'
}

const RightPanel = ({data, scale, weekEnd, excludeToolTip, scroll, lang}: PropsType) => {

    const dataRef = useRef<HTMLDivElement>(null);


    const end = Math.max(...data.map(x => x.dayRE.valueOf()), ...data.map(x => x.dayEE.valueOf()))
    const start = Math.min(...data.map(x => x.dayRS.valueOf()), ...data.map(x => x.dayES.valueOf()))

    const position: { top: number, left: number, x: number } = {
        top: 0,
        left: 0,
        x: 0
    };


    const mouseMoveHandler = function (e: MouseEvent) {
        const {current} = dataRef;
        const dx = e.clientX - position.x;
        if (!current) return;
        current.scrollLeft = position.left - dx;
    };

    const mouseUpHandler = function () {
        const {current} = dataRef;
        if (!current) return;
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', mouseUpHandler);
        current.style.cursor = 'grab';
        current.style.removeProperty('user-select');
    };


    return (
        <div ref={dataRef} onWheel={e => {
            if (scroll < 1) scroll = 1
            if (scroll > 10) scroll = 10
            e.currentTarget.scrollLeft += e.currentTarget.scrollWidth / e.deltaY * -scroll;
        }} onMouseDown={(e) => {
            const {current} = dataRef;
            if (!current) return;
            current.style.cursor = 'grabbing';
            current.style.userSelect = 'none';
            position.left = current.scrollLeft;
            position.top = current.scrollTop;
            position.x = e.clientX;
            window.addEventListener('mousemove', mouseMoveHandler);
            window.addEventListener('mouseup', mouseUpHandler);
        }} style={{cursor: 'grab'}}
             className="w-100 table-responsive h-100">
            <DateItem scale={scale} weekEnd={weekEnd} lang={lang} dataLength={data.length} dateStart={moment(start)}
                      dateEnd={moment(end)}/>
            <FillData scale={scale} excludeToolTip={excludeToolTip} start={moment(start).clone()} data={data}/>
        </div>
    );
};

export default RightPanel;
