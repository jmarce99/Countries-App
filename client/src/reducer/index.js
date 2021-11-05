import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIESBYID,
  ERROR,
  RESET_ERRORS,
  SET_COUNTRIESSORT,
  FETCH_COUNTRIESSORT,
  FETCH_ACTIVITY,
  FILTER_BY_ACTIVITY,
  SET_COUNTRIESFILTER
} from "../actions/types";
const initialState = {
  countries: [],
  countriesAll:[],
  countrieById: [],
  countriesSort: [],
  selectedSort: "",
  activities: [],
  selectedFilter: "",
  errors: 0,
};
//En nuestro estado guardaremos objetos con `todos`. Cada todo tendra: title, description, place, date, id y un status;
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES: {
      return { ...state, countries: action.payload.data, countriesAll: state.selectedFilter !== "" ? state.countries.filter((country) => country.continents.toLowerCase() === state.selectedFilter) : action.payload.data, countrieById: []  };
    }
    case SET_COUNTRIESSORT: {
      return { ...state, selectedSort: action.payload };
    }
    case SET_COUNTRIESFILTER: {
      return { ...state, selectedFilter: action.payload };
    }
    
    case FETCH_COUNTRIESSORT: {
      return {
        ...state,
        countriesSort:
          state.selectedSort === "0" || state.selectedSort === "1"
            ? state.countriesAll.slice().sort((a, b) => {
                const isReversed =
                  state.selectedSort === "0"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
                return isReversed;
              })
            : state.selectedSort === "2" || state.selectedSort === "3"
            ? state.countriesAll.slice().sort((a, b) => {
                const isReversed =
                  state.selectedSort === "2"
                    ? a.population - b.population
                    : b.population - a.population;
                return isReversed;
              })
            : state.countriesAll,
      };
    }

    case FETCH_COUNTRIESBYID: {
      return {
        ...state,
        countrieById: action.payload.data,
        activities: action.payload.data.activities,
      };
    }

    case FETCH_ACTIVITY: {
      return {
        ...state,
        activities: action.payload
          .filter((activity) => activity[0])
          .map((activity) => activity[0]),
      };
    }

    case FILTER_BY_ACTIVITY: {
      if (action.payload !== "all") {
        const activitySelected = state.activities.filter(
          (activity) => activity.name === action.payload
        );
        const countriesWithActivitySelected = activitySelected.map(
          (activity) => activity.country_activity.countryId
        );
        const countriesFilter = [];
        countriesWithActivitySelected.forEach((elemento) => {
          countriesFilter.push(
            state.countries.filter((country) => country.id === elemento)
          );
        });
        return {
          ...state,
          countriesSort: countriesFilter.map((country) => country[0]),
        };
      } else
        return {
          ...state,
          countriesSort: state.countries,
        };
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
