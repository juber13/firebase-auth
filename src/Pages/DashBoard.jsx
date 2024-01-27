import { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
    const navigate = useNavigate();
    const [userName , setUserName] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName || '');
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log('User logged out successfully');
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };


    return (
        <>
            <header className='bg-gray-400 flex justify-between p-3'>
                <div className="right border w-[50px] h-[50px] flex items-center justify-center rounded-full shadow-lg bg-white">
                    <h3 className='text-2xl font-bold'>{userName.charAt(0).toUpperCase()}</h3>
                </div>
                <div className="left flex items-center gap-3">
                    {/* <strong>{props.user}</strong> */}
                    <button className='border p-1 rounded-md bg-white' onClick={handleLogout}>{userName ? "Logout" : "Login"}</button>
                </div>
            </header>

            <div className="container h-[630px] flex items-center justify-center">
                <h3 className='text-3xl'>Hi I Am
                    {" "}
                    <span className='text-green font-bold text-1xl'>

                        <Typewriter
                            words={[userName.toUpperCase(), 'Developer', 'Designer', 'Hardworker']}
                            loop={5}
                            cursor
                            cursorStyle='|'
                            typeSpeed={100}
                            deleteSpeed={100}
                            delaySpeed={1000}
                        // onLoopDone={handleDone}
                        // onType={handleType}
                        />
                    </span>
                </h3>
            </div>
        </>
    )
}

export default DashBoard