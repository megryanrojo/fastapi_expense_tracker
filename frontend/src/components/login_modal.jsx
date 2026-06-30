function LoginModal({isOpen, setIsOpen, handleSubmit, username, password, setUsername, setPassword}) {
    return (
        <>
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
        </>
    )
}
export default LoginModal;