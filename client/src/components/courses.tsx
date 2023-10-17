
import { Button, Card, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Base_Url } from '../config';

function Courses() {
  const[courses,setCourses]=useState([]);

  const init=async()=>{
        const res=await axios.get(Base_Url+"/admin/courses",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        setCourses(res.data.courses)
  }

  useEffect(()=>{
    init();
  },[]);

    return (
    <div style={{
        display:"flex", 
        flexWrap:"wrap", 
        justifyContent:"center"
    }}>
        {courses.map((course)=>{
            return <Course key={course._id} course={course} setCourses={setCourses}/>;
        })
        }
    </div>
  )
};

const Course=({course,setCourses})=>{
    const navigate = useNavigate();

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="h6">{course.description}</Typography>
        <Typography textAlign={"center"} variant="h6">{`Price - ${course.price}`}</Typography>
        <br></br>
        <img src={course.imageLink} style={{width: 300}} ></img>
        <div style={{display: "flex", justifyContent: "space-between", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course._id);
            }}>Edit</Button>
            <Button variant="contained" size="large" onClick={async() => {
                const response=await axios.delete(Base_Url+"/admin/delete/"+course._id,{
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }
                });

                const message=response.data.message;
                alert(message);
                setCourses(response.data.courses);
            }}>Delete</Button>
        </div>
    </Card>
}

export default Courses
