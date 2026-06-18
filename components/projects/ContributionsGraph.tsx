import { GitCommitHorizontal } from 'lucide-react';
import type { ContributionData, ContributionDay } from '@/lib/github-stats';

interface ContributionsGraphProps {
  data: ContributionData;
}

// Dark-theme intensity ramp, indexed by API level 0-4.
const LEVEL_COLORS = [
  'bg-gray-800',
  'bg-emerald-900',
  'bg-emerald-700',
  'bg-emerald-500',
  'bg-emerald-300'
];

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

// Weekday row labels (only odd rows shown, GitHub-style).
const WEEKDAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export default function ContributionsGraph({ data }: ContributionsGraphProps) {
  const { total, days } = data;

  // Pad leading empty cells so the first column starts on the right weekday.
  const firstWeekday = days.length > 0 ? new Date(days[0].date).getDay() : 0;
  const cells: (ContributionDay | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...days
  ];

  // Chunk into week columns of 7 days.
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  // Month label per week column — shown only when the month changes.
  let prevMonth = -1;
  const monthLabels = weeks.map((week) => {
    const firstDay = week.find((d) => d !== null);
    if (!firstDay) return '';
    const month = new Date(firstDay.date).getMonth();
    if (month !== prevMonth) {
      prevMonth = month;
      return MONTHS[month];
    }
    return '';
  });

  return (
    <div className="bg-gray-900/40 border border-gray-800/60 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800/60 bg-gray-900/60">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-200 flex items-center gap-2">
            <GitCommitHorizontal className="w-4 h-4 text-gray-400" />
            Contributions
          </h3>
          <span className="text-xs text-gray-500">
            <span className="font-semibold text-emerald-400">{total}</span> in
            the last year
          </span>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-4 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {/* Weekday labels */}
          <div className="grid grid-rows-7 gap-[3px] pt-[14px] pr-1 text-[10px] leading-[10px] text-gray-500">
            {WEEKDAYS.map((label, i) => (
              <span key={i} className="h-[11px] flex items-center">
                {label}
              </span>
            ))}
          </div>

          {/* Months + grid */}
          <div className="flex flex-col gap-1">
            {/* Month labels */}
            <div className="grid grid-flow-col auto-cols-[11px] gap-[3px] text-[10px] leading-none text-gray-500">
              {monthLabels.map((label, i) => (
                <span key={i} className="overflow-visible whitespace-nowrap">
                  {label}
                </span>
              ))}
            </div>

            {/* Squares */}
            <div className="grid grid-flow-col auto-cols-[11px] grid-rows-7 gap-[3px]">
              {cells.map((day, i) =>
                day === null ? (
                  <span key={`pad-${i}`} className="h-[11px] w-[11px]" />
                ) : (
                  <span
                    key={day.date}
                    title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                    className={`h-[11px] w-[11px] rounded-sm ring-1 ring-inset ring-white/[0.04] transition-transform hover:scale-125 ${
                      LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0]
                    }`}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-gray-500">
          <span>Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <span
              key={i}
              className={`h-[11px] w-[11px] rounded-sm ring-1 ring-inset ring-white/[0.04] ${color}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
