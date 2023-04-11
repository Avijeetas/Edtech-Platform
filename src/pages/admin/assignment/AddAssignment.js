import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Error from "../../../components/ui/Error";
import { useCreateAssignmentsMutation } from "../../../features/assignments/assignmentsApi";
import { useGetAllVideosQuery } from "../../../features/videos/videoApi";

export default function AddAssignment(){
    const [formTitle, _] = useState('Add Assignment')
    const [title, setTitle] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [totalMark, setTotalMark] = useState('')
    const [videoId, setVideoId] = useState('');


    const {data: videos , isLoading, isError, error} = useGetAllVideosQuery();
    const [createAssignments, {isSuccess, error: submissionError}] = useCreateAssignmentsMutation();

    const navigate = useNavigate();
    useEffect(()=>{
        if(isSuccess){
            navigate('/admin/assignments');
        }
    },[isSuccess, navigate])

  
    const handleSubmit = (e) =>{
        e.preventDefault();
        let selectedVideo = videos && videos.find(video =>video.id == videoId);
        // console.log(selectedVideo);
        
        setVideoTitle(selectedVideo.title)
        createAssignments({
            title,
            video_id: parseInt(videoId),
            video_title: selectedVideo.title,
            totalMark: parseInt(totalMark)
        })
    }
    return (
        <>
            <Navbar />
            <div className="container relative">
                <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                    <h1 className="mt-4 mb-8 text-3xl font-bold text-center">
                    {formTitle}
                    </h1>

                    <div className="justify-center  mb-2 space-y-2 ">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="fieldContainer">
                            <label for="lws-taskName">Title</label>
                            <input
                                type="text"
                                name="taskName"
                                id="lws-taskName"
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
                        </form>
                    </div>
                </main>
            </div>
        </>
    )
}