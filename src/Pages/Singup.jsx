import { useState } from "react"
import { Link } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase/auth";
// import { auth } from "firebase/auth";

import { auth } from "../firebase";
console.log(auth)
const Singup = () => {
    const navigate = useNavigate();

    const [values , setValues] = useState({name : "" , email : "" , password : ""});
    const [errorMessage , setErrorMessage] = useState("");


    const  handleSubmit = async (e) => {
        e.preventDefault();

        if(!values.name || !values.email || !values.password){
            setErrorMessage("Pls Fill all fields");
            return;
        }

        setErrorMessage("");

        try{
            const userCred = await createUserWithEmailAndPassword(auth , values.email, values.password);
            await updateProfile(userCred.user , {displayName : values.name});
            console.log('user created succesfully');
            setErrorMessage("User Created SUccesfully");

            setTimeout(() => {
             setErrorMessage("");
            },2000)
            
            navigate('/login');
            
        }catch(err){
            setErrorMessage(err.message);
            console.log(err);
        }

    } 
    return (
        <div className="container  mt-20 border w-[400px] m-auto p-3 shadow-md rounded-md py-5">
            <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1 items-start ">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Name" name="name" className="border p-2" onChange={(e) =>  
                     setValues((prev) => ({...prev , name : e.target.value}))} value={values.name}/>
                </div>

                <div className="flex flex-col gap-1 items-start ">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="email" name="email" className="border p-2" onChange={(e) =>  
                     setValues((prev) => ({...prev , email : e.target.value}))} value={values.email}/>
                </div>

                <div className="flex flex-col gap-1 items-start">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password" className="border p-2" onChange={(e) =>  
                    setValues((prev) => ({...prev , password : e.target.value}))} value={values.password}/>
                </div>

                <div className="flex flex-col gap-2 items-start mt-4">
                    <b className="text-red-500 text-xs">{errorMessage && errorMessage}</b>
                    <input type="submit" className="bg-green-600 text-white border p-1 text-sm cursor-pointer w-full" value={"Signup"}/>
                    <p className="text-xs hover:text-red cursor-pointer text-blue-400"> <Link to={"/"}>Already  a User Login</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Singup