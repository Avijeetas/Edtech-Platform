import { apiSlice } from "../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query({
          query: () => '/assignments',
        }),
        getAssignmentsById: builder.query({
          query: (id) => `/assignments/${id}`,
        }),
        getAssignmentsByVideoId: builder.query({
            query:(assignmentId) => `assignments?assignment_id=${assignmentId}`
        }),
        createAssignments: builder.mutation({
          query: (newAssignments) => ({
            url: '/assignments',
            method: 'POST',
            body: newAssignments,
          }),

          async onQueryStarted(arg, {queryFulfilled, dispatch}){
              try{
                  const {data: newTask} = await queryFulfilled;

                  dispatch(
                      apiSlice.util.updateQueryData("getAssignments",
                      undefined,
                      (draft)=>{
                          draft.push(newTask);
                      }
                      )
                  )
              } catch(err){
                  // console.log(err);
              }
          }
        }),

        updateAssignments: builder.mutation({
          query: ({ id, updatedAssignments }) => ({
            url: `/assignments/${id}`,
            method: 'PUT',
            body: updatedAssignments,
          }),
          async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
            try {
              const { data: updatedTask } = await queryFulfilled;
              // console.log(updatedTask);
        
              // Update cache for getassignment
              dispatch(
                apiSlice.util.updateQueryData("getAssignmentsById",
                  id.toString(),
                  (draft) => Object.assign(draft, updatedTask)
                )
              );
        
              // Update cache for getAllassignment
              dispatch(
                apiSlice.util.updateQueryData("getAssignments",
                  undefined,
                  (draft) => {
                    const assignmentIndex = draft.findIndex(assignment => assignment.id == id);
                    if (assignmentIndex !== -1) {
                      draft[assignmentIndex] = updatedTask;
                    }
                  }
                )
              );
            } catch (err) {
              // console.log(err);
            }
          }
        }),
        deleteAssignments: builder.mutation({
          query: (id) => ({
            url: `/assignments/${id}`,
            method: 'DELETE',
          }),
          async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            const result = dispatch(
              apiSlice.util.updateQueryData('getAssignments',
              undefined,
              (draft)=>{
                const idx = draft.findIndex((assignment)=>assignment.id==arg);
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

export const { useGetAssignmentsByIdQuery,
     useGetAssignmentsByVideoIdQuery,
     useGetAssignmentsQuery,
     useCreateAssignmentsMutation,
     useDeleteAssignmentsMutation,
     useUpdateAssignmentsMutation  } = assignmentsApi;
