import {Moment} from "moment";

export interface GanttType {
    lang?: 'fr' | 'es' | 'en';
    title?: string;
    excludeToolTip?: string[];
    excludeCol?: string[];
    data: DataType[];
    scroll?: number;
    weekEnd?: boolean;
    defaultScale?: 'day' | 'month' | 'year';
}


export interface DataType {
    dayES: Moment;
    dayRS: Moment;
    dayEE: Moment;
    dayRE: Moment;
    rows: {};
}
