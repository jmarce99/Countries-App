import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIESBYID,
  ERROR,
  RESET_ERRORS,
  SET_COUNTRIESSORT,
  FETCH_COUNTRIESSORT,
} from "../actions/types";
const initialState = {
  countries: [],
  countrieById: [],
  countriesSort: [],
  selectedSort: "",
  activities: [],
  errors: 0,
};
//En nuestro estado guardaremos objetos con `todos`. Cada todo tendra: title, description, place, date, id y un status;
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES: {
      return { ...state, countries: action.payload.data };
    }
    case SET_COUNTRIESSORT: {
      return { ...state, selectedSort: action.payload };
    }
    case FETCH_COUNTRIESSORT: {
      return {
        ...state,
        countriesSort:
          state.selectedSort === "0" || state.selectedSort === "1"
            ? state.countries.sort((a, b) => {
                const isReversed = state.selectedSort === "0" ? 1 : -1;
                return isReversed * a.name.localeCompare(b.name);
              })
            : state.selectedSort === "2" || state.selectedSort === "3"
            ? state.countries.sort((a, b) => {
                const isReversed = state.selectedSort === "2" ? 1 : -1;
                return isReversed * a.population - b.population;
              })
            : state.countries,
      };
    }

    case FETCH_COUNTRIESBYID: {
      return { ...state, countrieById: action.payload.data, activities: action.payload.data.activities };
    }
    case ERROR: {
      return { ...state, errors: 1 };
    }
    case RESET_ERRORS: {
      return { ...state, errors: 0 };
    }
    default:
      return state;
  }
};

export default reducer;
