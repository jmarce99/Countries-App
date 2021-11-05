import axios from "axios";
import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIESBYID,
  ERROR,
  RESET_ERRORS,
  SET_COUNTRIESSORT,
  FETCH_COUNTRIESSORT,
} from "./types.js";

export const fetchCountries = (name) => {
  return function (dispatch) {
    if (name) {
      axios
        .get(`http://localhost:3001/countries?name=${name}`)
        .then((countries) => {
          dispatch({
            type: FETCH_COUNTRIES,
            payload: countries,
          });
          dispatch({
            type: FETCH_COUNTRIESSORT,
          })
        })
        .catch((error) => {
          dispatch({
            type: ERROR,
            payload: error,
          });
        });
    } else {
      axios
        .get(`http://localhost:3001/countries`)
        .then((countries) => {
          dispatch({
            type: FETCH_COUNTRIES,
            payload: countries,
          });
          dispatch({
            type: FETCH_COUNTRIESSORT,
          })
        })
        .catch((error) => {
          dispatch({
            type: ERROR,
            payload: error,
          });
        })
    }
  };
};

export const setCountriesSort = (sort) => {
  return function (dispatch) {
    dispatch({
      type: SET_COUNTRIESSORT,
      payload: sort
    });
  };
};

export const  fetchCountriesSort =  () => {
  return function (dispatch) {
    dispatch({
      type: FETCH_COUNTRIESSORT,
    });
  };
};



export function resetErrors() {
  return function (dispatch) {
    dispatch({
      type: RESET_ERRORS,
    });
  };
}

export function fetchCountriesById(id) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries/${id}`)
      .then((countrie) => {
        dispatch({
          type: FETCH_COUNTRIESBYID,
          payload: countrie,
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR,
          payload: error,
        });
      });
  };
}
/* 
export const searchCountries = () => async (dispatch, getState) => {
  try {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
      dispatch({
          type: FETCH_COUNTRIES,
          payload: res.data.results
      })
  } catch (error) {
    console.log(error);
  }
}; */
