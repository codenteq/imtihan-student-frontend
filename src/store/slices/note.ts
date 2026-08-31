import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';
import { INoteForm, INoteResponse } from '@/types/INote';
import { IBasePaginate, IPaginate } from '@/types/IPaginate';

export interface INotesState {
    isLoading: boolean;
    notes: INoteResponse[];
    note: INoteResponse | null;
    meta: IBasePaginate | null;
}

const initialState: INotesState = {
    isLoading: false,
    notes: [],
    note: null,
    meta: null,
};

const slice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getNotes: (state, action: PayloadAction<IPaginate<INoteResponse>>) => {
            state.isLoading = false;
            state.notes = action.payload.data || [];
            state.meta = {
                current_page: action.payload.current_page,
                last_page: action.payload.last_page,
                total: action.payload.total,
                links: action.payload.links,
                from: action.payload.from,
                to: action.payload.to,
            };
        },
        getNote: (state, action: PayloadAction<INoteResponse>) => {
            state.isLoading = false;
            state.note = action.payload;
        },
        postNote: (state, action: PayloadAction<INoteResponse>) => {
            state.isLoading = false;
            state.notes = [action.payload, ...state.notes];
        },
        updateNote: (state, action: PayloadAction<INoteResponse>) => {
            state.isLoading = false;
            state.notes = [
                action.payload,
                ...state.notes.filter(note => note.id !== action.payload.id),
            ];
        },
        deleteNote: (state, action: PayloadAction<{ id: number }>) => {
            state.isLoading = false;
            state.notes = state.notes.filter(
                note => note.id !== action.payload.id,
            );
            if (state.meta) {
                state.meta.total = state.meta.total - 1;
            }
        },
    },
});

export default slice.reducer;

export function getNotes() {
    return async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/student/notes/');
            dispatch(slice.actions.getNotes(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}

export function getNote(id: number | string[]) {
    return async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/student/notes/' + id);
            dispatch(slice.actions.getNote(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}

export function postNote(data: INoteForm) {
    return async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/api/student/notes/', data);
            dispatch(slice.actions.postNote(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}

export function updateNote(id: number, data: INoteForm) {
    return async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put('/api/student/notes/' + id, data);
            dispatch(slice.actions.updateNote(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}

export function deleteNote(id: number) {
    return async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const res = await axios.delete('/api/student/notes/' + id);
            dispatch(slice.actions.deleteNote(res.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}
