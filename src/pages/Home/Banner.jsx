import { motion } from "motion/react"
import { Link } from "react-router";

const Banner = () => {
    return (
        <motion.section
      className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center text-center rounded-2xl overflow-hidden"
      style={{
        backgroundImage: `url('https://previews.123rf.com/images/enterline/enterline1503/enterline150300009/37057163-the-word-clubs-written-in-vintage-metal-letterpress-type-in-a-wooden-drawer-with-dividers.jpg')`,
        // Replace with your actual image path
      }}
    
       initial={{ scale: 1.1, filter: "brightness(0.7)" }}
      animate={{ scale: 1, filter: "brightness(1)" }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <motion.div className="relative z-10 max-w-4xl mx-auto px-4"
      
      initial={{ height: 20 }}
  animate={{ height: "auto" }}
  transition={{delay: .3}}

      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Clubs Grow Your Confidence
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
          See all clubs and join
        </p>

        {/* Two Buttons */}
        <div 
        className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link to='/dashboard/showAllEvents'>
          
          <motion.button

           initial={{ y: 20 }}
  animate={{ y: 2 }}
  whileHover={{ scale: 1.5 }}
  whileTap={{ scale: 0.9 }}

           className="bg-blue-600 hover:bg-mint-500 text-white font-medium py-3 px-8 rounded-lg transition duration-200 shadow-md">
            All Events
          </motion.button>

          </Link>
          

          
          
        <Link to='/clubCards'>
      
       <motion.button 
        
          
           initial={{ y: 20 }}
  animate={{ y: 5 }}
  whileHover={{ scale: 1.5 }}
  whileTap={{ scale: 0.9 }}

          className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-8 rounded-lg transition duration-200 shadow-md">
            
           All Clubs
          </motion.button>

      </Link>
         
        </div>
      </motion.div>
    </motion.section>
    );
};

export default Banner;