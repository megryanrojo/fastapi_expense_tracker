import { useState, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className='min-h-screen bg-zinc-950 text-white'>
      <div className='navbar bg-zinc-900'>
        <nav className="title bg-zinc-900 p-5 border-b border-zinc-500 flex justify-between items-center">
          <h1 className='text-xl font-bold pl-10 pt-2'>Xpense</h1>
          <button 
            className='border-1 border-zinc-500 rounded-md px-5 py-1 text-base hover:bg-zinc-800 cursor-pointer transition-colors' 
            onClick={() => setIsOpen(true)}
          >
            Login
          </button>
        </nav>
      </div>
      
      <div className='hero text-center py-30'>
        <div className='text-9xl font-bold text-zinc-300'>Personal Xpense tracker built with FastAPI</div>
      </div>

      {isOpen && (
        <div className='overlay flex justify-center items-center fixed bg-zinc-900/60 inset-0'>
          <div className='modal bg-zinc-800 rounded-md p-6 border-1 border-zinc-700 inline-flex flex-col items-center'>
            <h1 className='text-zinc-100 mb-10 font-bold text-2xl'>Login</h1>
            <div className='form'>
              <form action="#" method='post'>
                <label className='block'>Username</label>
                <input type="text" name='username' className='block bg-zinc-700 rounded-md p-2 border-1 border-zinc-600 w-full mb-4'/>
                <label className='block'>Password</label>
                <input type="text" name='username' className='block bg-zinc-700 rounded-md p-2 border-1 border-zinc-600 w-full mb-4'/>
                <button type='submit' className='bg-zinc-700'>Login</button>
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
