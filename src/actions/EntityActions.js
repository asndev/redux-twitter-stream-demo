import * as types from '../constants/ActionTypes';

export function addEntity(value) {
  return {
    type: types.ADD_ENTITY,
    value
  };
}

export function deleteEntity(id) {
  return {
    type: types.DELETE_ENTITY,
    id
  };
}

export function clickEntity(id) {
  return {
    type: types.CLICK_ENTITY,
    id
  };
}
