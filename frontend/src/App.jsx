import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <>
    <div className='min-h-screen bg-zinc-950 text-white'>
      <div className='navbar bg-zinc-900'>
        <nav className="title bg-zinc-900 p-5 border-b border-zinc-500 flex justify-between items-center">
          <h1 className='text-xl font-bold pl-10 pt-2'>Xpense</h1>
          <button className='border-1 border-zinc-500 rounded-md px-5 py-1 text-base hover:bg-zinc-800 cursor-pointer transition-colors'>Login</button>
        </nav>
      </div>
      
      <div className='hero text-center py-30'>
        <div className='text-9xl font-bold'>Personal Xpense tracker built with FastAPI</div>
      </div>
    </div>
    </>
  )
}
export default App
