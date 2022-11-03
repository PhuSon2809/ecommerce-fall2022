import { combineReducers } from "redux";
import accountReducer from '../../pages/Authenticated/AccountSlice'
import productsReducer from '../../pages/ViewProducts/ProductsSlice'

const rootReducer = {
    account: accountReducer,
    products: productsReducer,
};

export default rootReducer;