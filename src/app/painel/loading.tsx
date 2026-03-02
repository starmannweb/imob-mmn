export default function Loading() {
    return (
        <div className="flex-1 w-full flex flex-col gap-6 animate-pulse">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
                    <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                </div>
                <div className="flex gap-2">
                    <div className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                    <div className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map(idx => (
                    <div key={idx} className="bg-white dark:bg-[#1b253b] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-32 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                        </div>
                        <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded-md mt-4"></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-[#1b253b] border border-slate-200 dark:border-slate-800 rounded-2xl h-80 p-6 flex flex-col">
                    <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-md mb-6 block"></div>
                    <div className="flex-1 bg-slate-100 dark:bg-[#0f172a]/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 w-full"></div>
                </div>

                <div className="lg:col-span-1 bg-white dark:bg-[#1b253b] border border-slate-200 dark:border-slate-800 rounded-2xl h-80 p-6">
                    <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-md mb-6 block"></div>
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3, 4].map(idx => (
                            <div key={idx} className="flex gap-4 items-center">
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                                    <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
