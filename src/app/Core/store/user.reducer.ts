import { createReducer, on } from "@ngrx/store";
import { loadUsers, loadUsersSuccess, loadUsersFailure } from "./user.actions";

interface User {
  id: number;
  name: string;
  // Add other user properties as needed
}

// Define the interface for your state
export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  users: [], // Type is now User[]
  loading: false,
  error: null
};

const _userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
