import React, { Component, PropTypes } from 'react';
import mapValues from 'lodash/object/mapValues';

import ListItem from './ListItem';

export default class EntityList extends Component {
  static propTypes = {
    tweets: PropTypes.array.isRequired
  }

  render() {
    return <div className='list-group'>
        {
          this.props.tweets.map(tweet => {
            return <ListItem
              key={tweet.id_str}
              tweet={tweet}
            />;
          })
        }
    </div>;
  }

}
