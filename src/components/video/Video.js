import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAssignmentMarkByAssignmentIdAndStudentIdQueryQuery } from "../../features/assignmentMark/assignmentMarkApi";
import { useGetAssignmentsByVideoIdQuery } from "../../features/assignments/assignmentsApi";
import { useGetQuizByVideoIdQuery } from "../../features/quiz/quizApi";
import { useGetQuizMarkByVideoIdAndStudentIdQuery } from "../../features/quizMark/quizMarkApi";
import { dateConversion } from "../../utils/dateConversion";
export default function Video({video}){
    const {id, title, url, createdAt, description} = video || {}
    // console.log(url)
    const { user } = useSelector((state) =>state.auth) || {};
    const { id:userId } = user || {};
    const {data: quizzes, isLoading: isQuizLoaded, isError: quizError} = useGetQuizByVideoIdQuery(id) || {};
    const {data: quizGiven, isSuccess, isLoading: quizloading } = useGetQuizMarkByVideoIdAndStudentIdQuery({videoId: id, studentId: userId}) || {};
    const {data: assignments, isLoading: isAssignmentLoaded, isError: assignmentsError} = useGetAssignmentsByVideoIdQuery(id);
    const {data: assignmentGiven, isSuccess:assignmentSuccess } = useGetAssignmentMarkByAssignmentIdAndStudentIdQueryQuery({assignmentId: assignments?.[0]?.id, studentId: userId}) || {};

    return (
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
            <iframe width="100%" className="aspect-video" src={url}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>

        <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                {title}
            </h1>
            <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                Uploaded on {dateConversion(createdAt)}</h2>

            <div className="flex gap-4">
                {
                    assignments?.length>0 && (
                        assignmentGiven?.length>0 && assignmentSuccess?
                        <button 
                        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm">
                        এসাইনমেন্ট জমা  দেয়া হয়েছে 
                        </button> :
                        <Link to={`/assignments/${assignments[0].id}`} 
                        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                        এসাইনমেন্ট
                        </Link> 
                        
                        
                    )
                }
                {
                    quizzes?.length>0  && (
                        quizGiven?.length >0 && isSuccess ?
                        <button
                        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm" >কুইজ জমা দেয়া হয়েছে 
                        </button>    :
                        <Link to={`/quizzes/${id}`} 
                        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary" aria-disabled={quizGiven?.length>0 && isSuccess}>কুইজে
                        অংশগ্রহণ 
                        করুন</Link>  
                    )
                }
              
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-6">
                {description}
            </p>


        </div>
        
                
    </div>
    )
}