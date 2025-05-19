"use client";

import { useRouter } from "next/navigation";
import { Music } from "lucide-react";
import { motion } from "framer-motion";



export function MusicButton() {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push("/favorite-music")}
      className={
        "flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-800 hover:bg-blue-50 transition-all"
      }
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Music size={18} className="text-blue-600" />
      <span>My Music</span>
    </motion.button>
  );
}
