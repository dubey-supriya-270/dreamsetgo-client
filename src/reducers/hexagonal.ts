import {
  ADD_HEXAGON,
  ADD_HEXAGON_ERROR,
  GET_HEXAGON_NEIGHBOR,
  GET_HEXAGON_NEIGHBOR_ERROR,
  DELETE_HEXAGON,
  DELETE_HEXAGON_ERROR,
} from "../actions/Types";

//Actions type to accept either SIGN_IN, ADD_USER, SIGN_IN_ERROR or ADD_USER_ERROR types with a payload
//or CLEAR_ERRORS or LOGOUT types without a payload
export type Actions =
  | {
      type: typeof ADD_HEXAGON;
      payload: string;
    }
  | {
      type: typeof GET_HEXAGON_NEIGHBOR;
      payload: any;
    }
  | {
      type: typeof ADD_HEXAGON_ERROR;
      payload: string;
    }
  | {
      type: typeof GET_HEXAGON_NEIGHBOR_ERROR;
      payload: string;
    }
  | {
      type: typeof DELETE_HEXAGON;
      payload: string;
    }
  | {
      type: typeof DELETE_HEXAGON_ERROR;
      payload: string;
    };
//UserInterface to define the State type for the state of the reducer
interface HexagonalInterface {
  addHexagonalMessage: string;
  addHexagonalMessageError: string;
  getNeighbor: any;
  getNeighborError: string;
  deleteHexagonMessage: string;
  deleteHexagonError: string;
}

//State type for defining the state of the reducer
export type State = HexagonalInterface;

//Initial state of the reducer of type State
export const initialState: State = {
  addHexagonalMessage: "",
  addHexagonalMessageError: "",
  getNeighbor: [],
  getNeighborError: "",
  deleteHexagonMessage: "",
  deleteHexagonError: "",
};

//Hexagon reducer which takes a state and an action param
export const Hexagon = (state: State = initialState, action: Actions) => {
  //switch between action.type
  switch (action.type) {
    //if action is of type SIGN_IN or ADD_USER return the state by setting token to the payload
    case ADD_HEXAGON:
      return {
        ...state,
        addHexagonalMessage: action.payload,
      };
    case ADD_HEXAGON_ERROR:
      return {
        ...state,
        addHexagonalMessageError: action.payload,
      };
    case GET_HEXAGON_NEIGHBOR:
      return {
        ...state,
        getNeighbor: action.payload,
      };

    case GET_HEXAGON_NEIGHBOR_ERROR:
      return {
        ...state,
        getNeighborError: action.payload,
      };

    case DELETE_HEXAGON:
      return {
        ...state,
        deleteHexagonMessage: action.payload,
      };

    case DELETE_HEXAGON_ERROR:
      return {
        ...state,
        deleteHexagonError: action.payload,
      };

    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
