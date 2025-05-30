import classNames from 'classnames';
import AnimationContainer from '../utils/AnimationContainer';
import { TimelineEventProps } from '@/types';

export const Timeline = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      {children}
    </div>
  );
};

export const TimelineEvent = ({
  active,
  children,
  last
}: TimelineEventProps) => {
  return (
    <div
      className={classNames(
        'w-full flex justify-start gap-6 border-primary-700/40',
        {
          'border-l': !last,
          'pb-16': !last
        }
      )}
    >
      <div className="relative">
        <div
          className={classNames(
            'absolute top-[-2px] left-[-8.5px] w-4 h-4 rounded-full aspect-square outline-black shadow-lg',
            {
              'bg-primary-500': active,
              'bg-gray-600': !active,
              'w-3 h-3': !active,
              'left-[-5.5px]': !active
            }
          )}
        >
          {active && (
            <div
              className={classNames(
                'absolute top-0 left-0 rounded-full -z-10 w-4 h-4 bg-primary-500/70 animate-ping aspect-square'
              )}
            />
          )}
        </div>
      </div>
      <div className="mt-[-4px] flex flex-col gap-2">{children}</div>
    </div>
  );
};

const TimelineEventTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base font-semibold text-gray-200 mb-2">{children}</p>
);

const TimelineEventDescription = ({
  children
}: {
  children: React.ReactNode;
}) => <p className="text-base text-gray-300 border-l-2 border-primary-700/50 pl-4 py-1 italic leading-relaxed">{children}</p>;

TimelineEvent.Title = TimelineEventTitle;

TimelineEvent.Description = TimelineEventDescription;
