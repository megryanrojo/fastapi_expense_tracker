function NavBar({user, handleLogout, setIsOpen}) {
    return (
        <div className='navbar bg-zinc-900'>
        <nav className="title bg-zinc-900 p-5 border-b border-zinc-500 flex justify-between items-center">
            <h1 className='text-xl font-bold pl-10 pt-2'>Xpense</h1>
            {user ? 
            (<>
                <div className='flex items-center gap-4'>
                <p className="font-bold capitalize">Welcome, {user.name}</p>
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
            </>)}
        </nav>
        </div>
    )
}
export default NavBar;