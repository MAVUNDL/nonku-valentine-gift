"use client"

export default function NextPageButton(){
    const scrollToContent = () => {
        // This looks for an element with id="about" (we will add this to your page next)
        const nextSection = document.getElementById('about');

        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <button
            onClick={scrollToContent}
            className="group flex h-[52px] w-[160px] justify-center items-center gap-2 rounded-full
            bg-white/5 backdrop-blur-md border border-white/10
            transition-all duration-300 ease-in-out
            hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
            active:scale-95"
        >
            <span className="text-sm font-medium text-white/90">See more</span>

            {/* Animated Arrow */}
            <svg
                className="w-4 h-4 text-white/70 transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    )
}