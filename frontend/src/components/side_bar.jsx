import { useState, useEffect} from 'react';

function SideBar({sidebarOpen, setSidebarOpen}) {
    return (
        <>
            {sidebarOpen && (
                <div className="overlay bg-zinc-900/60 fixed inset-0 text-zinc-100" onClick={() => setSidebarOpen(false)}>
                    <div className='sidebar bg-zinc-900 text-zinc-100 fixed top-0 left-0 h-full w-64 p-5 z-50'>
                        <h1 className='font-xl'>test</h1>
                    </div>
                </div>
                )    
            }
        </>
    )
}
export default SideBar;