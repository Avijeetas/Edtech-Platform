import Navbar from "../../components/navbar/Navbar";
import Video from "../../components/video/Video";
import RelatedVideos from "../../components/relatedVideos/RelatedVideos";
import { useGetAllVideosQuery, useGetFirstVideoQuery } from "../../features/videos/videoApi";
import { useParams } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";


export default function VideoPlayer(){
    const {id} = useParams() || {};    
    const {data: video, isLoading, isError, error} = useGetFirstVideoQuery();
    const {data: videos, isLoading: listLoading, isError: isListError } = useGetAllVideosQuery();
    console.log(video?.[0], videos);
    const {id: videoId } = video || {};
    let content = null;
    if(isLoading){
        content  = <Loading />
    } else if(!isLoading && isError){
        content = <Error message = {error} />
    } else if(!isLoading && !isError && video?.length==0){
        content = <Error message = {'No video found'} />
    } else if(!isLoading && !isError && video?.length>0){
        content = <><Video video = {id? videos?.find(video => video.id == id): video[0] } /> <RelatedVideos videoId = {id} videos={videos}/></>
    }

    return (
        <>
            <Navbar/> 

            <section className="py-6 bg-primary">
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
                <div className="grid grid-cols-3 gap-2 lg:gap-8">   
                    {content}
                </div>
            </div>
    
            </section>
        </>
    )
}