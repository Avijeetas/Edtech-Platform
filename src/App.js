import React from 'react';
import './style/output.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './pages/student/Login';
import Registration from './pages/student/Registration';
import useAuthCheck from "./hooks/useAuthCheck";
import Leaderboard from './pages/student/Leaderboard';
import VideoPlayer from './pages/student/VideoPlayer';
import Assignment from "./pages/student/Assignment";
import Quiz from './pages/student/Quiz';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import VideoList from './pages/admin/videos/VideoList';
import AddVideo from './pages/admin/videos/AddVideo';
import EditVideo from './pages/admin/videos/EditVideo';
import PublicRoute from "./components/PublicRoute"
import PrivateRoute from './components/PrivateRoute';
import PageNotFound from './pages/PageNotFound';
import AssignmentList from './pages/admin/assignment/AssignmentList';
import AddAssignment from './pages/admin/assignment/AddAssignment';
import EditAssignment from './pages/admin/assignment/EditAssignment';
import QuizList from './pages/admin/quizzes/QuizList';
import AddQuiz from './pages/admin/quizzes/AddQuiz';
import EditQuiz from './pages/admin/quizzes/EditQuiz';
import AssignmentMarkList from './pages/admin/assignmentMark/AssignmentMarkList';
function App() {
  const authChecked = useAuthCheck();
  // // console.log(authChecked);
  return !authChecked? 
  <div>....checking authentication</div>
  :(
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/courses' element={<PublicRoute><VideoPlayer/></PublicRoute>}/>
        <Route path='/video/:id' element={<PublicRoute><VideoPlayer/></PublicRoute>}/>
        <Route path='/leaderboard' element={<PublicRoute><Leaderboard/></PublicRoute>}/>
        <Route path='/quizzes/:videoId' element={<PublicRoute><Quiz/></PublicRoute>}/>
        <Route path='/assignments/:id' element={<PublicRoute><Assignment/></PublicRoute>}/>
      
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/admin/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path='/admin/videos' element={<PrivateRoute><VideoList/></PrivateRoute>}/>
        <Route path='/admin/videos/add' element={<PrivateRoute><AddVideo/></PrivateRoute>}/>
        <Route path='/admin/videos/edit/:id' element={<PrivateRoute><EditVideo/></PrivateRoute>}/>
        <Route path='/admin/quizzes' element={<PrivateRoute><QuizList/></PrivateRoute>}/>
        <Route path='/admin/quizzes/add' element={<PrivateRoute><AddQuiz/></PrivateRoute>}/>
        <Route path='/admin/quizzes/edit/:id' element={<PrivateRoute><EditQuiz/></PrivateRoute>}/>
        
        <Route path='/admin/assignmentMarks' element={<PrivateRoute><QuizList/></PrivateRoute>}/>
        <Route path='/admin/assignments' element={<PrivateRoute><AssignmentList/></PrivateRoute>}/>
        <Route path='/admin/assignments/add' element={<PrivateRoute><AddAssignment/></PrivateRoute>}/>
        <Route path='/admin/assignments/edit/:id' element={<PrivateRoute><EditAssignment/></PrivateRoute>}/>
        <Route path='/admin/assignmentMark' element={<PrivateRoute><AssignmentMarkList/></PrivateRoute>}/>
        <Route path='*' element={<PageNotFound/>}   />
      </Routes>
    </Router>
  );
}

export default App;
