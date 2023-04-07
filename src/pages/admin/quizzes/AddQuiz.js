import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import { useCreateQuizMutation } from "../../../features/quiz/quizApi";
import { useGetAllVideosQuery } from "../../../features/videos/videoApi";

export default function AddQuiz() {
    const [id, setId] = useState(1);
    const [formTitle, setFormTitle]= useState("Add Quiz")
    const [question, setQuestion] = useState("");
    const [videoId, setVideoId] = useState('');
    const {data: videos , isLoading, isError, error} = useGetAllVideosQuery();

    const [createQuiz, {isSuccess, isError: isCreateError, error: submissionError}] = useCreateQuizMutation();
    const [options, setOptions] = useState([
      { id: "1", option: "", isCorrect: true },
      { id: "2", option: "", isCorrect: false },
      { id: "3", option: "", isCorrect: false },
      { id: "4", option: "", isCorrect: false },
    ]);
  
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
      createQuiz({
        question,
        video_id: videoId,
        video_title: selectedVideo.title,
        options
      })
    }

    const navigate = useNavigate();
    
    useEffect(()=>{
      if(isSuccess){
        navigate('/admin/quizzes');
      }
    }, [navigate, isSuccess])
    
    return (
      <>
        <Navbar />
        <div className="container relative">
          <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
            <h1 className="mt-4 mb-8 text-3xl font-bold text-center"> {formTitle} </h1>
            <div className="justify-center  mb-2 space-y-2 ">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="fieldContainer">
                  <label style={{width: '500px', color: 'white' }}> Question: <input type="text" value={question} onChange={event=> setQuestion(event.target.value)} /> </label>
                </div>
                <div className="fieldContainer">
                  <label className="text-white" style={{width: '500px' }}> Video Title:<select
                              name="video"
                              id="lws-video"
                              required
                              value={videoId}
                              onChange={(e) => { setVideoId(e.target.value)}}
                          >
                          <option value="" hidden>Select Video</option>
                          {videos?.map((video) => (
                              <option  value={video.id} key={video.id}>
                              {video?.title}
                              </option>
                          ))}
                          </select></label>
                </div> 
                {options.map(option => ( <div key={option.id}>
                  <div className="fieldContainer">
                    <label style={{width: '500px', color: 'white' }}> Option {option.id}: <input type="text" value={option.option} onChange={event=> handleOptionChange(option.id, event.target.value, option.isCorrect)} /> </label>
                  </div>
                  <div className="fieldContainer">
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