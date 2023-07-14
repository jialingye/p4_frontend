import {
  Routes,
  Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CourseList from './pages/CourseList';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import Header from './components/Navbar/Header';
import CourseCreate from './pages/CourseCreate';
import CourseAdmin from './pages/CourseAdmin';

let routes = (
  <Routes>
    <Route path="/" exact={true} element={<CourseList/>}/>
    <Route path="/courses/:id" element={<CoursePage/>}/>
    <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage/>}/>
    <Route path="/courses/new" element={<CourseCreate/>}/>
    <Route path="/courses/:id/edit" element={<CourseAdmin/>}/>
  </Routes>
)
function App() {
  return (
  
    <div className="App">
      <header>
      <Header/>
      </header>
      <main className='main'>
        {routes}
      </main>
    </div>
    

  );
}

export default App;
