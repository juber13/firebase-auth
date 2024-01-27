
import './App.css'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import Login from './Pages/Login'
import Singup from './Pages/Singup'
import DashBoard from './Pages/DashBoard'
import { useEffect, useState } from 'react'
import { auth } from './firebase'
function App() {
  const [user , setUser] = useState('');

  const router = createBrowserRouter([
    {
      path : "/", 
      element : <DashBoard user={user}/>
    },

    {
      path : "/login",
      element : <Login/>
    },

    {
      path : "/signup",
      element : <Singup/>
    }
  ])

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        setUser(user.displayName);
      }else{
        setUser("");
      }
    })
  })
  return (
    <div className='wrapper'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
