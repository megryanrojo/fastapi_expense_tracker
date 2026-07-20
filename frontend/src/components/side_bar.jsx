import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
    {
        to: "/dashboard",
        label: "Dashboard",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
        ),
    },
    {
        to: "/transactions",
        label: "Transactions",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
        ),
    },
];

function SideBar({ sidebarOpen, setSidebarOpen }) {
    // Close on Escape for keyboard users
    useEffect(() => {
        if (!sidebarOpen) return;
        function handleKey(e) {
            if (e.key === "Escape") setSidebarOpen(false);
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [sidebarOpen, setSidebarOpen]);

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-[2px]"
                    onClick={() => setSidebarOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col animate-in slide-in-from-left duration-200"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-zinc-100 font-semibold text-lg">Xpense</h1>
                                <p className="text-xs text-zinc-500">API V1</p>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                                aria-label="Close sidebar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <hr className="border-zinc-800 -mx-5 mt-5" />

                        <nav className="flex flex-col gap-1 mt-5">
                            {navItems.map(({ to, label, icon }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                            isActive
                                                ? "bg-zinc-800 text-zinc-100"
                                                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                                        }`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 shrink-0">
                                        {icon}
                                    </svg>
                                    {label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}

export default SideBar;