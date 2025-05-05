import React from 'react';
import Field from "./Field";

const TransactionNode = (props) => {

    const node = props.nodes.find(node => node.nodeId === props.id);
    const node_type = Object.keys(node.v1)[0];
    const node_body = node.v1[Object.keys(node.v1)[0]];
    var event_fields = [];
    switch (node_type) {
        case 'create':
            event_fields = node_body.argument.record.fields;
            break;
        case 'exercise':
            event_fields = node_body.chosenValue.record.fields;
            break;
        default:
            console.log("ERROR - Unknown node type!")
            break;
    }

    return (
        <ul  className="box-with-outline">
            <div><strong>"{props.id}": {node_type} (LF Version: {node_body.lfVersion})</strong></div>
            <ul>
                <div>Package: {node_body.packageName} / {node_body.templateId.moduleName} / <strong>{node_body.templateId.entityName}</strong></div>
                <div>Package ID: {node_body.templateId.packageId}</div>

                {node_type === 'exercise' && <div>Choice: <strong>{node_body.choiceId}</strong></div>}

                <div>{event_fields && <span><strong>Arguments:</strong></span>}
                    <ul>
                        {event_fields &&
                            event_fields?.map((field) => (
                                <Field key={field.label} field={field} />
                            ))}
                    </ul>
                </div>

                <div><strong>Signatories: </strong></div>
                <ul>
                    {node_body.signatories &&
                        node_body.signatories?.map((signatory) => (
                            <li key={signatory}><span className={"entry-value"}>{signatory}</span></li>
                        ))}
                </ul>

                <div><strong>Stakeholders: </strong></div>
                <ul>
                    {node_body.stakeholders &&
                        node_body.stakeholders?.map((stakeholder) => (
                            <li key={stakeholder}><span className={"entry-value"}>{stakeholder}</span></li>
                        ))}
                </ul>

                <div>{node_body.actingParties && <strong>Acting Parties: </strong>}</div>
                <ul>
                    {node_body.actingParties &&
                        node_body.actingParties?.map((party) => (
                            <li key={party}><span className={"entry-value"}>{party}</span></li>
                        ))}
                </ul>

                <div>{node_body.children && <strong>Child TXs:</strong>}
                <ul>
                {node_body.children &&
                    node_body.children?.map((node) => (
                        <div key={node} className="list-row">
                            <TransactionNode key={node} id={node} nodes={props.nodes}/>
                        </div>
                    ))}
                </ul>
                </div>
            </ul>
        </ul>
    );
};

export default TransactionNode;