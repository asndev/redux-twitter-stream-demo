import * as types from '../constants/ActionTypes';

export function addTweet(value) {
  return {
    type: types.ADD_TWEET,
    value
  };
}
