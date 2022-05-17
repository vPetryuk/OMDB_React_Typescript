import "./App.css";
import React, { useEffect, useReducer } from "react";
import NavBar from "./components/NavBar/NavBar";
import NavBarS from "./components/NavBar/NavBar.module.css";
import Movie from "./components/Movie/Movie";
import Search from "./components/NavBar/Search/Search";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
const OMDB_API_URL = "https://www.omdbapi.com/?s=man&apikey=d5b00c77";

type movietype = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

interface initialStateType {
  loading: boolean;
  movies: Array<movietype>;
  errorMessage: string | null;
  searchValue: string;
}

const initialState: initialStateType = {
  loading: true,
  movies: [],
  errorMessage: null,
  searchValue: "Movies",
};

type actiontype =
  | { type: "SEARCH_MOVIES_REQUEST"; payload: string }
  | { type: "SEARCH_MOVIES_FAILURE"; error: string }
  | { type: "SEARCH_MOVIES_SUCCESS"; payload: Array<movietype> };

const reducer = (state: initialStateType, action: actiontype) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        searchValue: action.payload,
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(OMDB_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search,
        });
      });
  }, []);

  const search = (searchValue: string):void => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
      payload: searchValue,
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search,
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error,
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <NavBar text={state.searchValue} search={search} />
      <div className={NavBarS.center}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {loading && !errorMessage ? (
            <span>loading... </span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            movies.map((movie: movietype, index: number) => (
              <Grid item xs={3} alignItems="center">
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </div>
  );
};

export default App;
