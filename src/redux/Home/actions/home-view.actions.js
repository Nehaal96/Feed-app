import constants from '../constants'

export const addData = data => ({
    type: constants.ADD_DATA,
    data,
});
  
export const addDataSuccess = data => ({
    type: constants.ADD_DATA_SUCCESS,
    data,
});

export const addDataFailure = error => ({
    type: constants.ADD_DATA_FAILURE,
    error,
});
