import App from 'App';
import React, { useEffect, useState } from 'react'
import "../App.css"
import './SignUpLogin.css'
import { useHistory } from "react-router-dom";
import { CLEAN_LOGIN_SUCCEED, login } from 'store/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'utils/methods';
import SearchField from 'react-search-field';
import { searchCommunities} from 'store/actions/communityAction';
export default function SearchBar({setFunction}) {
  const dispatch = useDispatch();

 
  
  const onSearchClick =   (value) => {
    console.log(String(value));
    const response =   dispatch(searchCommunities({ text: value.trim() }));
    setFunction();
  }

  return (
    <SearchField  placeholder="Search..."
    onSearchClick={onSearchClick}
    onEnter={onSearchClick}
    classNames="test-class">
   
  </SearchField>
  )
}
