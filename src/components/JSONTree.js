import React from 'react';
import Tree from 'react-d3-tree';
import { useCenteredTree } from "./tree-helpers";
import './tree.css';

//https://www.npmjs.com/package/react-d3-tree

const containerStyles = {
    width: "1000px",
    height: "400px",
    border: "2px solid gray"
};

const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
        <rect width="20" height="20" x="-10" onClick={toggleNode} />
        <text fill="black" strokeWidth="1" x="-5" dy="-5">
            {nodeDatum.name}
        </text>
        {nodeDatum.attributes?.type && (
            <text fill="black" x="20" dy="0" strokeWidth="1">
                Type: {nodeDatum.attributes?.type}
            </text>
        )}
        {nodeDatum.attributes?.template && (
            <text fill="black" x="20" dy="15" strokeWidth="1">
                Template: {nodeDatum.attributes?.template}
            </text>
        )}
        {nodeDatum.attributes?.choice && (
            <text fill="black" x="20" dy="30" strokeWidth="1">
                Choice: {nodeDatum.attributes?.choice}
            </text>
        )}
    </g>
);

const renderChildren = (nodeId, nodes) => {
    const node = nodes.find(node => node.nodeId === nodeId);

    var tmpNode = {name: nodeId, attributes: {}, children: []};
    var node_type = Object.keys(node.v1)[0];

    var node_body = null;
    var children = null;

    switch (node_type) {
        case 'create':
            if (node.v1.create.children) { children = node.v1.create.children};
            node_body = node.v1.create;
            tmpNode.attributes['type'] = node_type;
            tmpNode.attributes['template'] = node_body.templateId.entityName;
            break;
        case 'exercise':
            if (node.v1.exercise.children) {children = node.v1.exercise.children};
            node_body = node.v1.exercise;
            tmpNode.attributes['type'] = node_type;
            tmpNode.attributes['template'] = node_body.templateId.entityName;
            tmpNode.attributes['choice'] = node_body.choiceId;
            break;
        default:
            console.log("ERROR - Unknown type");
    }

    children && (tmpNode.children = children.map((child) => {
        return(renderChildren(child, nodes))
    }));

    return tmpNode;
}

const renderTree = (transaction) => {
    var tmpTree = {
        name: 'TX Root',
        children: [
        ]
    }
    tmpTree.children = transaction.roots?.map((node) => ( renderChildren(node, transaction.nodes)));

    return tmpTree;
}

const myCustomPathFunc = ({ source, target }) => {
    // Calculate custom link path, e.g., connecting to the top of the node
    const startX = source.y;
    const startY = source.x + 10;
    const endX = target.y;
    const endY = target.x + 10; // Shift the end point upwards

    return `M${startX},${startY}L${endX},${endY}`;
};

export default function JSONTree(props) {
    const [dimensions, translate, containerRef] = useCenteredTree();

    const JSONTreeData = renderTree(props.transaction);

    return (
        <div style={containerStyles} ref={containerRef}>
            <Tree
                data={JSONTreeData}
                dimensions={dimensions}
                translate={translate}
                renderCustomNodeElement={renderRectSvgNode}
                orientation="horizontal"
                pathFunc={myCustomPathFunc}
            />
        </div>
    );
}




