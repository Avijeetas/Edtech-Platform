import { Link } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar"
import Error from "../../../components/ui/Error";
import Loading from "../../../components/ui/Loading";
import { useGetQuizzesQuery } from "../../../features/quiz/quizApi";
import Quiz from "./Quiz";
export default function QuizList(){
    let content = null;

    const {data : quizzes, isLoading, isError, error} = useGetQuizzesQuery(); 

    if(isLoading){
        content = <Loading />
    } else if(!isLoading && isError){
        content = <Error message={error}/>
    } else if(!isLoading && !isError && quizzes?.length==0){
        content = <Error message={'No videos found! Please add some'} />
    } else if(!isLoading && !isError && quizzes?.length >0){
        content = quizzes.map( quiz => <Quiz key={quiz.id} quiz={quiz}/>) 
    }
    return (
        <>
            <Navbar/>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <Link to='/admin/quizzes/add' className="btn ml-auto">Add Quiz</Link>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            <table className="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th className="table-th">Question</th>
                                        <th className="table-th">Video</th>
                                        <th className="table-th justify-center">Action</th>
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