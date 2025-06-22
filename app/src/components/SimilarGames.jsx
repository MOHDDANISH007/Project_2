// components/SimilarGames.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SimilarGames = ({ games, platform }) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full"
    >
      <div className="px-4 py-8 md:px-8 md:py-12 w-full">
        <h1 className="text-2xl md:text-4xl font-bold mb-8 text-white text-center tracking-tight">
          Games You'll Love
        </h1>

        <div className="flex gap-6 overflow-x-auto scroll scrollbar-custom px-4 py-2 snap-x snap-mandatory">
          {games?.map((game, index) => (
            <div
              key={index}
              className="min-w-[260px] sm:min-w-[320px] flex-shrink-0 bg-gray-800/70 backdrop-blur-md rounded-2xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 snap-start group"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-[360px] sm:h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-blue-300 group-hover:text-blue-400 transition-colors duration-200">
                {game.name}
              </h2>
              <p className="text-sm md:text-base text-gray-400 mt-2 line-clamp-3">
                {game.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-base md:text-lg font-medium text-white">₹{game.price}</p>
                <Link to={`/games/${platform}/${game.id}`}>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SimilarGames;