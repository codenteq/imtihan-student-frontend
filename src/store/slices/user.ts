import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';
import {IUpdatePasswordForm, IUserResponse} from '@/types/IUser';

interface IUserState {
    isLoading: boolean;
    users: IUserResponse[];
    user: IUserResponse | null;
}

const initialState: IUserState = {
    isLoading: false,
    users: [],
    user: null,
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getUser: (state, action: PayloadAction<IUserResponse>) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        updateUser: (state, action: PayloadAction<IUserResponse>) => {
            state.isLoading = false;
            state.users = [
                action.payload,
                ...state.users.filter(user => user.id !== action.payload.id),
            ];
        },
        deleteUser: (state, action: PayloadAction<IUserResponse>) => {
            state.isLoading = false;
            if (state.users) {
                state.users = state.users.filter(
                    user => user.id !== action.payload.id,
                );
            }
        },
    },
});

export default slice.reducer;

export const getUser = () => async (dispatch: AppDispatch) => {
    await dispatch(slice.actions.startLoading());
    try {
        const response = await axios.get('/api/student/accounts/');
        dispatch(slice.actions.getUser(response.data));
    } finally {
        dispatch(slice.actions.endLoading());
    }
};

export const updateUser =
    (data: FormData | any) => async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(
                '/api/student/accounts/',
                data,
            );
            dispatch(slice.actions.updateUser(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };

export const deleteUser = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.delete('/api/student/accounts/');
        dispatch(slice.actions.deleteUser(response.data));
    } finally {
        dispatch(slice.actions.endLoading());
    }
};

export const updatePassword =
    (data: IUpdatePasswordForm) => async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(
                '/api/student/accounts/update-password/',
                data,
            );
            dispatch(slice.actions.updateUser(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
