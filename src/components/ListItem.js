import React, { Component, PropTypes } from 'react';
import styles from './ListItem.css';

let style = {
  item: {
    listStyle: 'none',
    padding: '20px 10px 20px 20px',
    borderBottom: '1px solid #E3E3E3',
  },
  itemRow: {
  }
};

export default class ListItem extends Component {
  static propTypes = {
    // Properties
    tweet: PropTypes.object.isRequired
    // Callbacks
  }

  render() {
    return <a href='#'
         style={style.item} className={'list-group-item ' +
           (this.props.tweet.isNew ? styles.newItem : '')}>
        <h4 className='list-group-item-heading'>@{this.props.tweet.user.screen_name}</h4>
        <blockquote>
            <p className='list-group-item-text'>{this.props.tweet.text}</p>
        </blockquote>
      </a>;
  }

}
