import * as types from '../constants/ActionTypes';
import omit from 'lodash/object/omit';
import assign from 'lodash/object/assign';
import mapValues from 'lodash/object/mapValues';

const initialState = {
  entitylist: [1, 2, 3],
  entitiesById: {
    1: {
      id: 1,
      value: 'Foobar 1'
    },
    2: {
      id: 2,
      value: 'OMG Pew Pew Owl'
    },
    3: {
      id: 3,
      value: '9gag ftw'
    }
  }
};

export default function entitylist(state = initialState, action) {
  switch (action.type) {

  case types.ADD_ENTITY:
    const newId = state.entitylist[state.entitylist.length - 1] + 1;
    return {
      ...state,
      entitylist: state.entitylist.concat(newId),
      entitiesById: {
        ...state.entitiesById,
        [newId]: {
          id: newId,
          value: action.value
        }
      },
    };

  case types.CLICK_ENTITY:
    return {
      ...state,
      entitiesById: mapValues(state.entitiesById, (friend) => {
        return friend.id === action.id ?
          assign({}, friend, {isDone: !friend.isDone}) :
          friend;
      })
    };

  case types.DELETE_ENTITY:
    return {
      ...state,
      entitylist: state.entitylist.filter(id => id !== action.id),
      entitiesById: omit(state.entitiesById, action.id)
    };

  default:
    return state;
  }
}
