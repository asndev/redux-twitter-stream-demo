import * as types from '../constants/ActionTypes';

const initialState = {
  tweets: [],
  termFrequencies: {}
};

const MIN_WORD_LENGTH = 3;

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

    let words = newTweet.text
      //.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .split(' ')
      .filter(w => {
        return w.length > MIN_WORD_LENGTH;
      });

    let newTermFrequencies = Object.assign({}, state.termFrequencies);
    words.forEach(word => {
      newTermFrequencies[word] = newTermFrequencies[word] || 0;
      newTermFrequencies[word]++;
    });

    return {
      ...state,
      tweets: [newTweet, ...oldTweets].splice(0, 5),
      termFrequencies: newTermFrequencies
    };

  default:
    return state;
  }

};
