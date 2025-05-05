import React from 'react';
import Event from './Events';

const MetaData = (props) => {
    return (
        <div className="box-with-outline">
            <label><strong>MetaData: </strong></label>
            <ul className="col-md-4 list-group">
                <div>Domain: {props.metadata.domainId}</div>
                <div>Command ID: {props.metadata.submitterInfo.commandId}</div>
                <div>Submitter: </div>
                <ul>
                    {props.metadata.submitterInfo.actAs &&
                        props.metadata.submitterInfo.actAs?.map((submitter) => (
                            <div key={submitter} className="list-row">
                                <strong>{submitter}</strong>
                            </div>
                        ))}
                </ul>
                <div>Disclosed Events: </div>
                <ul>
                    {props.metadata.disclosedEvents &&
                        props.metadata.disclosedEvents?.map((event) => (
                            <Event event={event} key={event.v1.contractId}/>
                        ))}
                </ul>
            </ul>
        </div>
    );
};

export default MetaData;