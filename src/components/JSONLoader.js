import React, { Component } from 'react';

class JSONLoader extends Component {
    constructor(props) {
        super(props);

        this.state = { json: '' };
    }

    render() {
        return (
            <div className="search-bar">
                Enter JSON in Base 64: <input className={"App-json-input"}
                    value={this.state.json}
                    onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }

    onInputChange = (json) =>  {
        this.setState({json});
        this.props.onJSONChange(json);
    }
}

export default JSONLoader;
