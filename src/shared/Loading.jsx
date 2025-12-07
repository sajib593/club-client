const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
      
      <div className="flex flex-col items-center gap-6 animate-fadeIn">
        
        {/* Glowing Animated Circle */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-white/20 animate-ping absolute"></div>

          <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-white animate-spin
            bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-border">
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-2xl font-bold tracking-widest animate-pulse drop-shadow-lg">
          Loading...
        </p>

        {/* Subtext */}
        <p className="text-sm opacity-80 animate-bounce">Please wait</p>
      </div>
    </div>
  );
};

export default Loading;
