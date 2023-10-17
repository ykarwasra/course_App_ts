import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { courseState } from '../store/atom/course'
import { courseImage, coursePrice, courseTitle, isCourseLoading } from '../store/selector/courses';
import { Base_Url } from '../config';
import Loading from './Loading';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';

const Course = () => {
  const setCourses =useSetRecoilState(courseState);
  const {courseId}=useParams();
  const courseLoading=useRecoilValue(isCourseLoading);

  useEffect(()=>{
    axios.get(`${Base_Url}/admin/course/${courseId}`,{
      headers: {
        Authorization:"Bearer "+localStorage.getItem("token")
      }
    }).then(res=>{
      setCourses({course:res.data.course, isLoading:false})
    }).catch(e=>{
      setCourses({course:null,isLoading:false})
    });
  },[]);

  if(courseLoading){
    return <Loading/>
  }

  return (
    <div>
      <Graytopper/>
      <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard />
            </Grid>
        </Grid>
    </div>
  )
}

function Graytopper(){
  const title=useRecoilValue(courseTitle);
  return  <>
    <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom:-250}}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
  </>
}

function UpdateCard(){
  const [courseDetails, setCourse] = useRecoilState(courseState);

  const [title, setTitle] = useState(courseDetails.course.title);
  const [description, setDescription] = useState(courseDetails.course.description);
  const [image, setImage] = useState(courseDetails.course.imageLink);
  const [price, setPrice] = useState(courseDetails.course.price);
  const navigate=useNavigate();

  return <div style={{display: "flex", justifyContent: "center", marginBottom:10}}>
  <Card varint={"outlined"} style={{maxWidth: 600, marginTop: 200}}>
      <div style={{padding: 20}}>
          <Typography style={{marginBottom: 10}}>Update course details</Typography>
          <TextField
              value={title}
              style={{marginBottom: 10}}
              onChange={(e) => {
                  setTitle(e.target.value)
              }}
              fullWidth={true}
              label="Title"
              variant="outlined"
          />

          <TextField
              value={description}
              style={{marginBottom: 10}}
              onChange={(e) => {
                  setDescription(e.target.value)
              }}
              fullWidth={true}
              label="Description"
              variant="outlined"
          />

          <TextField
              value={image}
              style={{marginBottom: 10}}
              onChange={(e) => {
                  setImage(e.target.value)
              }}
              fullWidth={true}
              label="Image link"
              variant="outlined"
          />
          <TextField
              value={price}
              style={{marginBottom: 10}}
              onChange={(e) => {
                  setPrice(e.target.value)
              }}
              fullWidth={true}
              label="Price"
              variant="outlined"
          />

          <Button
              variant="contained"
              onClick={async () => {
                 const res= await axios.put(`${Base_Url}/admin/course/` + courseDetails.course._id, {
                      title: title,
                      description: description,
                      imageLink: image,
                      published: true,
                      price
                  }, {
                      headers: {
                          "Content-type": "application/json",
                          "Authorization": "Bearer " + localStorage.getItem("token")
                      }
                  });
                  let updatedCourse = {
                      _id: courseDetails.course._id,
                      title: title,
                      description: description,
                      imageLink: image,
                      price:price
                  };
                  alert(`${res.data.message}`);
                  setCourse({course: updatedCourse, isLoading: false});
              }}
          > Update course</Button>
          <Button variant="conatined" onClick={()=>{
            navigate("/courses");
          }}>Done</Button>
      </div>
  </Card>
</div>
}

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);

  return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
   <Card style={{
      margin: 10,
      width: 350,
      minHeight: 200,
      borderRadius: 20,
      marginRight: 50,
      paddingBottom: 15,
      zIndex: 2
  }}>
      <img src={imageLink} style={{width: 350}} ></img>
      <div style={{marginLeft: 10}}>
          <Typography variant="h5">{title}</Typography>
          <Price />
      </div>
  </Card>
  </div>
}

function Price() {

  const price = useRecoilValue(coursePrice);
  return <>
      <Typography variant="subtitle2" style={{color: "gray"}}>
          Price
      </Typography>
      <Typography variant="subtitle1">
          <b>Rs {price} </b>
      </Typography>
  </>
}
export default Course
