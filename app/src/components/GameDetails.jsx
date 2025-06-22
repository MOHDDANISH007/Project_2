// components/GameDetails.js
import React from 'react';
import { motion } from 'framer-motion';

const GameDetails = ({ game }) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl md:text-3xl font-semibold mb-4 text-white">Game Details</h3>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 space-y-3 text-sm md:text-base">
              <div className="flex justify-between">
                <span className="font-semibold">Game Type:</span>
                <span>{game.gameType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Gameplay Hours:</span>
                <span>{game.gameplayHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Internet Required:</span>
                <span>{game.internetRequired}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">PS Plus Required:</span>
                <span>{game.psPlusRequired}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">PEGI Rating:</span>
                <span className="border border-white/10 p-2 bg-red-800">{game.pegiRating}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-3xl font-semibold mb-4 text-white">Publisher Info</h3>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 space-y-3 text-sm md:text-base">
              <div className="flex justify-between">
                <span className="font-semibold">Publisher:</span>
                <span>{game.publisher}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Developer:</span>
                <span>{game.developer}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Origin:</span>
                <span>{game.countryOfOrigin}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Release Date:</span>
                <span>{game.releaseDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameDetails;