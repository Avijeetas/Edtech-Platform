import { apiSlice } from "../api/apiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignmentMarks: builder.query({
          query: () => '/assignmentMark?_sort=createdAt&_order=desc',
        }),
        getInitialAssignmentMarks: builder.query({
          query: () => `/assignmentMark?_sort=createdAt&_order=desc&_page=1&_limit=${process.env.REACT_APP_ITEMS_PER_URL}`,
          transformResponse(apiResponse, meta) {
            const totalCount = meta.response.headers.get("X-Total-Count");
            return {
                marks: apiResponse,
                totalCount,
            };
        },
        }),
        getMoreAssignmentMarks: builder.query({
          query: (page) => `/assignmentMark?_sort=createdAt&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_ITEMS_PER_URL}`,
          async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
              try {
                  const conversations = await queryFulfilled;
                  console.log(JSON.stringify(conversations?.data)+' here');
                  if (conversations?.data?.length > 0) {
                      // update conversation cache pessimistically start
                      dispatch(
                          apiSlice.util.updateQueryData(
                              "getInitialAssignmentMarks",
                              email,
                              (draft) => {
                                  return {
                                      marks: conversations.data,
                                      totalCount: Number(draft.totalCount),
                                  };
                              }
                          )
                      );
                      // update messages cache pessimistically end
                  }
              } catch (err) {}
          },
      }),
        getAssignmentMarkById: builder.query({
          query: (id) => `/assignmentMark/${id}`,
        }),
        getAssignmentMarkByVideoId: builder.query({
            query:(videoId) => `assignmentMark?video_id=${videoId}`
        }),
        getAssignmentMarkByAssignmentIdAndStudentIdQuery: builder.query({
          query:({assignmentId, studentId}) => `assignmentMark?assignment_id=${assignmentId}&student_id=${studentId}`
      }),
        createAssignmentMark: builder.mutation({
          query: (newAssignmentMark) => ({
            url: '/assignmentMark',
            method: 'POST',
            body: newAssignmentMark,
          }),
        }),

        updateAssignmentMark: builder.mutation({
          query: ({ id, updatedMark }) => ({
            url: `/assignmentMark/${id}`,
            method: 'PUT',
            body: updatedMark,
          }),
          async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
            try {
              const { data: updatedmark } = await queryFulfilled;
              console.log(updatedmark);
        
              // Update cache for getassignment
              dispatch(
                apiSlice.util.updateQueryData("getAssignmentMarkById",
                  id.toString(),
                  (draft) => Object.assign(draft, updatedmark)
                )
              );
        
              // Update cache for getAllassignment
              dispatch(
                apiSlice.util.updateQueryData("getAssignmentMarks",
                  undefined,
                  (draft) => {
                    const assignmentIndex = draft.findIndex(assignment => assignment.id == id);
                    if (assignmentIndex !== -1) {
                      draft[assignmentIndex] = updatedmark;
                    }
                  }
                )
              );
            } catch (err) {
              console.log(err);
            }
          }
        }),
        deleteAssignment: builder.mutation({
          query: (id) => ({
            url: `/assignmentMark/${id}`,
            method: 'DELETE',
          }),
        }),
      }),
});

export const { useGetAssignmentMarksQuery,
useGetAssignmentMarkByAssignmentIdAndStudentIdQueryQuery,
useGetAssignmentMarkByIdQuery,
useGetInitialAssignmentMarksQuery,
useGetMoreAssignmentMarksQuery,
useGetAssignmentMarkByVideoIdQuery,
useDeleteAssignmentMutation,
useUpdateAssignmentMarkMutation,
useCreateAssignmentMarkMutation,
 } = assignmentMarkApi;
