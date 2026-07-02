function DashboardNav({user, handleLogout, handleSidebarToggle}) {
    return (
        <>
            <div className='navbar bg-zinc-900 text-zinc-100'>
                <nav className="title bg-zinc-900 p-5 border-b border-zinc-500 flex justify-between items-center">
                    <div className='flex items-center gap-4'>
                        <button className='text-zinc-100 hover:text-zinc-400 transition-colors cursor-pointer' onClick={() => handleSidebarToggle()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                        <h1 className='text-xl font-bold'>Xpense</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="font-bold capitalize">Welcome, {user?.name}</p>
                        <button 
                            className='border border-zinc-500 rounded-md px-5 py-1 text-base hover:bg-zinc-800 cursor-pointer'
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            </div>
        </>
    )
}
export default DashboardNav;