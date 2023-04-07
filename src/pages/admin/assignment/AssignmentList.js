import { Link } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import { useGetAssignmentsQuery } from "../../../features/assignments/assignmentsApi";
import Assignment from "./Assignment";
import Loading from "../../../components/ui/Loading"
import Error from "../../../components/ui/Error";

export default function AssignmentList(){
    const {data: assigments, isLoading, isError}  = useGetAssignmentsQuery();
    let content = null;

    if(isLoading ){
        content = <Loading />
    } else if(!isLoading && isError){
        content = <Error message={'There is an error'} />
    } else if(!isLoading && !isError && assigments?.length==0){
        content = <Error message={'No assigments found'} />
    } else if(!isLoading && !isError && assigments?.length > 0){
        content = assigments.map(assignment => <Assignment key={assignment.id} assignment={assignment}/>)
    }
    return (
        <>
            <Navbar/>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <Link to='/admin/assignments/add' className="btn ml-auto">Add Assignment</Link>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            <table className="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th className="table-th">Title</th>
                                        <th className="table-th">Video Title</th>
                                        <th className="table-th">Mark</th>
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