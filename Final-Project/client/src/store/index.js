import { combineReducers } from 'redux'
import { 
  configureStore, 
  createSerializableStateInvariantMiddleware, 
  isPlain,
} from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  createTransform,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Iterable } from 'immutable'
import onlineUsersReducer from '../features/onlineUsers/onlineUsersSlice'
import messagesReducer from '../features/messages/messagesSlice'

const Flatted = require('flatted');
const rootReducer = combineReducers({
  onlineUsers: onlineUsersReducer,
  messages: messagesReducer,
})
export const transformCircular = createTransform(
  (inboundState, key) => Flatted.stringify(inboundState),
  (outboundState, key) => Flatted.parse(outboundState),
)

// Redux-persit
const persistConfig = {
  key: 'root',
  storage,
  transforms: [transformCircular]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value: any) =>
  Iterable.isIterable(value) || isPlain(value)

const getEntries = (value: any) =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value)

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
  ignoredActions: [
    "persist/FLUSH", 
    "persist/REHYDRATE", 
    "persist/PAUSE", 
    "persist/PERSIST", 
    "persist/PURGE", 
    "persist/REGISTER", 
    "redux-persist/createPersistoid",
    "onlineUsers/addConnection",
  ],
})

const store =  configureStore({
  reducer: persistedReducer,
  middleware: [serializableMiddleware],
})
export const persistor = persistStore(store);
export default store
