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
            
            <section class="py-6 bg-primary">
                <div class="mx-auto max-w-full px-5 lg:px-20">
                    <div class="px-3 py-20 bg-opacity-10">
                        <div class="w-full flex">
                            <Link to='/admin/videos/add' class="btn ml-auto">Add Video</Link>
                        </div>
                        <div class="overflow-x-auto mt-4">
                            <table class="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th class="table-th">Video Title</th>
                                        <th class="table-th">Description</th>
                                        <th class="table-th">Action</th>
                                    </tr>
                                </thead>

                                <tbody class="divide-y divide-slate-600/50">
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