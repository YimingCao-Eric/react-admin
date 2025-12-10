/**
 * Redux Action: setUser
 * 
 * Action creator for setting the current user in the Redux store.
 * Used to update the authenticated user's information throughout the application.
 */
import {User} from "../../models/user";

/**
 * Creates an action to set the current user in the Redux store
 * @param user - The User object to set as the current user
 * @returns An action object with type 'SET_USER' and the user payload
 */
export const setUser = (user: User) => {
    return {
        type: 'SET_USER',
        user
    }
}