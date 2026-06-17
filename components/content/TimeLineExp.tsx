import classNames from 'classnames';
import { TimelineEventProps } from '@/types';

export const Timeline = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>;
};

export const TimelineEvent = ({
  active,
  children,
  last
}: TimelineEventProps) => {
  return (
    <div className={classNames('relative pl-8 group', { 'pb-14': !last })}>
      {/* Vertical rail */}
      {!last && (
        <span
          aria-hidden
          className="absolute left-0 top-2 bottom-0 w-px bg-white/10"
        />
      )}

      {/* Marker */}
      <span
        aria-hidden
        className={classNames(
          'absolute left-[-5px] top-1.5 w-[11px] h-[11px] rounded-full ring-4 ring-gray-950 transition-transform duration-300 group-hover:scale-125',
          active ? 'bg-primary-400' : 'bg-gray-600 group-hover:bg-primary-400'
        )}
      >
        {active && (
          <span className="absolute inset-0 rounded-full bg-primary-400/70 animate-ping" />
        )}
      </span>

      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};

const TimelineEventTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">{children}</div>
);

const TimelineEventDescription = ({
  children
}: {
  children: React.ReactNode;
}) => (
  <p className="max-w-xl text-base text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
    {children}
  </p>
);

TimelineEvent.Title = TimelineEventTitle;

TimelineEvent.Description = TimelineEventDescription;
