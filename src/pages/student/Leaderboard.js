import { useSelector } from "react-redux";
import RankItem from "../../components/card/RankItem";
import Navbar from "../../components/navbar/Navbar";
import Error from "../../components/ui/Error";
import Loading from "../../components/ui/Loading";
import { useGetAssignmentMarksQuery } from "../../features/assignmentMark/assignmentMarkApi";
import { useGetQuizMarkByIdQuery, useGetQuizMarksQuery } from "../../features/quizMark/quizMarkApi";

export default function Leaderboard(){
    const { user } = useSelector((state) =>state.auth) || {};
    const {id} = user || {}
    const {data: assignmentMark, isLoading: assignLoading, isError: assignmentMarkError} = useGetAssignmentMarksQuery();
    const {data: quizMark, isLoading: quizLoading,isError: quizMarkError} = useGetQuizMarksQuery();

    const isLoading = assignLoading || quizLoading;
    const isError = assignmentMarkError || quizMarkError;
    let data = []
    let content = null
    let index=-1;
    if(isLoading){
        content = <Loading />
    } else if(!isLoading && isError){
        content = <Error message={'An error occurred'}/>
    } else if(!isLoading && !isError ){
        content = "done"
        
        const amByStudent = assignmentMark.reduce((acc, curr) => {
            const { student_id, mark, student_name } = curr;
            if (!acc[student_id]) {
              acc[student_id] = {
                student_name,
                student_id,
                markofAssignment: 0,
                markofQuiz: 0,
                totalMark : 0
              };
            }
            // console.log("student id ", student_id, curr);
            
            acc[student_id] ={
                ...acc[student_id],
                markofAssignment: acc[student_id].markofAssignment+parseInt(mark),
                totalMark: acc[student_id].totalMark+parseInt(mark)
            };
            return acc;
          }, {});
          

          const totalSum = quizMark.reduce((acc=amByStudent, curr) => {
            const { student_id, mark, student_name } = curr;
            if (!acc[student_id]) {
              acc[student_id] = {
                student_name,
                student_id,
                markofAssignment: 0,
                markofQuiz: 0,
                totalMark:0
              };
            }
            
            acc[student_id] ={
                ...acc[student_id],
                markofQuiz: acc[student_id].markofQuiz+mark,
                totalMark: (acc[student_id].markofAssignment || 0) + acc[student_id].markofQuiz + mark

            };
            return acc;
          }, amByStudent);
          
          const sortedData = Object.values(totalSum).sort((a, b) => b.totalMark - a.totalMark);
          // console.log(sortedData);

          index = sortedData.findIndex(item => item.student_id == id);
          data = sortedData.filter(item =>item.student_id==id);
          content = sortedData.splice(0, 20).map((data, index) => (
            <RankItem key={data.id} item={data} position={index + 1} />
          ));   
        }

     return (
        <>  
            <Navbar/>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    {
                        data?.length>0 &&
                        <div>
                        <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
                        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                            <thead>
                           
                                <tr>
                                <th className="table-th !text-center">Rank</th>
                                <th className="table-th !text-center">Name</th>
                                <th className="table-th !text-center">Quiz Mark</th>
                                <th className="table-th !text-center">Assignment Mark</th>
                                <th className="table-th !text-center">Total</th>
                            </tr>
                                
                            </thead>

                            <tbody>
                                <tr className="border-2 border-cyan">
                                    <td className="table-td text-center font-bold">{index+1}</td>
                                    <td className="table-td text-center font-bold">{data[0].student_name}</td>
                                    <td className="table-td text-center font-bold">{data[0].markofQuiz}</td>
                                    <td className="table-td text-center font-bold">{data[0].markofAssignment}</td>
                                    <td className="table-td text-center font-bold">{data[0].totalMark}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    }
                    

                    <div className="my-8">
                        <h3 className="text-lg font-bold">Top 20 Result</h3>
                        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                            <thead>
                                <tr className="border-b border-slate-600/50">
                                    <th className="table-th !text-center">Rank</th>
                                    <th className="table-th !text-center">Name</th>
                                    <th className="table-th !text-center">Quiz Mark</th>
                                    <th className="table-th !text-center">Assignment Mark</th>
                                    <th className="table-th !text-center">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {content}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>        
        </>
    )
}