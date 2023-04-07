import moment from "moment";
import { useState } from "react";
import { useUpdateAssignmentMarkMutation } from "../../../features/assignmentMark/assignmentMarkApi";

export default function AssignmentMark({markInfo}){
    const {id, student_name, title, createdAt, repo_link, mark, status, student_id} = markInfo;
    const date = moment(createdAt).format("DD MMM yyyy hh:mm:ss A")
    const [input, setInput] = useState(mark)
    const [updateAssignmentMark, isError] = useUpdateAssignmentMarkMutation();
    const markSubmit = (id)=>{
        updateAssignmentMark({id,
            updatedMark:{
                mark: input,
                status: "published",
                student_name,
                student_id,
                title, createdAt,
                repo_link,
            }
        
        })
    }
    return (
        <tr>
            <td className="table-td">{title}</td>
            <td className="table-td">{createdAt}</td>
            <td className="table-td">{student_name}</td>
            <td className="table-td">{repo_link}</td>
            <td className="table-td input-mark">
                {
                    status== "pending" ? <>                
                    <input max="100"  value={input} onChange={e=>setInput(e.target.value)}/>
                        <button onClick={()=>markSubmit(`${id}`)} >
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>
                        
                    </> :
                    <td className="table-td">{mark}</td>
                }
                {
                    
                }


            </td>
        </tr>
    )
}