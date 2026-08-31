import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';
import {
    IClassScheduleForm,
    IClassScheduleResponse,
} from '@/types/IClassSchedule';
import { IBasePaginate, IPaginate } from '@/types/IPaginate';

export interface IClassSchedulesState {
    isLoading: boolean;
    classSchedules: IClassScheduleResponse[];
    classSchedule: IClassScheduleResponse | null;
    meta: IBasePaginate | null;
}

const initialState: IClassSchedulesState = {
    isLoading: false,
    classSchedules: [],
    classSchedule: null,
    meta: null,
};

const slice = createSlice({
    name: 'classSchedule',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getClassSchedules: (
            state,
            action: PayloadAction<IPaginate<IClassScheduleResponse>>,
        ) => {
            state.isLoading = false;
            state.classSchedules = action.payload.data || [];
            state.meta = {
                current_page: action.payload.current_page,
                last_page: action.payload.last_page,
                total: action.payload.total,
                links: action.payload.links,
                from: action.payload.from,
                to: action.payload.to,
            };
        },
        getClassSchedule: (
            state,
            action: PayloadAction<IClassScheduleResponse>,
        ) => {
            state.isLoading = false;
            state.classSchedule = action.payload;
        },
        postClassSchedule: (
            state,
            action: PayloadAction<IClassScheduleResponse>,
        ) => {
            state.isLoading = false;
            state.classSchedules = [action.payload, ...state.classSchedules];
        },
        updateClassSchedule: (
            state,
            action: PayloadAction<IClassScheduleResponse>,
        ) => {
            state.isLoading = false;
            state.classSchedules = [
                action.payload,
                ...state.classSchedules.filter(
                    classSchedule => classSchedule.id !== action.payload.id,
                ),
            ];
        },
        deleteClassSchedule: (state, action: PayloadAction<{ id: number }>) => {
            state.isLoading = false;
            state.classSchedules = state.classSchedules.filter(
                classSchedule => classSchedule.id !== action.payload.id,
            );
            if (state.meta) {
                state.meta.total = state.meta.total - 1;
            }
        },
    },
});

export default slice.reducer;

export function getClassSchedules() {
    return async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/student/class-schedules/');
            dispatch(slice.actions.getClassSchedules(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}

export function getClassSchedule(id: number | string[]) {
    return async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(
                '/api/student/class-schedules/' + id,
            );
            dispatch(slice.actions.getClassSchedule(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}

export function postClassSchedule(data: IClassScheduleForm) {
    return async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(
                '/api/student/class-schedules/',
                data,
            );
            dispatch(slice.actions.postClassSchedule(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}

export function updateClassSchedule(id: number, data: IClassScheduleForm) {
    return async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(
                '/api/student/class-schedules/' + id,
                data,
            );
            dispatch(slice.actions.updateClassSchedule(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}

export function deleteClassSchedule(id: number) {
    return async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const res = await axios.delete(
                '/api/student/class-schedules/' + id,
            );
            dispatch(slice.actions.deleteClassSchedule(res.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}
