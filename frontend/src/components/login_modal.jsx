function LoginModal({
    isOpen,
    setIsOpen,
    handleSubmit,
    username,
    password,
    setUsername,
    setPassword,
    isSubmitting,
}) {
    return (
        <>
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-sm text-zinc-100"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-xl font-semibold text-zinc-100">Login</h1>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                                aria-label="Close login form"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-zinc-400 mb-1.5">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    type="text"
                                    name="username"
                                    autoComplete="username"
                                    disabled={isSubmitting}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-zinc-400 mb-1.5">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    disabled={isSubmitting}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 bg-zinc-100 text-zinc-900 rounded-md px-4 py-2 text-sm font-semibold hover:bg-zinc-300 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Logging in..." : "Login Now"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginModal;