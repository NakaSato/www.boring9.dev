import Image from 'next/image';

interface BlogHeaderProps {
  author: {
    name: string;
    handle: string;
    avatar?: string;
    bio?: string;
  };
  date: string;
  updatedDate?: string;
  readingTime: string;
  title?: string;
  url?: string;
  category?: string;
  tags?: string[];
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

// Compact author + meta strip shown under the article title.
export function BlogHeader({
  author,
  date,
  updatedDate,
  readingTime
}: BlogHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-gray-900">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            sizes="40px"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-bold text-primary-300">
            {author.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-100">{author.name}</div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500">
          <time dateTime={new Date(date).toISOString()}>
            {formatDate(date)}
          </time>
          {updatedDate && (
            <>
              <span className="h-1 w-1 rounded-full bg-gray-700" />
              <span>Updated {formatDate(updatedDate)}</span>
            </>
          )}
          <span className="h-1 w-1 rounded-full bg-gray-700" />
          <span>{readingTime}</span>
        </div>
      </div>
    </div>
  );
}
