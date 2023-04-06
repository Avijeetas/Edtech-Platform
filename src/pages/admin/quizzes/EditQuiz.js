import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import { useCreateQuizMutation, useGetQuizByIdQuery, useUpdateQuizMutation } from "../../../features/quiz/quizApi";
import { useGetAllVideosQuery } from "../../../features/videos/videoApi";

export default function EditQuiz() {


    const {id}= useParams();

    const {data: quiz,  isLoading: dataLoading, error : dataError} = useGetQuizByIdQuery(id) || {} 
    console.log(quiz);
    const [formTitle, setFormTitle]= useState("Edit Quiz")
    const [question, setQuestion] = useState(quiz?.question);
    const [videoId, setVideoId] = useState(quiz?.video_id);
    const {data: videos , isLoading, isError, error} = useGetAllVideosQuery();

    const [updateQuiz, {isSuccess, isError: isCreateError, error: submissionError}] = useUpdateQuizMutation();
    const [options, setOptions] = useState(quiz?.option);
  
    function handleOptionChange(optionId, optionText, isCorrect) {
      const updatedOptions = options.map(option => {
        if (option.id === optionId) {
          return { ...option, option: optionText, isCorrect: isCorrect };
        } else {
          return option;
        }
      });
      setOptions(updatedOptions);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      let selectedVideo = videos && videos.find(video =>video.id == videoId);
      console.log(selectedVideo);

      console.log(options);
      updateQuiz({
        id ,
        updatedQuiz: {
            question,
            video_id: videoId,
            video_title: selectedVideo.title,
            options
        }
      })
    }

    const navigate = useNavigate();
    
    useEffect(()=>{
      if(isSuccess){
        navigate('/admin/quizzes');
      }
      setOptions(quiz?.options);
      setQuestion(quiz?.question);
      setVideoId(quiz?.video_id);
    }, [navigate, isSuccess, quiz])
    
    return (
      <>
        <Navbar/>
        <div class="container relative">
          <main class="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
            <h1 class="mt-4 mb-8 text-3xl font-bold text-center"> {formTitle} </h1>
            <div class="justify-center  mb-2 space-y-2 ">
              <form class="space-y-6" onSubmit={handleSubmit}>
                <div class="fieldContainer">
                  <label style={{width: '500px', color: 'white' }}> Question: <input type="text" value={question} onChange={event=> setQuestion(event.target.value)} /> </label>
                </div>
                <div class="fieldContainer">
                  <label class="text-white" style={{width: '500px' }}> Video Title:<select
                              name="video"
                              id="lws-video"
                              required
                              value={videoId}
                              onChange={(e) => { setVideoId(e.target.value)}}
                          >
                          <option value="" hidden>Select Video</option>
                          {videos && videos?.map((video) => (
                              <option  value={video.id} key={video.id}>
                              {video?.title}
                              </option>
                          ))}
                          </select></label>
                </div> 
                {options && options.map(option => ( <div key={option.id}>
                  <div class="fieldContainer">
                    <label style={{width: '500px', color: 'white' }}> Option {option.id}: <input type="text" value={option.option} onChange={event=> handleOptionChange(option.id, event.target.value, option.isCorrect)} /> </label>
                  </div>
                  <div class="fieldContainer">
                    <label style={{width: '500px', color: 'white' }}> Correct Answer: <input type="checkbox" checked={option.isCorrect} onChange={event=> handleOptionChange(option.id, option.option, event.target.checked)} /> </label>
                  </div>
                </div> ))} 
                <div className="fieldContainer">
                  <button type="submit" disabled={isError || isCreateError}>Submit</button>
                </div>

              </form>
            </div>
          </main>
        </div>
      </>

    );
  }
