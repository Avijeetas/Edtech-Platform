import { apiSlice } from "../api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizMarks: builder.query({
          query: () => '/quizMark',
        }),
        getQuizMarkById: builder.query({
          query: (id) => `/quizMark/${id}`,
        }),
        getQuizMarkByVideoId: builder.query({
            query:(videoId) => `quizMark?video_id=${videoId}`
        }),
        getQuizMarkByVideoIdAndStudentId: builder.query({
          query:({videoId, studentId}) => `quizMark?video_id=${videoId}&student_id=${studentId}`
      }),
        createQuizMark: builder.mutation({
          query: (newQuizMark) => ({
            url: '/quizMark',
            method: 'POST',
            body: newQuizMark,
          }),
          async onQueryStarted(arg, {queryFulfilled, dispatch}){
            try{
                const {data: quiz} = await queryFulfilled;

                dispatch(
                    apiSlice.util.updateQueryData("getQuizMarks",
                    undefined,
                    (draft)=>{
                        draft.push(quiz);
                    }
                    )
                )
            } catch(err){
                // console.log(err);
            }
        }
        }),

        updateQuizMark: builder.mutation({
          query: ({ id, updatedQuiz }) => ({
            url: `/quizMark/${id}`,
            method: 'PUT',
            body: updatedQuiz,
          }),
                              
          async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
            try {
              const { data: updatedQuiz } = await queryFulfilled;
              // console.log(updatedQuiz);
        
              // Update cache for getquiz
              dispatch(
                apiSlice.util.updateQueryData("getQuizMarkById",
                  id.toString(),
                  (draft) => Object.assign(draft, updatedQuiz)
                )
              );
        
              // Update cache for getAllquizs
              dispatch(
                apiSlice.util.updateQueryData("getQuizMarks",
                  undefined,
                  (draft) => {
                    const QuizIndex = draft.findIndex(quiz => quiz.id == id);
                    if (QuizIndex !== -1) {
                      draft[QuizIndex] = updatedQuiz;
                    }
                  }
                )
              );
            } catch (err) {
              // console.log(err);
            }
          }
        }),
        deleteQuiz: builder.mutation({
          query: (id) => ({
            url: `/quizMark/${id}`,
            method: 'DELETE',
          }),
        }),
      }),
});

export const { useGetQuizMarksQuery,
useGetQuizMarkByVideoIdAndStudentIdQuery,
useGetQuizMarkByIdQuery,
useGetQuizMarkByVideoIdQuery,
useDeleteQuizMutation,
useUpdateQuizMarkMutation,
useCreateQuizMarkMutation,
 } = quizMarkApi;
