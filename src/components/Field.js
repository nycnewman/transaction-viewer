import React from 'react';
import { unixTimestampNsToDate} from "../utils/utils";

const Field = (props) => {
    var value_display = '';
    var css_class = '';

    switch(Object.keys(props.field.value)[0]) {
        case 'party':
            value_display = props.field.value['party'];
            css_class = "entry-value"
            break;
        case 'timestamp':
            const stringValue = String(unixTimestampNsToDate(props.field.value['timestamp'] * 1000));
            value_display = stringValue;
            css_class = 'time-display'
            break;
        default:
            value_display = "Unknown Type: " + Object.keys(props.field.value);
    }
    return (
        <li>
            <span>{props.field.label + ': '}</span>
            <span className={css_class}>{value_display}</span>
        </li>
    );
};

export default Field;