import axios from "axios";
import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIESBYID,
  ERROR,
  RESET_ERRORS,
  SET_COUNTRIESSORT,
  FETCH_COUNTRIESSORT,
  FETCH_ACTIVITY,
  FILTER_BY_ACTIVITY,
  SET_COUNTRIESFILTER,
  // FETCH_COUNTRIESFILTERS
} from "./types.js";

export const fetchCountries = (name, continent) => {
  let continentConvert = "";
  continent === undefined || continent === ""
    ? (continentConvert = "all")
    : (continentConvert = continent);

  //console.log("Continent", continentConvert, "Name", name);
  return function (dispatch) {
    if (name) {
      axios
        .get(
          `http://localhost:3001/countries?continent=${continentConvert}&name=${name}`
        )
        .then((countries) => {
          dispatch({
            type: FETCH_COUNTRIES,
            payload: countries,
          });
          dispatch({
            type: FETCH_COUNTRIESSORT,
          });
        })
        .catch((error) => {
          dispatch({
            type: ERROR,
            payload: error,
          });
        });
    } else {
      axios
        .get(`http://localhost:3001/countries?continent=${continentConvert}`)
        .then((countries) => {
          dispatch({
            type: FETCH_COUNTRIES,
            payload: countries,
          });
          dispatch({
            type: FETCH_COUNTRIESSORT,
          });
          dispatch({
            type: FETCH_ACTIVITY,
            payload: countries.data.map((country) => country.activities),
          });
        })
        .catch((error) => {
          dispatch({
            type: ERROR,
            payload: error,
          });
        });
    }
  };
};

export const setCountriesSort = (sort) => {
  return function (dispatch) {
    dispatch({
      type: SET_COUNTRIESSORT,
      payload: sort,
    });
  };
};

export const fetchCountriesSort = () => {
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

export function setCountriesFilter(filter) {
  return function (dispatch) {
    dispatch({
      type: SET_COUNTRIESFILTER,
      payload: filter,
    });
  };
}

export function filterByActivity(payload) {
  return {
    type: FILTER_BY_ACTIVITY,
    payload,
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
      .catch((error) => {});
  };
}
