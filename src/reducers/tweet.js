import { combineReducers } from 'redux';

const initialState = {
  tweets: [],
  termFrequencies: {}
};

const MIN_WORD_LENGTH = 3;

const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      let newTweet = action.data;

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
        tweets: [newTweet, ...state.tweets],
        termFrequencies: newTermFrequencies
      };

    default:
      return state;
  }
};

const tweetStore = combineReducers({
  tweets: tweetReducer
});

export default tweetStore;