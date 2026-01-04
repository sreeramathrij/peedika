"use client";

/**
 * ChatbotButton Component
 *
 * Floating button that opens the chatbot modal
 * Can be positioned in navbar or as a fixed button at the bottom
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ChatbotModal from "./ChatbotModal";

interface ChatbotButtonProps {
  variant?: "navbar" | "floating";
}

export default function ChatbotButton({ variant = "floating" }: ChatbotButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "navbar") {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-charcoal hover:text-eco-forest transition-colors"
          aria-label="Open chatbot"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="hidden md:inline">Chat</span>
        </button>

        <AnimatePresence>
          {isOpen && <ChatbotModal onClose={() => setIsOpen(false)} />}
        </AnimatePresence>
      </>
    );
  }

  // Floating variant
  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-eco-forest text-white rounded-full shadow-lg hover:shadow-xl hover:bg-eco-forest/90 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chatbot"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && <ChatbotModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
