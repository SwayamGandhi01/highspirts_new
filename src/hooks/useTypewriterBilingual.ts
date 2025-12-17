import { useState, useEffect } from 'react';

interface UseTypewriterBilingualProps {
  englishText: string;
  punjabiFadeText?: string;
  englishTypingSpeed?: number;
  punjabiFadeDelay?: number;
  autoStart?: boolean;
}

export const useTypewriterBilingual = ({
  englishText,
  punjabiFadeText = '',
  englishTypingSpeed = 50,
  punjabiFadeDelay = 500,
  autoStart = true,
}: UseTypewriterBilingualProps) => {
  const [displayedEnglish, setDisplayedEnglish] = useState('');
  const [showPunjabi, setShowPunjabi] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!autoStart) return;

    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout;

    // Typing animation for English text
    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (currentIndex <= englishText.length) {
          setDisplayedEnglish(englishText.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
          
          // Fade in Punjabi text after delay
          const fadeTimeout = setTimeout(() => {
            setShowPunjabi(true);
          }, punjabiFadeDelay);

          return () => clearTimeout(fadeTimeout);
        }
      }, englishTypingSpeed);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
    };
  }, [englishText, englishTypingSpeed, punjabiFadeDelay, autoStart]);

  return {
    displayedEnglish,
    showPunjabi,
    isTypingComplete,
  };
};



