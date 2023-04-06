import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetQuizByVideoIdQuery } from '../../features/quiz/quizApi';
import { useGetVideoQuery } from '../../features/videos/videoApi';

import {useCreateQuizMarkMutation} from "../../features/quizMark/quizMarkApi";
import Error from '../ui/Error';
export default function QuizCard() {

  const { user } = useSelector((state) =>state.auth) || {};
  const {name, id} = user || {}
  const { videoId } = useParams() || {};
  const {
    data: quizzes,
    isLoading: isQuizLoaded,
    isError: quizError,
  } = useGetQuizByVideoIdQuery(videoId) || {};
  const {
    data: video,
    isLoading, 
    isError 
  } = useGetVideoQuery(videoId);

  // console.log(video)
  const [createQuizMark, {isLoading: quizCreate, isError: submissionError, error:reason}] = useCreateQuizMarkMutation();
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (quizId, optionId, isChecked) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [quizId]: {
        ...prevSelectedOptions[quizId],
        [optionId]: isChecked,
      },
    }));
  };
  const navigate =useNavigate();
  useEffect(()=>{
    if(quizCreate){
        navigate(`/video/${videoId}`)
        window.location.href =`/video/${videoId}`;
    }
  },[navigate, quizCreate])

  const handleSubmit = (e) => {
    e.preventDefault();

 
    let totalCorrect= 0;
    
    quizzes.forEach((quiz) => {

        const selectedOptions = Array.from(document.querySelectorAll(`#question_${quiz.id}`)).map(option => option.checked);
        
        const correctOptions = quiz.options.map(option => option.isCorrect);
    
        totalCorrect += JSON.stringify(correctOptions) === JSON.stringify(selectedOptions);

    });

    let totalWrong = quizzes?.length - totalCorrect;

    createQuizMark({
        student_id: id,
        student_name: name,
        video_id: video?.id,
        video_title: video?.title,
        totalQuiz: quizzes?.length,
        totalCorrect,
        totalWrong,
        totalMark: quizzes?.length*5,
        mark: totalCorrect*5
    })
  };

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
            <h1 className="text-2xl font-bold">Quizzes for {quizzes && quizzes[0].video_title}</h1>
            <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="space-y-8 ">
            {quizzes && quizzes.map((quiz) => {
                return (
                <div className="quiz" key={quiz.id}>
                    <h4 className="question">
                    Quiz {quiz.id-quizzes[0].id+1} - {quiz.question}
                    </h4>
                    <div className="quizOptions">
                    {quiz.options.map((option) => {
                        return (
                        <label key={option.id}>
                            <input type="checkbox" id={`question_${quiz.id}`} value={option.id} />
                            {option.option}
                        </label>
                        );
                    })}
                    </div>
                </div>
                );
            })}
            </div>
            <button
            className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95"
            type="submit"
            >
            Submit
            </button>

            {submissionError && <Error message={reason}/>}
        </form>
        </div>
    );
}
