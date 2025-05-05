//import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import JSONData from './data.json';
import MetaData from './components/MetaData';
import Transaction from './components/Transaction';
import RawJSONDisplay from './components/RawJSONDisplay';
import JSONLoader from "./components/JSONLoader";
import JSONTree from "./components/JSONTree";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      json: JSONData,
      isValid: true
    }
  }

  hashUpdate = (json_hash) => {
    if (json_hash === '') {
      this.setState({json: '', isValid: false});
    } else {
      const json = JSON.parse(atob(json_hash));
      this.setState({json})
    }
  }

  render() {
    const metadata = this.state.json.metadata;
    const transaction = this.state.json.transaction;
    return (
      <div>
        <div className="App">
          <h2>Canton - Submitted Transaction Viewer</h2>
          <p>This displays a summarised transaction tree for your review. To see the raw transaction tree JSON, see
            bottom of page</p>
          <JSONLoader onJSONChange={this.hashUpdate}/>
          <p/>
          <div className="file-input-section">
            <label htmlFor="configFile">Select Configuration file (optional, JSON):</label>
            <input type="file" id="configFile" accept=".json"/>
            <div id="configStatus" className="status-message">No config file loaded. Using defaults.</div>
          </div>
          <p/>
          <div className="box-with-outline">
            {this.state.isValid && <JSONTree transaction={transaction}/> }
            {this.state.isValid && <Transaction transaction={transaction}/>}
            {this.state.isValid && <MetaData metadata={metadata}/>}
            {!this.state.isValid && <div>WARNING: JSON Is not valid!</div>}
            <RawJSONDisplay json={this.state.json}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

