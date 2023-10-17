import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css'
import Course from './components/course';
import Courses from './components/courses';
import Signup from './components/signup';
import Signin from './components/signin';
import AddCourse from './components/addcourse';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { Landing } from './components/landing';
import Appbar from './components/appBar';
import { userState } from './store/atom/user';
import { useEffect } from 'react';
import { Base_Url } from './config';
import axios from 'axios';

function App() {
  return (
    <RecoilRoot>
      <div style={{
      width:"100vw",
      height:"100vh",
      backgroundColor:"#2F4F4F"
      }}>
        <BrowserRouter>
          <Appbar/>
          <InitUser/>
          <Routes>
            <Route path={"/signup"} element={<Signup/>} ></Route>
            <Route path={"/addcourse"} element={<AddCourse/>} ></Route>;
            <Route path={"/course/:courseId"} element={<Course/>} />;
            <Route path={"/courses"} element={<Courses/>} ></Route>;
            <Route path={"/signin"} element={<Signin/>} ></Route>;
            <Route path={"/"} element={<Landing/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  )
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async() => {
      try {
          const response = await axios.get(`${Base_Url}/admin/me`, {
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token")
              }
          })

          if (response.data.username) {
              setUser({
                  isLoading: false,
                  userEmail: response.data.username
              })
          } else {
              setUser({
                  isLoading: false,
                  userEmail: null
              })
          }
      } catch (e) {

          setUser({
              isLoading: false,
              userEmail: null
          })
      }
  };

  useEffect(() => {
      init();
  }, []);

  return <></>
}
export default App
