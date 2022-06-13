import {createStore}  from 'redux'
import connected from './Reducer/connectReducer';
import { persistCombineReducers } from 'redux-persist'
import { AsyncStorage } from 'react-native';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}



export default createStore(persistCombineReducers(persistConfig, {connected}))