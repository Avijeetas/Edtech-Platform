import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Error from "../../../components/ui/Error";
import {useAddVideoMutation} from "../../../features/videos/videoApi"
export default function AddVideo(){
    
    const [formTitle, setFormTitle] = useState('Add Video')
    const [title, setTitle] = useState('')
    const [duration, setDuration] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [url, setUrl] = useState('')
    const [views, setViews] = useState('')
    const [description, setDescription] = useState('')
    const [edit, setEdit]= useState(false)

    

   const [addVideo, {isSuccess:addSuccess, isError:addFailed, error:addError}] = useAddVideoMutation();
    const navigate = useNavigate();
    useEffect(()=>{
        if(addSuccess ){
            navigate( '/admin/videos');
        }
    }, [addSuccess, navigate])
    const handleSubmit = (e)=>{
        e.preventDefault();
        setCreatedAt(new Date().toISOString())
        addVideo({
            title,
            duration,
            createdAt: new Date().toISOString(),
            url,
            views,
            description,

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
                                    value={description} 
                                    onChange={e=>setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="text-right float-right">
                                <button type="submit" className="lws-submit">
                                    Save
                                </button>
                            </div>
                            {(addError ) && <Error message={'An error occurred'} />}
                        </form>
                    </div>
                </main>
            </div>
        </>
    )
}