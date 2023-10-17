
import { Button, Card, Typography} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import  {userState}  from '../store/atom/user.js';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Base_Url } from '../config.js';

const Signin = () => {
      const [username,setUsername]= useState("");
      const [password,setPassword]= useState("");
      const setUser=useSetRecoilState(userState);
      const navigate=useNavigate();

      return(
        <>
            <div style={{
                display:"flex",
                justifyContent:"center",
                margin:10,
                paddingTop:150
            }}>
                <Typography variant="h5">Welcome to course selling App. Please signin</Typography>
            </div>
            <div style={{
                display:"flex",
                justifyContent:"center",
                padding:30,
                margin:10
            }}>
                <Card variant="outlined" style={{
                    padding:20,
                    margin:10,
                    background:"#F5FFFA"
                }}>
                    <TextField 
                        fullWidth={true} 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                        style={{margin:2}} 
                        onChange={(e)=>{
                            setUsername(e.target.value);
                            console.log(e.target.value);
                    }}/>
                    <br></br>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        fullWidth={true}
                        style={{margin:2}}
                        onChange={(ev)=>{
                            setPassword(ev.target.value);
                            console.log(ev.target.value);
                        }}
                    />
                    <br></br>
                    <Button variant="contained" onClick={async()=>{
                        const res= await axios.post(`${Base_Url}/admin/signin`,{
                            username:username,
                            password:password
                        },
                        {
                            headers:{
                                "Content-type": "application/json"
                            }  
                        });
                        const data=res.data;
                        localStorage.setItem("token",data.token);

                        setUser({
                            userEmail:username,
                            isLoading:false
                        })

                        navigate("/courses");

                    }}>SignIn</Button>
                </Card>
            </div>
        </>
      )
    
  
}

export default Signin
