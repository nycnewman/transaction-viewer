import React from 'react';
import TransactionNode from './TransactionNode';

const Transaction = (props) => {
    return (
        <div className="box-with-outline">
            <label><strong>Transaction (LF Version {props.transaction.version}): </strong></label>
            <ul className="col-md-4 list-group">
                <ul>
                    {props.transaction.roots &&
                        props.transaction.roots?.map((root) => (
                            <div key={root} className="list-row">
                                <TransactionNode key={root} id={root} nodes={props.transaction.nodes}/>
                            </div>
                        ))}
                </ul>
            </ul>
        </div>
    );
};

export default Transaction;