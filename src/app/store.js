import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import videoSliceReducer from "../features/videos/videoSlice";
import quizSliceReducer from "../features/quiz/quizSlice";
import assignmentsSliceReducer from "../features/assignments/assignmentsSlice";
import quizMarkSliceReducer from "../features/quizMark/quizMarkSlice";
import assignmentMarkSliceReducer from "../features/assignmentMark/assignmentMarkSlice";
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        video: videoSliceReducer, 
        quiz: quizSliceReducer,
        quizMark: quizMarkSliceReducer,
        assignments: assignmentsSliceReducer,
        assignmentMark: assignmentMarkSliceReducer
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware),
});
