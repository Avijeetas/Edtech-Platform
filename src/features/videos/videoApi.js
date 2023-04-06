import { apiSlice } from "../api/apiSlice";

export const videoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideo: builder.query({
            query: (id) => `videos/${id}`,
          }),
          getFirstVideo: builder.query({
            query: () => `/videos?_sort=createdAt&_order=asc&_limit=1`,
          }),
          getAllVideos: builder.query({
            query: () => `/videosc`,
          }),
          getAllVideosExceptFetched: builder.query({
            query: (id) => `/videos?_sort=createdAt&_order=asc&id_ne=${id}`,
          }),
          addVideo: builder.mutation({
            query: (data) => ({
              url: '/videos',
              method: 'POST',
              body: data,
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const {data: newTask} = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData("getAllVideos",
                        undefined,
                        (draft)=>{
                            draft.push(newTask);
                        }
                        )
                    )
                } catch(err){
                    console.log(err);
                }
            }
          }),
          editVideo: builder.mutation({
            query: ({id, data}) => ({
              url: `/videos/${id}`,
              method: 'PATCH',
              body: data,
            }),
          
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
              try {
                const { data: updatedTask } = await queryFulfilled;
                console.log(updatedTask);
          
                // Update cache for getVideo
                dispatch(
                  apiSlice.util.updateQueryData("getVideo",
                    id.toString(),
                    (draft) => Object.assign(draft, updatedTask)
                  )
                );
          
                // Update cache for getAllVideos
                dispatch(
                  apiSlice.util.updateQueryData("getAllVideos",
                    undefined,
                    (draft) => {
                      const taskIndex = draft.findIndex(video => video.id == id);
                      if (taskIndex !== -1) {
                        draft[taskIndex] = updatedTask;
                      }
                    }
                  )
                );
              } catch (err) {
                console.log(err);
              }
            }
          }),
          deleteVideo: builder.mutation({
            query: (id) => ({
              url: `/videos/${id}`,
              method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
              const result = dispatch(
                apiSlice.util.updateQueryData('getAllVideos',
                undefined,
                (draft)=>{
                  const idx = draft.findIndex((video)=>video.id==arg);
                  draft.splice(idx,1);
                })
                );

                try{
                  const response =await queryFulfilled;
                }catch(err){
                  result.undo();
                }
                  
              }
          })
          
    }),
});

export const { useGetAllVideosQuery,
   useGetFirstVideoQuery,
   useGetVideoQuery, 
   useAddVideoMutation, 
   useEditVideoMutation,
   useDeleteVideoMutation } = videoApi;
