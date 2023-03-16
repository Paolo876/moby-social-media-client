import { createSlice } from "@reduxjs/toolkit";
import { notificationInitialState } from "../initialState";
import { getNotifications, markAsRead, deleteAllNotifications, readAllNotifications, deleteById  } from "./notificationReducer";

const notificationSlice = createSlice({
    name: "notification",
    initialState: notificationInitialState,
    reducers: {
        reset: () => notificationInitialState,
        triggerSnackbar: (state, { payload }) => {
            state.snackbarData = payload;
        },
        clearSnackbar: (state) => {
            state.snackbarData = null;
        },
        addNotification: (state, { payload }) => {
            const updatedNotifications = state.notifications;
            const existingItem = updatedNotifications.find(item => item.id === payload.id)

            if(existingItem) {
                if(payload.type === "like" && !payload.isLiked){
                    updatedNotifications.splice(updatedNotifications.indexOf(updatedNotifications.find(item => parseInt(item.id) === parseInt((payload.id)))), 1)
                } else {
                    existingItem.updatedAt = payload.updatedAt
                    updatedNotifications.unshift(updatedNotifications.splice(updatedNotifications.indexOf(existingItem), 1)[0]) //move to first     
                }
                state.notifications = updatedNotifications;
            } else {
                if(!(payload.type === "like" && !payload.isLiked)) state.notifications = [payload, ...updatedNotifications]
            };
        },
        markAsReadByReferenceId: (state, { payload }) => {
            const updatedNotifications = state.notifications;
            for (const item of updatedNotifications) {
                if(item.ReferenceId === parseInt(payload)) item.isRead = true;
            }
            state.notifications = updatedNotifications;
        }
    }, 
    extraReducers: (builder) => {
        builder
        //getNotifications
        .addCase(getNotifications.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getNotifications.fulfilled, ( state, { payload }) => {
            state.notifications = payload;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(getNotifications.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
        //markAsRead
        .addCase(markAsRead.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(markAsRead.fulfilled, ( state, { payload }) => {
            const { id, isRead } = payload;
            const updatedNotifications = state.notifications;
            const existingItem = updatedNotifications.find(item => parseInt(item.id) === parseInt(id))
            if(isRead && existingItem) existingItem.isRead = true;
            state.notifications = updatedNotifications;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(markAsRead.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
        //deleteAllNotifications
        .addCase(deleteAllNotifications.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteAllNotifications.fulfilled, ( state, { payload }) => {
            const { isCleared } = payload;
            if(isCleared) state.notifications = []
            state.isLoading = false;
            state.error = null;
        })
        .addCase(deleteAllNotifications.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
        //readAllNotifications
        .addCase(readAllNotifications.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(readAllNotifications.fulfilled, ( state, { payload }) => {
            const { isAllRead } = payload;
            const updatedNotifications = state.notifications;

            if(isAllRead) updatedNotifications.forEach(item => item.isRead = true)
            state.notifications = updatedNotifications;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(readAllNotifications.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
        //deleteById
        .addCase(deleteById.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteById.fulfilled, ( state, { payload }) => {
            const { isDeleted, id } = payload;
            const updatedNotifications = state.notifications;
            const existingItem = updatedNotifications.find(item => parseInt(item.id) === parseInt(id))
            if(isDeleted && existingItem) {
                state.notifications = updatedNotifications.filter(item => parseInt(item.id) !== parseInt(id))
            } else {
                state.notifications = updatedNotifications;
            }
            state.isLoading = false;
            state.error = null;
        })
        .addCase(deleteById.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
    }
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
