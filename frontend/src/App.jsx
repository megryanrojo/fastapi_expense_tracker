import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=> {
    const userData = JSON.parse(localStorage.getItem("user"))
    setUser(userData)
  }, [])

  async function handleSubmit(event) {
  event.preventDefault();
  console.log(username, password);

  const response = await fetch(
    "http://127.0.0.1:8000/api/v1/auth/login",

    {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({name: username, password: password})
    }
  )

  const data = await response.json();

  if (response.ok) {
    setUser(data);

    localStorage.setItem("user", JSON.stringify(data));

    setUsername('');
    setPassword('');
    setIsOpen(false); 
  } else {
    console.log("no user found")
    }
  }

  function handleLogout() {
    setUser(null)

    localStorage.removeItem("user")
  }

  return (
    <>
    <div className='min-h-screen bg-zinc-950 text-white'>
      <div className='navbar bg-zinc-900'>
        <nav className="title bg-zinc-900 p-5 border-b border-zinc-500 flex justify-between items-center">
          <h1 className='text-xl font-bold pl-10 pt-2'>Xpense</h1>
          {user ? 

          (<>
            <div className='flex items-center gap-4'>
              <p>{user.name}</p>
              <button 
                className='border border-zinc-500 rounded-md px-5 py-1 text-base hover:bg-zinc-800 cursor-pointer'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>) : 

          (<>
            <button 
              className='border-1 border-zinc-500 rounded-md px-5 py-1 text-base hover:bg-zinc-800 cursor-pointer transition-colors' 
              onClick={() => setIsOpen(true)}
            > 
              Login
            </button>
          </>)
          }

        </nav>
      </div>
      
      <div className='hero text-center py-30'>
        <div className='text-9xl font-bold text-zinc-300'>Personal Xpense tracker built with FastAPI</div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)} 
          className='overlay flex justify-center items-center fixed bg-zinc-900/60 inset-0'
          >
          <div 
            onClick={(e) => e.stopPropagation()}
            className='modal bg-zinc-800 rounded-md p-6 border-1 border-zinc-700 inline-flex flex-col items-center'>
            <h1 className='text-zinc-100 mb-10 font-bold text-2xl'>Login</h1>
            <div className='form'>
              <form onSubmit={handleSubmit}>
                <label className='block text-zinc-100'>Username</label>
                <input value={username} onChange={(event) => setUsername(event.target.value)} type="text" name='username' className='block bg-zinc-700 rounded-md p-2 border border-zinc-400 w-full mb-4'/>
                <label className='block text-zinc-100'>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name='password' className='block bg-zinc-700 rounded-md p-2 border border-zinc-400 w-full mb-4'/>
                <button 
                  type='submit' className='bg-zinc-700 border border-zinc-400 rounded-md px-23 py-1 font-bold hover:bg-zinc-500 cursor-pointer'>Login Now</button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  )
}

export default App
