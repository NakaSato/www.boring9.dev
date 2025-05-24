import { Clock } from 'lucide-react';
import Image from 'next/image';

interface BlogHeaderProps {
  author: {
    name: string;
    handle: string;
    avatar?: string;
  };
  date: string;
  updatedDate?: string;
  readingTime: string;
}

export function BlogHeader({
  author,
  date,
  updatedDate,
  readingTime
}: BlogHeaderProps) {
  return (
    <div className="flex flex-col gap-3 xs:gap-4 md:gap-6 border-b border-border/40 pb-3 xs:pb-4 md:pb-6 mobile:mx-4" style={{
      // Chrome optimization: Blog header container
      contain: "layout style",
      transform: "translateZ(0)"
    }}>
      {/* Author and Date Section */}
      <div className="flex items-start xs:items-center justify-between flex-col xs:flex-row gap-3 xs:gap-4" style={{
        // Chrome optimization: Author section
        contain: "layout style"
      }}>
        <div className="flex items-center gap-2 xs:gap-3">
          {author.avatar ? (
            <Image
              src={author.avatar || '/placeholder.svg'}
              alt={author.name}
              width={32}
              height={32}
              className="rounded-full xs:w-10 xs:h-10 md:w-12 md:h-12 flex-shrink-0"
              style={{
                // Chrome optimization: Avatar image
                willChange: "transform",
                transform: "translateZ(0)"
              }}
            />
          ) : (
            <div className="w-8 h-8 xs:w-10 xs:h-10 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0" style={{
              // Chrome optimization: Avatar placeholder
              transform: "translateZ(0)"
            }}>
              <span className="text-sm xs:text-lg font-medium text-muted-foreground">
                {author.name[0]}
              </span>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="font-medium xs:font-semibold text-sm xs:text-base text-foreground truncate">{author.name}</div>
            <div className="text-xs xs:text-sm text-muted-foreground truncate">{author.handle}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs xs:text-sm text-muted-foreground hidden sm:inline">Share:</span>
          <div className="flex gap-1 xs:gap-2" style={{
            // Chrome optimization: Social buttons container
            contain: "layout"
          }}>
            <button
              className="p-1.5 xs:p-2 rounded-full hover:bg-muted transition-colors touch-target"
              aria-label="Share on X (Twitter)"
              style={{
                // Chrome optimization: Social button
                willChange: "background-color",
                transform: "translateZ(0)"
              }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 xs:w-5 xs:h-5 fill-current" style={{
                // Chrome optimization: SVG icons
                shapeRendering: "geometricPrecision"
              }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button
              className="p-1.5 xs:p-2 rounded-full hover:bg-muted transition-colors touch-target"
              aria-label="Share on Facebook"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 xs:w-5 xs:h-5 fill-current">
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
              </svg>
            </button>
            <button
              className="p-1.5 xs:p-2 rounded-full hover:bg-muted transition-colors touch-target"
              aria-label="Share on LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 xs:w-5 xs:h-5 fill-current">
                <path d="M20.47 2H3.53a1.45 1.45 0 0 0-1.47 1.43v17.14A1.45 1.45 0 0 0 3.53 22h16.94a1.45 1.45 0 0 0 1.47-1.43V3.43A1.45 1.45 0 0 0 20.47 2ZM8.09 18.74h-3v-9h3v9ZM6.59 8.48a1.56 1.56 0 1 1 0-3.12 1.57 1.57 0 1 1 0 3.12Zm12.32 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0 0 12.85 13a2 2 0 0 0-.1.73v5h-3v-9h3V11a3 3 0 0 1 2.71-1.5c2 0 3.45 1.29 3.45 4.06v5.18Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Date and Reading Time */}
      <div className="flex items-center gap-2 text-xs xs:text-sm text-muted-foreground flex-wrap">
        <time dateTime={new Date(date).toISOString()}>{date}</time>
        {updatedDate && (
          <>
            <span className="hidden xs:inline">|</span>
            <span className="text-xs">Updated {updatedDate}</span>
          </>
        )}
        <span className="hidden xs:inline">|</span>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 xs:w-4 xs:h-4" />
          <span>{readingTime}</span>
        </div>
      </div>
    </div>
  );
}
