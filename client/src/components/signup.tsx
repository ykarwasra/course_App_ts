import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {userState}  from "../store/atom/user.js";
import { Base_Url } from "../config.js";

export default function Signup(){
    const [username, setUsername] = useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const setUser=useSetRecoilState(userState);
    return(
        <>
        <div style={{
            display:"flex",
             justifyContent:"center",
             paddingTop:150
          }}>
            <Typography variant={"h5"}>
                 Welcome to my Course App. Signup Below
             </Typography>
         </div>
         <div style={{
            display:"flex",
             justifyContent:"center",
             margin:10
             
             }} >
                <Card variant="outlined" style={{padding:10,
                margin:20,
                backgroundColor:"#F5FFFA"}}>
                <TextField 
                    fullWidth={true} 
                    id="outlined-basic1" 
                    label="username" 
                    variant="outlined" 
                    style={{margin:2}} 
                    onChange={(e)=>{
                        const x=e.target.value;
                        setUsername(x);
                        console.log(x);
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
                <Button variant="contained" style={{margin:2}} onClick={async()=>{
                   
                   const response=await axios.post(`${Base_Url}/admin/signup`,{
                        username:username,
                        password:password
                    })

                    let data=response.data;
                    localStorage.setItem("token",data.token);

                    setUser({
                        userEmail:username,
                        isLoading:false
                    })

                    navigate("/courses");
                
                }}>SignUp</Button>
                
                </Card>
         </div> 
        
        </>
    )

}