function NavBar({ user, handleLogout, setIsOpen, handleSidebarToggle }) {
    return (
        <div className="navbar bg-zinc-900 text-zinc-100">
            <nav className="title bg-zinc-900 px-5 py-4 border-b border-zinc-800 flex justify-between items-center">
                {user ? (
                    <>
                        <div className="flex items-center gap-4">
                            <button
                                className="text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
                                onClick={() => handleSidebarToggle()}
                                aria-label="Toggle sidebar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <h1 className="text-xl font-semibold tracking-tight">Xpense</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-sm text-zinc-400">
                                Welcome, <span className="font-medium text-zinc-100 capitalize">{user.name}</span>
                            </p>
                            <button
                                className="border border-zinc-700 rounded-md px-4 py-1.5 text-sm font-medium text-zinc-100 hover:bg-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-xl font-semibold tracking-tight">Xpense</h1>
                        <button
                            className="border border-zinc-700 rounded-md px-4 py-1.5 text-sm font-medium text-zinc-100 hover:bg-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        >
                            Login
                        </button>
                    </>
                )}
            </nav>
        </div>
    );
}

export default NavBar;