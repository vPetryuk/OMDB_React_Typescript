import React, { useState } from "react";
import SearchStyle from "./Search.module.css"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
type IProps={
  search:(searchValue:string) => void
}

const Search: React.FC<IProps> = ({search}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  
  const handleSearchInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }


  const callSearchFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    search(searchValue);
    setSearchValue("")
  }

  return (
    <Paper
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
  >
    <IconButton sx={{ p: '10px' }} aria-label="menu">
      <MenuIcon />
    </IconButton>
    <InputBase
    value={searchValue}
    onChange={handleSearchInputChanges}
    type="text"
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search your movie"
      inputProps={{ 'aria-label': 'search google maps' }}
    />
    <IconButton onClick={callSearchFunction} type="submit" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
   
  </Paper>
    );
}

export default Search;