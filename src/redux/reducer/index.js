const initialState = {
  Dogs: [],
  AllDogs: [],
  Temperaments: [],
  orderFilter: {
    order: "all", // (TEMPORAL)
    filterTemps: "all",
    FilterApiDB: "all",
  },
};
function RootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        Dogs: action.payload,
        AllDogs: action.payload,
      };
    case "GET_DOGS_NAME":
      return {
        ...state,
        Dogs: [action.payload],
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        Temperaments: action.payload,
      };
    case "FILTER_BY_TEMPERAMENT": //FILTRO TODOS LOS PERROS, DSP POR LOS PERROS, Y DSP ORDENO.
      const AllDogs = state.Dogs;
      let temperament = action.payload;

      const TemperamentFiltered =
        temperament === "all"
          ? AllDogs
          : AllDogs.filter((el) => {
              return el.temperament?.find((el2) => el2.name == temperament); //PENDIENTE ARREGLAR EL SORT Y EL FILTER JUNTOS.(TEMPORAL)
            });
      return {
        ...state,
        Dogs: TemperamentFiltered,
        orderFilter: {
          ...state.orderFilter,
          filterTemps: temperament,
        },
      };
    case "FILTER_CREATED":
      const AllDogs2 = state.AllDogs;
      const FilterDogs =
        action.payload === "created"
          ? AllDogs2.filter((el) => el.createdByDB)
          : AllDogs2.filter((el) => !el.createdByDB);
      return {
        ...state,
        Dogs: action.payload === "all" ? state.AllDogs : FilterDogs,
        orderFilter: {
          ...state.orderFilter,
          FilterApiDB: action.payload,
        },
      };

    case "ORDER":
      let sort = [];
      let order = action.payload;
      if (order == "all")
        return {
          ...state,
          orderFilter: {
            ...state.orderFilter,
            order: "all",
          },
        };
      if (order == "asc") {
        sort = state.Dogs.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      }
      if (order == "dsc") {
        sort = state.Dogs.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }
      if (order == "minwgt") {
        sort = state.Dogs.sort((a, b) => {
          return (
            a.weight.metric.replace(/\s+/g, "").split("-")[1] -
            b.weight.metric.replace(/\s+/g, "").split("-")[1]
          );
        });
      }
      if (order == "maxwgt") {
        sort = state.Dogs.sort(
          (a, b) =>
            b.weight.metric.replace(/\s+/g, "").split("-")[1] -
            a.weight.metric.replace(/\s+/g, "").split("-")[1]
        );
      }
      return {
        ...state,
        Dogs: [...sort],
        orderFilter: {
          ...state.orderFilter,
          order: order,
        },
      };
    default:
      return state;
  }
}

export default RootReducer;
