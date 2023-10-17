import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import { isUserLoading } from "../store/selector/isUserLoading";
import { userEmailState } from "../store/selector/userEmail";
import LandingStyle from '../css/Landing.css'


export const Landing = () => {
    const navigate = useNavigate()
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading);
    return <div>
        <Grid container style={{padding: "5vw"}}>
            <Grid className="course-tile" item xs={12} md={6} lg={6}>
                <div style={{marginTop: 100}}>
                    <Typography className= "admin"variant={"h2"}>
                        Coursera Admin
                    </Typography>
                    <Typography variant={"h5"}>
                        A place to learn, earn and grow
                    </Typography>
                    { !userLoading && !userEmail && <div style={{display: "flex", marginTop: 20}}>
                        <div style={{marginRight: 10}}>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signup")
                                }}
                            >Signup</Button>
                        </div>
                        <div>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signin")
                                }}
                            >Signin</Button>
                        </div>
                    </div>}
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
                <img src={"/src/img/img_2.jpg"} width={"100%"} />
            </Grid>
        </Grid>
    </div>
}