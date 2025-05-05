import React from 'react';
import Field from './Field';
import { unixTimestampNsToDate} from "../utils/utils";

const Event = (props) => {
    var createdAtString = String(unixTimestampNsToDate(props.event.createdAt*1000));

    return (
        <div>
            <label><strong>Event:</strong></label>
            <ul className="col-md-4 list-group">
                <li><span>Contract ID:</span><span className={"entry-value"}>{props.event.v1.contractId}</span></li>
                <li><span>Package:</span><span> {props.event.v1.packageName} / {props.event.v1.templateId.moduleName} / <strong>{props.event.v1.templateId.entityName}</strong></span></li>
                <li>Package ID: {props.event.v1.templateId.packageId}</li>
                <li>Created At: <span className="time-display">{createdAtString}</span></li>
            </ul>
            <ul>
                <li><strong>Argument: </strong></li>
                <ul>
                    <li>Module Name: {props.event.v1.argument.record.recordId.moduleName} / {props.event.v1.argument.record.recordId.entityName}</li>
                    <li>Package ID: {props.event.v1.argument.record.recordId.packageId}</li>
                    <li>Fields:
                        <ul>
                        {props.event.v1.argument.record.fields &&
                            props.event.v1.argument.record.fields?.map((field) => (
                                <Field key={field.label} field={field} />
                            ))}
                        </ul>
                    </li>
                </ul>
                <li><strong>Signatories: </strong></li>
                <ul>
                    {props.event.v1.signatories &&
                        props.event.v1.signatories?.map((signatory) => (
                            <li key={signatory} className={"entry-value"}>{signatory}</li>
                        ))}
                </ul>
                <div><strong>Stakeholders: </strong></div>
                <ul>
                    {props.event.v1.stakeholders &&
                        props.event.v1.stakeholders?.map((stakeholder) => (
                            <li key={stakeholder} className={"entry-value"}>{stakeholder}</li>
                        ))}
                </ul>
            </ul>

        </div>
    );
};

export default Event;