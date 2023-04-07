import Navbar from "../../components/navbar/Navbar"
import { useNavigate, useParams } from "react-router-dom";
import { useGetAssignmentsByIdQuery } from "../../features/assignments/assignmentsApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateAssignmentMarkMutation } from "../../features/assignmentMark/assignmentMarkApi";
export default function Assignment(){
    const {id} = useParams();
    const {data: assignments, isLoading: isAssignmentLoaded, isError: assignmentsError} = useGetAssignmentsByIdQuery(id);
    const [createAssignmentMark, {isError: submissionError, isLoading, isSuccess}] = useCreateAssignmentMarkMutation();
    const { user } = useSelector((state) =>state.auth) || {};
    // console.log(user);
    // console.log(assignments)
    const [repo, setRepo] = useState("");
    const navigate =useNavigate();
    useEffect(()=>{
        if(isSuccess){
            navigate(`/video/${assignments?.video_id}`)

            window.location.href =`/video/${assignments?.video_id}`
        }
    },[navigate, isSuccess, assignments])
    

    const handleSubmit = (e) =>{
        e.preventDefault();

        createAssignmentMark({
            "student_id": user.id,
            "student_name": user.name,
            "assignment_id": id,
            "title": assignments.title,
            "createdAt": new Date().toISOString(),
            "totalMark": assignments.totalMark,
            "mark": 0,
            "repo_link": repo,
            "status":"pending"
        });
        // createAssignmentMark({
        //     "student_id": user.id,
        //     "student_name": user.name,
        //     "assignment_id": id,
        //     "title": assignments.title,
        //     "createdAt": new Date().now,
        //     "totalMark": assignments.totalMark,
        //     "mark": 0,
        //     "repo_link": repo,
        //     "status":"pending"
        // })
    }
    return (
        <>
            <Navbar/>
            
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold">{assignments?.title}</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-8 ">
                            <label htmlFor="repo_link" className="block text-sm font-medium text-slate-200">
                            Repository Link
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="repo_link"
                                    id="repo_link"
                                    className="block w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md"
                                    value={repo}
                                    onChange={(e)=> setRepo(e.target.value)}
                                />
                            </div>
                            <button disabled={isLoading}
            className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95"
            type="submit"
            >
            Submit
            </button>
                        </div>
                    </form>
                </div>
            </section>
            
            

        </>
    )
}