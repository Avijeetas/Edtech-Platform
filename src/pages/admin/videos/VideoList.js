import Navbar from "../../../components/navbar/Navbar"
import VideoItem from "./VideoItem"
import {useGetAllVideosQuery} from "../../../features/videos/videoApi";
import Loading from "../../../components/ui/Loading"
import Error from "../../../components/ui/Error"
import { Link } from "react-router-dom";
import "./output.css"
export default function VideoList(){
    const {data: videos , isLoading, isError, error} = useGetAllVideosQuery();

    let content = null
    if(isLoading){
        content = <Loading />
    } else if(!isLoading && isError){
        content = <Error message={error}/>
    } else if(!isLoading && !isError && videos?.length==0){
        content = <Error message={'No videos found! Please add some'} />
    } else if(!isLoading && !isError && videos?.length >0){
        content = videos.map( video => <VideoItem key={video.id} video={video}/>) 
    }

    return (
        <>
            <Navbar />
            
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <Link to='/admin/videos/add' className="btn ml-auto">Add Video</Link>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            <table className="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th className="table-th">Video Title</th>
                                        <th className="table-th">Description</th>
                                        <th className="table-th">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-600/50">
                                    {content}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}