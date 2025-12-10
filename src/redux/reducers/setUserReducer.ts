/**
 * Redux Reducer: setUserReducer
 * 
 * Reducer that manages the user state in the Redux store.
 * Handles the SET_USER action to update the current user.
 */
import {User} from "../../models/user"

/**
 * Reducer function that manages user state
 * @param state - The current state, defaults to an object with an empty User
 * @param action - The action object containing type and user data
 * @returns The new state with updated user information
 */
export const setUserReducer = (state = {user: new User()}, action: {type: string, user: User}) => {
    switch (action.type) {
        case "SET_USER":
            return {...state, user: action.user}
        default:
            return state;
    }
}