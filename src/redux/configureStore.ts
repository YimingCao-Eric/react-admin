/**
 * Redux Store Configuration
 * 
 * Configures and creates the Redux store for the application.
 * Uses the setUserReducer to manage the application state.
 */
import {createStore} from "redux";
import {setUserReducer} from "./reducers/setUserReducer";

/**
 * Creates and configures the Redux store
 * @returns A configured Redux store instance
 */
export const configureStore = () => {
    return createStore(setUserReducer)
}