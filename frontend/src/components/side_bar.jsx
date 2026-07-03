import { useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';

function SideBar({sidebarOpen, setSidebarOpen}) {
    return (
        <>
            {sidebarOpen && (
                <div className="overlay bg-zinc-900/60 fixed inset-0 text-zinc-100" onClick={() => setSidebarOpen(false)}>
                    <div onClick={(e) => e.stopPropagation()} className='sidebar bg-zinc-900 text-zinc-100 fixed top-0 left-0 h-full w-64 p-5 z-50 flex flex-col'>
                        <h1 className='text-zinc-300'>Xpense</h1>
                        <p className='text-xs text-zinc-400'>API V1</p>
                        <hr className='border-zinc-500 -mx-5 mt-5'/>

                        <div className='flex flex-col gap-2 mt-5'>
                            <nav className='sidenav flex flex-col gap-5'>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 transition-colors ${
                                            isActive
                                                ? "text-zinc-400 bg-zinc-800 mx-[-20px] px-[20px] py-[10px]"
                                                : "text-zinc-100 hover:text-zinc-400"
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                    </svg>
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    to="/transactions"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 transition-colors ${
                                            isActive
                                                ? "text-zinc-400 bg-zinc-800"
                                                : "text-zinc-100 hover:text-zinc-400"  
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                    </svg>
                                    Transactions
                                </NavLink>
                            </nav>
                        </div>
                    </div>
                </div>
                )   
            }
        </>
    )
}
export default SideBar;