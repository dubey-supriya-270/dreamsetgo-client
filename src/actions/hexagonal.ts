import { startLoading, stopLoading } from "./loading";
import { Actions as LoadingActions } from "../reducers/loading";
import axios from "axios";
import {
  ADD_HEXAGON,
  ADD_HEXAGON_ERROR,
  GET_HEXAGON_NEIGHBOR,
  GET_HEXAGON_NEIGHBOR_ERROR,
  DELETE_HEXAGON,
  DELETE_HEXAGON_ERROR,
} from "./Types";
import { Actions } from "../reducers/hexagonal";
import { API_URL } from "./serverConnection";

//Action Creator for add hexagon
export const addHexagon =
  (name: string, neighbour: string, border: number) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      //dispatch start loading
      startLoading(loadingDispatch);
      //fetch the results from the sign in API
      const result = await axios.post(`${API_URL}/`, {
        name,
        neighbour,
        border,
      });

      stopLoading(loadingDispatch);

      dispatch({
        type: ADD_HEXAGON,
        payload: result.data.data,
      });
    } catch (err: any) {
      //In case of error, stop loading
      stopLoading(loadingDispatch);
      //dispatch the error data
      dispatch({
        type: ADD_HEXAGON_ERROR,
        payload: err.response
          ? err?.response?.data?.message
          : "Failed to connect to the server",
      });
    }
  };

export const getNeighbor =
  (name: string) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      //dispatch start loading
      startLoading(loadingDispatch);
      //fetch the results from the sign in API
      const result = await axios.get(`${API_URL}/${name}/neighbours`);

      stopLoading(loadingDispatch);

      dispatch({
        type: GET_HEXAGON_NEIGHBOR,
        payload: result.data.data,
      });
    } catch (err: any) {
      //In case of error, stop loading
      stopLoading(loadingDispatch);
      //dispatch the error data
      dispatch({
        type: GET_HEXAGON_NEIGHBOR_ERROR,
        payload: err.response
          ? err?.response?.data?.message
          : "Failed to connect to the server",
      });
    }
  };

export const deleteNeighbor =
  (name: string) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      //dispatch start loading
      startLoading(loadingDispatch);
      //fetch the results from the sign in API
      const result = await axios.delete(`${API_URL}/${name}`);

      stopLoading(loadingDispatch);

      dispatch({
        type: DELETE_HEXAGON,
        payload: result.data.data,
      });
    } catch (err: any) {
      //In case of error, stop loading
      stopLoading(loadingDispatch);
      //dispatch the error data
      dispatch({
        type: DELETE_HEXAGON_ERROR,
        payload: err.response
          ? err?.response?.data?.message
          : "Failed to connect to the server",
      });
    }
  };
