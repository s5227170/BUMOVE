import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import UIReducer from './reducers/UIReducer';
import offerReducer from './reducers/offerReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    UI: UIReducer,
    offers: offerReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;