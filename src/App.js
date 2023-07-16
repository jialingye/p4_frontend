import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CourseList from './pages/CourseList';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import Header from './components/Navbar/Header';
import CourseCreate from './pages/CourseCreate';
import CourseAdmin from './pages/CourseAdmin';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './utility/PrivateRoute';
import { AuthContext } from './context/AuthContext';
import { useEffect, useState } from 'react';


let routes = (
  <Routes>
    <Route path="/" exact={true} element={<CourseList/>}/>
    <Route path="/courses/:id" element={<CoursePage/>}/>
    <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage/>}/>
    <Route path="/courses/new" element={<CourseCreate/>}/>
    <Route path="/courses/:id/edit" element={<CourseAdmin/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
  </Routes>
)
function App() {
  const [tokenState, setTokenState]= useState(null)
  const [isLoggedInState, setIsLoggedInState]= useState(null)
  const [userIdState, setUserIdState]= useState(null)
  const [userDataState, setUserDataState]= useState(null)
  const navigate = useNavigate();

  const loginHandle = (userId, token, userData) => {
    setTokenState(token);
    setIsLoggedInState(true);
    setUserIdState(userId);
    setUserDataState(userData);
    localStorage.setItem("userData",JSON.stringify({
      userId,
      token,
      userData,
    }))
  }

  //handle logout function
  const logoutHandle = () => {
    setTokenState(null);
    setIsLoggedInState(false);
    setUserIdState(null);
    setUserDataState(false);
    localStorage.removeItem("userData");
    navigate('/')
  }

//set authentication global value
  const authcontextValue = {
    isLoggedIn: !!tokenState,
    token: tokenState,
    userId: userIdState,
    login: loginHandle,
    logout: logoutHandle
  }

  useEffect(() => {
    //get login take from local storage when mount!(Edit from main)
    const localData = JSON.parse(localStorage.getItem('userData'))
    //if there is data in local storage, set login state.
    if(localData){
      setTokenState(localData.token);
      setIsLoggedInState(true);
      setUserIdState(localData.userId);
      setUserDataState(localData.userData);
    }
  },[]);

  return (
   <AuthContext.Provider value={authcontextValue}>
    <div className="App">
      <header>
      <Header/>
      </header>
      <main className='main'>
        {routes}
      </main>
      <footer style={{textAlign:'center', color:'beige'}}>My Application copyright 2023 Jade Ye</footer>
    </div>
    </AuthContext.Provider>

  );
}

export default App;
