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
            <section class="py-6 bg-primary">
                <div class="mx-auto max-w-full px-5 lg:px-20">
                    <div class="px-3 py-20 bg-opacity-10">
                        <div class="w-full flex">
                            <Link to='/admin/assignments/add' class="btn ml-auto">Add Assignment</Link>
                        </div>
                        <div class="overflow-x-auto mt-4">
                            <table class="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th class="table-th">Title</th>
                                        <th class="table-th">Video Title</th>
                                        <th class="table-th">Mark</th>
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