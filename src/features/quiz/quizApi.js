import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes: builder.query({
          query: () => '/quizzes',
        }),
        getQuizById: builder.query({
          query: (id) => `/quizzes/${id}`,
        }),
        getQuizByquizId: builder.query({
            query:(quizId) => `quizzes?quiz_id=${quizId}`
        }),
        getQuizByVideoId: builder.query({
          query:(videoId) => `quizzes?video_id=${videoId}`
        }), 
        createQuiz: builder.mutation({
          query: (newQuiz) => ({
            url: '/quizzes',
            method: 'POST',
            body: newQuiz,
          }),
          async onQueryStarted(arg, {queryFulfilled, dispatch}){
            try{
                const {data: quiz} = await queryFulfilled;

                dispatch(
                    apiSlice.util.updateQueryData("getQuizzes",
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

        updateQuiz: builder.mutation({
          query: ({ id, updatedQuiz }) => ({
            url: `/quizzes/${id}`,
            method: 'PUT',
            body: updatedQuiz,
          }),
                    
          async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
            try {
              const { data: updatedQuiz } = await queryFulfilled;
              // console.log(updatedQuiz);
        
              // Update cache for getquiz
              dispatch(
                apiSlice.util.updateQueryData("getQuizById",
                  id.toString(),
                  (draft) => Object.assign(draft, updatedQuiz)
                )
              );
        
              // Update cache for getAllquizs
              dispatch(
                apiSlice.util.updateQueryData("getQuizzes",
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
            url: `/quizzes/${id}`,
            method: 'DELETE',
          }),
          async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            const result = dispatch(
              apiSlice.util.updateQueryData('getQuizzes',
              undefined,
              (draft)=>{
                const idx = draft.findIndex((quiz)=>quiz.id==arg);
                draft.splice(idx,1);
              })
              );

              try{
                const response =await queryFulfilled;
              }catch(err){
                result.undo();
              }
                
            }
        }),
      }),
});

export const { useGetQuizByIdQuery,
     useGetQuizByquizIdQuery,
     useGetQuizzesQuery,
     useGetQuizByVideoIdQuery,
     useCreateQuizMutation,
     useDeleteQuizMutation,
     useUpdateQuizMutation  } = quizApi;
