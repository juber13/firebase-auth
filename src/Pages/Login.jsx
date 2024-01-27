import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom"
import { auth } from "../firebase";

const Login = () => {
    const navigate = useNavigate();
    const [errorMessage , setErrorMessage] = useState("");
    const  [values , setValues] = useState({email : "" , password : ""});

    
    const  handleSubmit = async (e) => {
        e.preventDefault();

        if(!values.email || !values.password){
            setErrorMessage("Pls Fill all fields");
            return;
        }

        setErrorMessage("");

        try{
            await signInWithEmailAndPassword(auth , values.email, values.password);
            setErrorMessage("Logged in succesfully");
            navigate('/');
            
        }catch(err){
            setErrorMessage(err.message);
            console.log(err);
        }
    }
    
    return (
        <div className="container mt-40 border shadow-md w-[400px] m-auto p-3 rounded-md">
            <form className="flex flex-col gap-3 items-center outline-none" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1 items-start ">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Name" className="border p-2" name="email" onChange={(e) => 
                    setValues((prev) => ({...prev , email : e.target.value}))}/>
                </div>
                <div className="flex flex-col gap-1 items-start">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" className="border p-2" name="password" onChange={(e) => 
                    setValues((prev) => ({...prev , password : e.target.value}))}/>
                </div>
                <div className="flex flex-col gap-2 items-start mt-4">
                    <b>{errorMessage && errorMessage}</b>
                     <input type="submit"  className=" text-white bg-blue-500 border p-1 text-sm cursor-pointer w-full" value={"Login"}/>
                     <p className=" text-xs hover:text-red cursor-pointer text-blue-500"> <Link to={"/signup"}> Create new user Sign Up!</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login