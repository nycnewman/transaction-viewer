import React, {useState} from 'react';

export default function RawJSONDisplay(props) {
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen((isOpen) => !isOpen);
    }

    return (
        <div className="box-with-outline">
            <div onClick={toggle}><strong>Raw JSON (click to show/hide)</strong></div>
            {isOpen && <pre>{JSON.stringify(props.json, null, 2)}</pre>}
            <p/>
            <p/>
            <p/>
        </div>

    );
}
