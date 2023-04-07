import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Error from "../../../components/ui/Error";
import { useAddVideoMutation, useEditVideoMutation, useGetVideoQuery} from "../../../features/videos/videoApi"

export default function EditVideo(){
    
    const {id} = useParams()
    const {data: video, isError: fetchingError} = useGetVideoQuery(id) || {};
    console.log(video)

    const [formTitle, setFormTitle] = useState('Edit Video')
    const [title, setTitle] = useState(video?.title)
    const [duration, setDuration] = useState(video?.duration)
    const [createdAt, setCreatedAt] = useState(video?.createdAt)
    const [url, setUrl] = useState(video?.url)
    const [views, setViews] = useState(video?.views)
    const [description, setDescription] = useState(video?.description)
    const [edit, setEdit]= useState(false)
    
    const [editVideo, {isSuccess:editSuccess, isError:editFailed, error:editError}] = useEditVideoMutation();
    const navigate = useNavigate();
    useEffect(()=>{
        if(editSuccess){
            navigate( '/admin/videos');
        }
    }, [ editSuccess, navigate])
    const handleSubmit = (e)=>{
        e.preventDefault();
        setCreatedAt(new Date().toISOString())
        editVideo({
            id,
            data:{
            title,
            duration,
            createdAt: new Date().toISOString(),
            url,
            views,
            description,
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
                                <label for="lws-description">Duration</label>
                                <input 
                                    name="duration" 
                                    id="lws-duration" 
                                    required 
                                    value={duration} 
                                    onChange={e=>setDuration(e.target.value)}
                                />
                            </div>


                            <div className="fieldContainer">
                            <label for="lws-taskName">Url</label>
                            <input
                                type="text"
                                name="url"
                                id="lws-url"
                                required
                                value={url}
                                onChange={e=>setUrl(e.target.value)}
                            />
                            </div>
                            <div className="fieldContainer">
                            <label for="lws-taskName">Views</label>
                            <input
                                type="text"
                                name="views"
                                id="lws-views"
                                required
                                value={views}
                                onChange={e=>setViews(e.target.value)}
                            />
                            </div>
                        
                            <div className="fieldContainer text-black">
                                <label for="lws-description">Description</label>
                                <textarea 
                                    name="description" 
                                    type="text"
                                    id="lws-description" 
                                    className="text-black"
                                    required 
                                    style={{color:'black'}}
                                    value={description} 
                                    onChange={e=>setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="text-right float-right">
                                <button type="submit" className="lws-submit">
                                    Save
                                </button>
                            </div>
                            {(editFailed || fetchingError) && <Error message={'An error occurred'} />}
                        </form>
                    </div>
                </main>
            </div>
        </>
    )
}