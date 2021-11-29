import React from 'react';

interface PropsType {
    content: { [key: string]: string | {} }[]
    exclude: string[];
}

function LeftPanel({content, exclude}: PropsType) {

    const filterKeys = Array.from(new Set(...content.map(x => {
        return Object.keys(x);
    }))).filter(x => !exclude.includes(x));

    return (
        <table className="table-bordered text-center table-hover h-100 w-100">
            <thead style={{height: 22, fontSize: 13.5}}>
            <tr>
                {
                    filterKeys.map((x, i) => (<th key={i}>{x}</th>))
                }
            </tr>
            </thead>
            <tbody>
            {
                content.map((x, i) =>
                    (<tr style={{height: 48}} key={i}>{filterKeys.map((s, j) =>
                        (<td key={j}>{x[s]}</td>))}</tr>))
            }
            </tbody>
        </table>
    );
}

export default LeftPanel;
