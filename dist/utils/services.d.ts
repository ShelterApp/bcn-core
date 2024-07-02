declare const parseTimeStrToNormalTime: (timeStr: string) => string;
declare const getTotalWeeksInMonth: (year: number, month: number) => number;
declare const getCurrentWeekIndex: (theDate: Date) => number;
declare const calculateTimeOpenCloseService: (openSchedules?: never[], closedSchedules?: never[], targetDate?: Date) => {
    openSchedule: any;
    closedSchedule: any;
    nextOpenSchedule: any;
};
export { parseTimeStrToNormalTime, getTotalWeeksInMonth, getCurrentWeekIndex, calculateTimeOpenCloseService, };
