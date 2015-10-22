
import React, { Component, PropTypes } from 'react';
import mapValues from 'lodash/object/mapValues';

export default class EntityList extends Component {
  static propTypes = {
    termFrequencies: PropTypes.object.isRequired
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
        return <li key={arr[0]} className='list-group-item'>
          <span className='badge'>{arr[1]}</span>
          {arr[0]}
        </li>;
      });
  }

  render() {
    return (
      <ul className='list-group'>
        {this._sortTermFrequencies(this.props.termFrequencies)}
      </ul>
    );
  }

}
