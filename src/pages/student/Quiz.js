import Navbar from "../../components/navbar/Navbar"
import QuizCard from "../../components/card/QuizCard"
import { useGetQuizByVideoIdQuery } from "../../features/quiz/quizApi";
import { useParams } from "react-router-dom";
export default function Quiz(){

    return (
        <>
            <Navbar/>
            
            <section class="py-6 bg-primary">
                <QuizCard/>
            </section>
            
            

        </>
    )
}