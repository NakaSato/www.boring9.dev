import classNames from 'classnames';
import AnimationContainer from '../utils/AnimationContainer';
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
    <div
      className={classNames(
        'w-full flex justify-start gap-6 border-primary-700/40 group',
        {
          'border-l-2': !last,
          'pb-16': !last
        }
      )}
    >
      <div className="relative">
        <div
          className={classNames(
            'absolute top-[-2px] left-[-9px] w-4 h-4 rounded-full aspect-square shadow-lg transition-all duration-300 group-hover:scale-125',
            {
              'bg-gradient-to-br from-primary-400 to-primary-600 ring-4 ring-primary-500/30':
                active,
              'bg-gradient-to-br from-gray-500 to-gray-700 group-hover:from-primary-400 group-hover:to-primary-600':
                !active,
              'w-3 h-3': !active,
              'left-[-6.5px]': !active
            }
          )}
        >
          {active && (
            <>
              <div className="absolute top-0 left-0 rounded-full -z-10 w-4 h-4 bg-primary-500/70 animate-ping aspect-square" />
              <div className="absolute inset-0 rounded-full bg-white/20" />
            </>
          )}
        </div>
      </div>
      <div className="mt-[-4px] flex flex-col gap-3 flex-1">{children}</div>
    </div>
  );
};

const TimelineEventTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-bold text-white mb-2 transition-colors duration-300 group-hover:text-primary-300">
    {children}
  </h3>
);

const TimelineEventDescription = ({
  children
}: {
  children: React.ReactNode;
}) => (
  <div className="relative">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500/50 to-transparent rounded-full" />
    <p className="text-base text-gray-300 pl-5 py-2 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
      {children}
    </p>
  </div>
);

TimelineEvent.Title = TimelineEventTitle;

TimelineEvent.Description = TimelineEventDescription;
