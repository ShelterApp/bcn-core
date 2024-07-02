import { User } from '../users';

enum ScheduleType {
    Weekly = 'WEEKLY',
    Monthly = 'MONTHLY',
    DateRange = 'DATE_RANGE',
    FullDay = 'FULL_DAY',
    PermanentlyClosed = 'PERMANENTLY_CLOSED',
}

enum ServiceType {
    Food = 'FOOD',
    Shelter = 'SHELTER',
    Health = 'HEALTH',
    Resources = 'RESOURCES',
    Education = 'EDUCATION',
}

enum ScheduleCategory {
    Men = 'MEN',
    Women = 'WOMEN',
    Kids = 'KIDS',
    Seniors = 'SENIORS',
    Disabled = 'DISABLED',
    Families = 'FAMILIES',
    Lgbt = 'LGBT',
    All = 'ALL',
}

enum MonthPeriod {
    First = 'FIRST',
    Second = 'SECOND',
    Third = 'THIRD',
    Fourth = 'FOURTH',
    Fifth = 'FIFTH',
    Last = 'LAST',
}

enum DayPeriod {
    Monday = 'MONDAY',
    Tuesday = 'TUESDAY',
    Wednesday = 'WEDNESDAY',
    Thursday = 'THURSDAY',
    Friday = 'FRIDAY',
    Saturday = 'SATURDAY',
    Sunday = 'SUNDAY',
}

interface WeeklySchedule {
  readonly day: DayPeriod;
  readonly startTime?: string;
  readonly endTime?: string;
  readonly startTimeSeconds?: number;
  readonly endTimeSeconds?: number;
  readonly type: ScheduleType.Weekly;
}

interface MonthlySchedule {
  readonly day: DayPeriod;
  readonly period: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly startTimeSeconds?: number;
  readonly endTimeSeconds?: number;
  readonly type: ScheduleType.Monthly;
}

interface DateRangeSchedule {
  readonly startDate: string;
  readonly endDate: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly startTimeSeconds?: number;
  readonly endTimeSeconds?: number;
  readonly type: ScheduleType.DateRange;
}

interface FullDaySchedule {
  readonly type: ScheduleType.FullDay;
}

interface PermanentClosedSchedule {
  readonly type: ScheduleType.PermanentlyClosed;
}

interface ServiceLocation {
  readonly type?: string;
  readonly coordinates?: readonly [number, number];
}

interface Service {
  readonly _id?: string;
  readonly id?: string;
  readonly name?: string;
  readonly distances?: string;
  readonly distance?: number;
  readonly description?: string;
  readonly address1?: string;
  readonly address2?: string;
  readonly country?: string;
  readonly city?: string;
  readonly state?: string;
  readonly isApproved?: boolean;
  readonly approvedAt?: Date;
  readonly category?: readonly ScheduleCategory[];
    // tslint:disable-next-line:max-line-length max-union-size
  readonly schedules?: // tslint:disable-next-line:max-union-size
    | readonly WeeklySchedule[]
        | readonly MonthlySchedule[]
        | readonly DateRangeSchedule[]
        | readonly FullDaySchedule[];
    // tslint:disable-next-line:max-line-length max-union-size
  readonly closeSchedules?: // tslint:disable-next-line:max-union-size
    | readonly WeeklySchedule[]
        | readonly MonthlySchedule[]
        | readonly DateRangeSchedule[]
        | readonly PermanentClosedSchedule[];
  readonly likes?: number; // * Not This
  readonly location?: ServiceLocation;
  readonly isSelectedAll?: boolean;
  readonly type?: readonly ServiceType[];
  readonly serviceSummary?: string;
  readonly isShowFlag?: boolean;
  readonly isShowDonate?: boolean;
  readonly isContact?: boolean;
  readonly user?: string | User; // * Not This
  readonly contactEmail?: string;
  readonly website?: string;
  readonly facebook?: string;
  readonly twitter?: string;
  readonly instagram?: string;
  readonly youtube?: string;
  readonly zip?: string;
  readonly phone?: string;
  readonly age?: string;
  readonly userEmail?: string;
  readonly managedUsers?: readonly string[] | readonly User[];
  readonly totalBeds?: number;
  readonly availableBeds?: number;
  readonly isCriticalHeader?: boolean;
  readonly criticalDescription?: string;
  readonly criticalExpiredAt?: Date;
  readonly isCriticalNeverExpire?: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export {
    Service,
    ScheduleType,
    ServiceType,
    ScheduleCategory,
    WeeklySchedule,
    MonthlySchedule,
    MonthPeriod,
    DayPeriod,
    DateRangeSchedule,
    FullDaySchedule,
    PermanentClosedSchedule,
};
