import Error from "../../../components/ui/Error";
import Loading from "../../../components/ui/Loading";
import { useGetAssignmentMarksQuery } from "../../../features/assignmentMark/assignmentMarkApi";
import AssignmentMark from "./AssignmentMark";
import Navbar from "../../../components/navbar/Navbar";

export default function AssignmentMarkList(){
    const {data: marks, isLoading, isError, error } = useGetAssignmentMarksQuery();
    let content = null
    let pending = 0, published =0;
    if(isLoading){
        content = <Loading />
    } else if(!isLoading && isError){
        content = <Error message={error}/>
    } else if(!isLoading && !isError && marks?.length==0){
        content = <Error message={'No assignment submissions found'} />
    } else if(!isLoading && !isError && marks?.length >0){
        content = marks.map( mark =>{
            if(mark.status=='pending') pending+=1;
            else if(mark.status=='published') published+=1;
            return <AssignmentMark key={mark.id} markInfo={mark}/>
        
        }) 
    }
    return (
        <>
            <Navbar />
            <section class="py-6 bg-primary">
                <div class="mx-auto max-w-full px-5 lg:px-20">
                    <div class="px-3 py-20 bg-opacity-10">
                        <ul class="assignment-status">
                            <li>Total <span>{parseInt(published)+parseInt(pending)}</span></li>
                            <li>Pending <span>{pending}</span></li>
                            <li>Mark Sent <span>{published}</span></li>
                        </ul>
                        <div class="overflow-x-auto mt-4">
                            <table class="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th class="table-th">Assignment</th>
                                        <th class="table-th">Date</th>
                                        <th class="table-th">Student Name</th>
                                        <th class="table-th">Repo Link</th>
                                        <th class="table-th">Mark</th>
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