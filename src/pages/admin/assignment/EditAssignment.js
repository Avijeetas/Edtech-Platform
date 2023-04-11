import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Error from "../../../components/ui/Error";
import { useUpdateAssignmentMarkMutation } from "../../../features/assignmentMark/assignmentMarkApi";
import { useGetAssignmentsByIdQuery, useUpdateAssignmentsMutation } from "../../../features/assignments/assignmentsApi";
import { useGetAllVideosQuery, useGetVideoQuery } from "../../../features/videos/videoApi";

export default function EditAssignment(){
    const {id} = useParams();
    const {data: assignment,  isLoading: dataLoading, error : dataError} = useGetAssignmentsByIdQuery(id) 
    // console.log(assignment?.title);
    const [formTitle, _] = useState('Edit Assignment')
    const [title, setTitle] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [totalMark, setTotalMark] = useState('')
    const [videoId, setVideoId] = useState('');

    const {data: videos , isLoading, isError, error} = useGetAllVideosQuery();
    const [updateAssignments, {isSuccess, error: submissionError}] = useUpdateAssignmentsMutation();

    const navigate = useNavigate();
    useEffect(()=>{
        if(isSuccess){
            navigate('/admin/assignments');
        }
    },[isSuccess, navigate])

    useEffect(()=>{
        setTitle(assignment?.title);
        setVideoTitle(assignment?.video_title);
        setVideoId(assignment?.video_id);
        setTotalMark(assignment?.totalMark)
    },[assignment])
    const handleSubmit = (e) =>{
        e.preventDefault();
        let selectedVideo = videos && videos.find(video =>video.id == videoId);
        // console.log(selectedVideo);
        
        updateAssignments({
            id,
            updatedAssignments:{
                title,
                video_id: parseInt(videoId),
                video_title: selectedVideo.title,
                totalMark: parseInt(totalMark)
                }
            })
    }
    return (
        <>
            <Navbar/>
            <div className="container relative">
                <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                    <h1 className="mt-4 mb-8 text-3xl font-bold text-center">
                    {formTitle}
                    </h1>

                    <div className="justify-center  mb-2 space-y-2 ">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="fieldContainer">
                            <label for="lws-title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="lws-title"
                                required
                                value={title}
                                onChange={e=>setTitle(e.target.value)}
                            />
                            </div>
                            <div className="fieldContainer">
                                <label htmlFor="lws-teamMember">Video</label>
                                <select
                                    name="video"
                                    id="lws-video"
                                    required
                                    value={videoId}
                                    onChange={(e) => { setVideoId(e.target.value)}}
                                >
                                <option value="" hidden>Select Video</option>
                                {videos?.map((video) => (
                                    <option  value={video.id} key={video.id}>
                                    {video?.title}
                                    </option>
                                ))}
                                </select>
                            </div>


                            <div className="fieldContainer">
                            <label for="lws-taskName">Total Mark</label>
                            <input
                                type="number"
                                name="totalMark"
                                id="lws-totalMark"
                                required
                                value={totalMark} min="0" max="100"
                                onChange={e=>setTotalMark(e.target.value)}
                            />
                            </div>
                            
                        
                            

                            <div className="text-right float-right">
                                <button type="submit" className="lws-submit" >
                                    Save
                                </button>
                            </div>
                            {(submissionError!="" ) && <Error message={submissionError} />}
                            {(dataError!="" ) && <Error message={dataError} />}
                        </form>
                    </div>
                </main>
            </div>
        </>
    )
}