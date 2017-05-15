import { connect } from 'react-redux'
import React, { Component } from 'react';
import io from 'socket.io-client';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    let socket = io.connect(`ws://localhost:31337`);
    this.state = {socket};

    this.fetchRecents();
  }

  fetchRecents() {
    this.state.socket.on('tweet', (data) => {
      console.log('Received new tweet data: ');
      this.props.onNewTweet(data);
    });
  }

  _sortTermFrequencies(termFrequencies) {
    return Object.keys(termFrequencies)
      .map(key => {
        return [key, termFrequencies[key]];
      })
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .slice(0, 15)
      .map(arr => {
        return <li key={arr[0]}>
          {arr[0]}
          <span className='badge'>{arr[1]}</span>
        </li>;
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Term Frequencies</h2>
          <ul>
            {this._sortTermFrequencies(this.props.data.termFrequencies)}
          </ul>
        </div>
        <div className="App-intro">
          <h2>Current Tweets</h2>
          <ul>
            {
              this.props.data.tweets.map(e => {
                return <li key={e.id_str}>
                  {e.text}<br/><small>@{e.user.screen_name}</small>
                </li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.tweets
});

const mapDispatchToProps = (dispatch) => ({
  onNewTweet: (data) => {
    dispatch({
      type: 'ADD',
      data
    });
  }
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
