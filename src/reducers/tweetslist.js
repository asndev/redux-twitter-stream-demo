import * as types from '../constants/ActionTypes';

const initialState = {
  tweets: [],
  termfrequencies: {}
};

export default function tweetslist(state = initialState, action) {

  switch (action.type) {

  case types.ADD_TWEET:
    let newTweet = action.value;
    newTweet.isNew = true;

    let oldTweets = state.tweets.map(t => {
      var copy = t;
      copy.isNew = false;
      return copy;
    });

    let newTFs = state.termfrequencies;
    let newText = newTweet.text;

    newText.split(' ').forEach(word => {
      if (newTFs[word]) {
        newTFs[word]++;
      } else {
        newTFs[word] = 1;
      }
    });

    let sortedKeys = Object.keys(newTFs).sort(function(a, b) {
      return newTFs[b] - newTFs[a];
    });

    let tfsArraySorted = [];
    sortedKeys.splice(0, 15).forEach(sk => {
      tfsArraySorted.push([sk, newTFs[sk]]);
    });

    return {
      ...state,
      tweets: [newTweet, ...oldTweets].splice(0, 5),
      tfsArraySorted
    };

  default:
    return state;
  }

};
