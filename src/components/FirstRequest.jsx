import React, {useEffect} from 'react';
import { AUTH_TOKEN } from '../http/tokenLogin';
import { useDispatch } from "react-redux";
import { fetchAuthMe } from '../store/auth';
const FirstRequest = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (AUTH_TOKEN) {
          dispatch(fetchAuthMe());
        }
      }, []);
};

export default FirstRequest;