import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import mapValues from 'lodash/object/mapValues';

import * as TweetActions from '../actions/TweetActions';
import { EntityList, TermFrequencyList } from '../components';

const socket = io();

@connect(state => ({
  tweetslist: state.tweetslist
}))
export default class TweetsApp extends Component {
  constructor(props, context) {
    super(props, context);

    this.actions = bindActionCreators(TweetActions, this.props.dispatch);

    let host = location.origin.replace(/^http/, 'ws');
    let socket = io.connect(host);
    this.state = {socket};

    this.fetchRecents();
  }

  fetchRecents() {
    this.state.socket.on('tweet', (data) => {
      this.actions.addTweet(data);
    });
  }

  render() {
    const {tweetslist} = this.props;

    return (
      <div className='container-fluid'>
        <div className='row'>
            <div className='col-xs-12 col-md-8'>
              <h2>Tweets for topic: #javascript</h2>
              <EntityList
                tweets={tweetslist.tweets}
                />
            </div>
            <div className='clox-xs-6 col-md-4'>
              <h2>Term Frequencies</h2>
              <TermFrequencyList
                termFrequencies={tweetslist.termFrequencies}
                />
            </div>
        </div>
      </div>
    );
  }
}
