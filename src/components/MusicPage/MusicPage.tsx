"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
// Types for our music data
interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  isFavorite: boolean;
}

interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
  circleColor:string;
}
const MusicPage = () => {
  // State for currently playing track
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState<number[]>(Array(20).fill(0));

  // Audio visualization effect
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const newData = Array(20)
          .fill(0)
          .map(() => Math.random() * 40 + 5);
        setAudioData(newData);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioData(Array(20).fill(5));
    }
  }, [isPlaying]);

  // Sample favorite artists data
  const favoriteArtists: Artist[] = [
    {
      id: "1",
      name: "The Weeknd",
      image: "/weeknd.jpg",
      genre: "R&B / Pop",
      circleColor: "bg-[#D6061D]"
    },
    {
      id: "2",
      name: "Daft Punk",
      image: "/daftpunk.png",
      genre: "Electronic",
      circleColor: "bg-[#2A6995]"
    },
    {
      id: "3",
      name: "Kendrick Lamar",
      image: "/kendric.jpg",
      genre: "Hip-Hop",
      circleColor: "bg-[#1D2026]"
    },
    {
      id: "4",
      name: "Billie Eilish",
      image: "/billie.jpg",
      genre: "Pop",
      circleColor: "bg-[#000]"
    },
  ];

  // Sample favorite tracks data
  const favoriteTracks: Track[] = [
    {
      id: "1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      cover: "/blindinglights.jpg",
      duration: "3:20",
      isFavorite: true,
    },
    {
      id: "2",
      title: "Get Lucky",
      artist: "Daft Punk ft. Pharrell Williams",
      cover: "/getlucky.jpg",
      duration: "4:08",
      isFavorite: true,
    },
    {
      id: "3",
      title: "HUMBLE.",
      artist: "Kendrick Lamar",
      cover: "/humble.jpg",
      duration: "2:57",
      isFavorite: true,
    },
    {
      id: "4",
      title: "Bad Guy",
      artist: "Billie Eilish",
      cover: "/badguy.jpg",
      duration: "3:14",
      isFavorite: true,
    },
    {
      id: "5",
      title: "The Less I Know The Better",
      artist: "Tame Impala",
      cover: "/lesser.jpg",
      duration: "3:38",
      isFavorite: true,
    },
  ];

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Play a specific track
  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };
  return (
    <div>
      <div className="flex-1 max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <div className="border-b border-gray-200 py-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              {/* Arc decorations */}
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                className="absolute top-0 left-1/2 -translate-x-1/2"
              >
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="100"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="1"
                  opacity="0.5"
                />
              </svg>

              {/* Profile image */}
              <div className={`w-[145px] h-[145px] z-10 bg-white border-[1px] mb-6 ${borderColor.primary} rounded-full flex items-center justify-center`}>
                <div className="w-32 h-32 rounded-full shadow-inner  overflow-hidden  relative">
                  <Image
                    src="/spotify.jpg"
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                    className="scale-110"
                  />
                </div>
              </div>
            </motion.div>

            <motion.h1
              className={`text-4xl md:text-5xl font-bold text-gray-800 mb-2 ${racingSans.className}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Music
            </motion.h1>

            <motion.div
              className="flex items-center gap-2 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className={`${fontColor.secondry} font-semibold text-sm`}>
                Here&apos;s my Fav Artists and Songs
              </span>
            </motion.div>
          </div>

          {/* Audio wave visualization */}
          <motion.div
            className="flex items-end justify-center h-16 gap-[2px] mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {audioData.map((height, index) => (
              <motion.div
                key={index}
                className="w-1 bg-blue-500 rounded-t-full"
                initial={{ height: 5 }}
                animate={{ height }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Favorite Artists Section */}
        <div className="py-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Favorite Artists
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favoriteArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.1 + index * 0.1 },
                }}
              >
                <div className="relative mb-3">
                  {/* Small decorative circle */}
                  <div className={`absolute -left-3 -top-3 w-6 h-6 rounded-full ${artist.circleColor} z-0`}></div>

                  {/* Artist image */}
                  <div className="w-24 h-24 rounded-full bg-yellow-400 overflow-hidden relative z-10 border-2 border-white">
                    <Image
                      src={artist.image || "/placeholder.svg"}
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="font-medium text-gray-800">{artist.name}</h3>
                <p className="text-sm text-gray-500">{artist.genre}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Favorite Tracks Section */}
        <div className="py-8 pb-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Favorite Tracks
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-4"
          >
            {favoriteTracks.map((track, index) => (
              <motion.div
                key={track.id}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.1 + index * 0.05 },
                }}
                whileHover={{ y: -2 }}
              >
                <div
                  className={`flex items-center p-4 cursor-pointer
                      ${currentTrack?.id === track.id ? "bg-blue-50" : ""}`}
                  onClick={() => playTrack(track)}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
                    <Image
                      src={track.cover || "/placeholder.svg"}
                      alt={track.title}
                      fill
                      className="object-cover"
                    />
                    {currentTrack?.id === track.id && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        {isPlaying ? (
                          <Pause className="text-white" size={24} />
                        ) : (
                          <Play className="text-white" size={24} />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`font-medium text-lg
                          ${
                            currentTrack?.id === track.id
                              ? "text-blue-600"
                              : "text-gray-800"
                          }`}
                    >
                      {track.title}
                    </h3>
                    <p className="text-gray-500">{track.artist}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {currentTrack?.id === track.id && isPlaying && (
                      <div className="flex items-end h-8 gap-[2px]">
                        {[1, 2, 3].map((bar) => (
                          <motion.div
                            key={bar}
                            className="w-1 bg-blue-500 rounded-t-full"
                            animate={{
                              height: [5, 15, 5],
                              transition: {
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                duration: 0.8,
                                delay: bar * 0.2,
                              },
                            }}
                          />
                        ))}
                      </div>
                    )}
                    <span className="text-gray-400 text-sm">
                      {track.duration}
                    </span>
                    <Heart size={18} className="fill-red-500 text-red-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Music Player */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 z-10"
            initial={{ y: 100 }}
            animate={{ y: currentTrack ? 0 : 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between max-w-5xl mx-auto">
              <div className="flex items-center gap-4">
                {currentTrack && (
                  <>
                    <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                      <Image
                        src={currentTrack.cover || "/placeholder.svg"}
                        alt={currentTrack.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">
                        {currentTrack.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {currentTrack.artist}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <SkipBack size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <SkipForward size={20} />
                </motion.button>
              </div>

              <div className="flex items-center gap-3">
                <Heart size={20} className="fill-red-500 text-red-500" />

                <div className="flex items-center gap-2">
                  <Volume2 size={18} className="text-gray-500" />
                  <div className="w-20 h-1 bg-gray-200 rounded-full">
                    <div className="w-3/4 h-full bg-blue-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
