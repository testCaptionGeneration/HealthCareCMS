export const Loader = ({ className }: { className?: string }) => {
    return (
        <div className={`flex flex-col gap-2 my-2 ${className}`}>
            <div className="flex flex-col gap-2 mx-auto w-full max-w-[1000px] px-4">
                {/* Large bar */}
                <div className="animate-pulse bg-gray-300 w-full h-3 rounded-full"></div>
                {/* Smaller bar */}
                <div className="animate-pulse bg-gray-300 w-1/2 h-3 rounded-full"></div>
            </div>
        </div>
    );
};
