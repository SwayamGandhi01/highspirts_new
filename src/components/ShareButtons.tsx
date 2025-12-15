import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Twitter, Facebook, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonsProps {
  title: string;
  description?: string;
  url?: string;
  hashtags?: string[];
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ShareButtons = ({
  title,
  description = '',
  url = typeof window !== 'undefined' ? window.location.href : '',
  hashtags = ['HighSpirits', 'IndianCuisine', 'FineFood'],
  showLabel = true,
  size = 'md',
}: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const baseText = `Check out "${title}" at High Spirits Restaurant${description ? `: ${description}` : ''}`;
  const hashtagString = hashtags.join(' ');
  const fullUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
      console.error('Copy error:', error);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${baseText} ${hashtagString}`
    )}&url=${encodeURIComponent(fullUrl)}`;
    window.open(twitterUrl, 'twitter-share', 'width=550,height=420');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}&quote=${encodeURIComponent(
      baseText
    )}`;
    window.open(facebookUrl, 'facebook-share', 'width=550,height=420');
  };

  const handleInstagramShare = () => {
    const instagramText = `Check out "${title}" at High Spirits Restaurant! ${hashtagString}
    
Visit: ${fullUrl}`;
    
    // Instagram doesn't have a direct share API, so we copy the text and show a toast
    navigator.clipboard.writeText(instagramText);
    toast.success(
      'Copied! Open Instagram and paste in a caption or story.',
      {
        description: 'Note: Share links directly via Instagram DM or post caption',
      }
    );
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';
  const buttonClass = size === 'sm' ? 'p-1.5' : size === 'md' ? 'p-2' : 'p-2.5';

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {showLabel && (
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
          Share:
        </span>
      )}

      <div className="flex gap-2">
        {/* Twitter Share Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTwitterShare}
          className={`${buttonClass} rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors group relative`}
          title="Share on Twitter"
          aria-label="Share on Twitter"
        >
          <Twitter className={iconSize} />
          {showLabel && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Twitter
            </div>
          )}
        </motion.button>

        {/* Facebook Share Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleFacebookShare}
          className={`${buttonClass} rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors group relative`}
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <Facebook className={iconSize} />
          {showLabel && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Facebook
            </div>
          )}
        </motion.button>

        {/* Instagram Share Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleInstagramShare}
          className={`${buttonClass} rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors group relative`}
          title="Share on Instagram"
          aria-label="Share on Instagram"
        >
          <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88z" />
          </svg>
          {showLabel && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Instagram
            </div>
          )}
        </motion.button>

        {/* Copy Link Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyLink}
          className={`${buttonClass} rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors group relative`}
          title="Copy link"
          aria-label="Copy link to clipboard"
        >
          {copied ? (
            <Check className={`${iconSize} text-green-500`} />
          ) : (
            <Copy className={iconSize} />
          )}
          {showLabel && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {copied ? 'Copied!' : 'Copy Link'}
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ShareButtons;
