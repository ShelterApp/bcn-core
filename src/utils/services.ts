/* tslint:disable */
const mappingDayPeriod: any = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

const mappingMonthPeriod: any = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
  LAST: 6,
};

const swap = (json: any) => {
  const ret: any = {};
  for (const key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

// * Shared functions
const parseTimeStrToNormalTime = (timeStr: string) => {
  const [hourMin, temp] = timeStr.split(' ');
  const bonus = temp === 'PM' ? 12 : 0;
  const [defaultHour, min] = hourMin.split(':');

  let hour = defaultHour === '12' ? '0' : defaultHour;
  return `${+hour + bonus}:${+min}`;
}

const getWeeksStartAndEndInMonth = (year: number, month: number) => {
  const dayStart = 'monday'; // * Start by monday
  
  let weeks = [],
      firstDate = new Date(year, month, 1),
      lastDate = new Date(year, month + 1, 0),
      numDays = lastDate.getDate();

  let start = 1;
  let end = 7 - firstDate.getDay();
  if (dayStart === 'monday') {
      if (firstDate.getDay() === 0) {
          end = 1;
      } else {
          end = 7 - firstDate.getDay() + 1;
      }
  }

  while (start <= numDays) {
      weeks.push({start: start, end: end});
      start = end + 1;
      end = end + 7;
      end = start === 1 && end === 8 ? 1 : end;
      if (end > numDays) {
          end = numDays;
      }
  }

  return weeks;
}

const getTotalWeeksInMonth = (year: number, month: number) => {
  return (getWeeksStartAndEndInMonth(year, month) || []).length;
};

const getCurrentWeekIndex = (theDate: Date) => {
  const date = new Date(theDate);
  const currentDate = date.getDate();
  return (getWeeksStartAndEndInMonth(date.getFullYear(), date.getMonth())).findIndex(item => item.start >= currentDate && currentDate <= item.end);
};

// * ------------- END SHARED FUNCTIONS
const getOpenService = (openSchedules = [] as any, targetDate: any) => {
  const fullSchedules = openSchedules.filter((schedule: any) => schedule.type === 'FULL_DAY');
  const weeklySchedules = openSchedules.filter((schedule: any) => schedule.type === 'WEEKLY');
  const monthlySchedules = openSchedules.filter((schedule: any) => schedule.type === 'MONTHLY');
  const dateRangeSchedules = openSchedules.filter((schedule: any) => schedule.type === 'DATE_RANGE');

  const getOpenFullDay = () => {
    return fullSchedules[0];
  };

  const getOpenWeekly = () => {
    return weeklySchedules.find((date: any) => {
      const startDate = new Date(date.startTime);
      const endDate = new Date(date.endTime);
      return (targetDate > startDate) && (targetDate < endDate);
    });
  };

  const getOpenMonthly = () => {
    const currentDateTime = new Date();
    const totalWeekInMonth = getTotalWeeksInMonth(currentDateTime.getFullYear(), currentDateTime.getMonth());
    const weekIndex = getCurrentWeekIndex(currentDateTime);
    const swapMappingMonthlyPeriod = swap(mappingMonthPeriod);

    // filter the 
    return monthlySchedules.filter((date: any) => {
      if (weekIndex === totalWeekInMonth) {
        return (date.period === swapMappingMonthlyPeriod[weekIndex]) || (date.period === swapMappingMonthlyPeriod[6]); // * 6 is LAST
      }

      // console.log(date.period, swapMappingMonthlyPeriod[weekIndex]);

      return date.period === swapMappingMonthlyPeriod[weekIndex];
    }).find((date: any) => {
      const currentDayIndex = (new Date()).getDay() || 7;
      const startDate = new Date(date.startTime);
      const endDate = new Date(date.endTime);
      return currentDayIndex === mappingDayPeriod[date.day] && (targetDate > startDate) && (targetDate < endDate);
    });
  };

  const getOpenDateRange = () => {
    return dateRangeSchedules.find((date: any) => {
      const startDate = new Date(date.startTime);
      const endDate = new Date(date.endTime);
      return (targetDate > startDate) && (targetDate < endDate);
    });
  };

  // * FOr weekly
  const isOpen = getOpenFullDay() || getOpenDateRange() || getOpenWeekly() || getOpenMonthly();
  // const isOpen = getOpenDateRange();

  return isOpen;
};

const getNextOpenSchedule = (openSchedules = [] as any, targetDate: any) => {
  if (openSchedules.length === 1 && openSchedules[0].type === 'WEEKLY') {
    return openSchedules[0];
  }

  const weeklySchedules = openSchedules.filter((schedule: any) => schedule.type === 'WEEKLY');
  const monthlySchedules = openSchedules.filter((schedule: any) => schedule.type === 'MONTHLY');

  const sortByStartDate = (schedules: any) => {
    return schedules.sort((obj1: any, obj2: any) => {
      const objDate1: any = new Date(obj1.startTime);
      const objDate2: any = new Date(obj2.startTime);
      return objDate1 - objDate2;
    });
  }

  const getNextOpenWeeklySchedule = () => {
    // * Sort by start Date
    const sortSchedules = sortByStartDate(weeklySchedules);

    return sortSchedules.find((date: any) => {
      const startDate = new Date(date.startTime);

      return startDate > targetDate;
    });
  }

  const getNextOpenMonthlySchedule = () => {
    const sortSchedules = sortByStartDate(monthlySchedules);

    return sortSchedules.find((date: any) => {
      const startDate = new Date(date.startTime);
      return startDate > targetDate;
    });
    // const transform = monthlySchedules.map();
  };

  const bestNextSchedules = sortByStartDate([
    getNextOpenWeeklySchedule(),
    getNextOpenMonthlySchedule(),
  ])

  return bestNextSchedules[0];
};

const groupBy = (items: any, key: any) => items.reduce(
  (result: any, item: any) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);

const transformOpenSchedule = (schedules = [] as any) => {
  const fullDaySchedules = schedules.filter((schedule: any) => schedule.type === 'FULL_DAY');
  const weeklySchedules = schedules.filter((schedule: any) => schedule.type === 'WEEKLY');
  const monthlySchedules = schedules.filter((schedule: any) => schedule.type === 'MONTHLY');
  const dateRangeSchedules = schedules.filter((schedule: any) => schedule.type === 'DATE_RANGE');

  const weeklySchedulesGroupByDayObj = groupBy(weeklySchedules, 'day');

  // * Check & merge object if some start date have the end Time at 59 and next time at 00
  const newWeeklyObj: any = {};
  for (const day in weeklySchedulesGroupByDayObj) {
    if (!newWeeklyObj[day]) {
      newWeeklyObj[day] = [];
    }

    let isMerge = false;
    for (const index in weeklySchedulesGroupByDayObj[day]) {
      const scheduleInDay = weeklySchedulesGroupByDayObj[day][index];

      if (isMerge) { // * Skip the rest if we had 1 case for merge
        continue;
      }

      const scheduleDateTime = new Date(scheduleInDay.endTime);
      const endTimeAtHour = scheduleDateTime.getHours();
      const endTimeAtMin = scheduleDateTime.getMinutes();
      if (endTimeAtHour === 23 && endTimeAtMin === 59) {
        // * Do things here
        const nextOpenTimeInDay = weeklySchedulesGroupByDayObj[day][index + 1];

        if (nextOpenTimeInDay) {
          const nextScheduleOpenDateTime = new Date(nextOpenTimeInDay.startTime);
          const nextStartTimeAtHour = nextScheduleOpenDateTime.getHours();
          const nextStartTimeAtMin = nextScheduleOpenDateTime.getMinutes();

          if (nextStartTimeAtHour === 0 && nextStartTimeAtMin === 0) {
            // * Merge here
            isMerge = true;

            const newEndTime = new Date(nextOpenTimeInDay.endTime);

            newWeeklyObj[day].push({
              ...scheduleInDay,
              endTime: new Date(newEndTime.setDate(newEndTime.getDate() + 1)),
            });

            continue;
          }
        }
      }
      newWeeklyObj[day].push(scheduleInDay);
    }
  }

  const transformWeekly = Object.keys(newWeeklyObj).reduce((list: any, dateKey: any) => {
    for (const date of newWeeklyObj[dateKey]) {
      list.push(date);
    }

    return list;
  }, []);

  return [
    ...fullDaySchedules,
    ...transformWeekly,
    ...monthlySchedules,
    ...dateRangeSchedules,
  ];
};

const convertHourToDateTime = (schedules = []) => {
  const weeklySchedules = schedules.filter((schedule: any) => schedule.type === 'WEEKLY');
  const monthlySchedules = schedules.filter((schedule: any) => schedule.type === 'MONTHLY');
  const dateRangeSchedules = schedules.filter((schedule: any) => schedule.type === 'DATE_RANGE');

  const currentDateTime = new Date();
  const currentDayIndex = currentDateTime.getDay() || 7; // * if SUNDAY -> 7
  const weekIndex = getCurrentWeekIndex(currentDateTime);

  const convertForWeekly = (time: string, day: string) => {
    const [hour, min] = time.split(':');
    const targetDate = new Date();

    targetDate.setHours(+hour);
    targetDate.setMinutes(+min);

    if (currentDayIndex > mappingDayPeriod[day]) {
      const diffDay = 7 - currentDayIndex;
      targetDate.setDate(targetDate.getDate() + diffDay + mappingDayPeriod[day]);
    } else if (mappingDayPeriod[day] > currentDayIndex) {
      const diffDay = mappingDayPeriod[day] - currentDayIndex;
      targetDate.setDate(targetDate.getDate() + diffDay);
    }

    return targetDate;
  };

  const convertForMonthly = (period: string, time: string, day: string) => {
    const [hour, min] = time.split(':');
    const targetDate = new Date();

    targetDate.setHours(+hour);
    targetDate.setMinutes(+min);

    if (mappingMonthPeriod[period] === weekIndex) {
      if (currentDayIndex > mappingDayPeriod[day]) {
        const diffDay = 7 - currentDayIndex;

        targetDate.setDate(targetDate.getDate() + diffDay + mappingDayPeriod[day]);
      } else if (mappingDayPeriod[day] > currentDayIndex) {
        const diffDay = mappingDayPeriod[day] - currentDayIndex;
        targetDate.setDate(targetDate.getDate() + diffDay);
      }
    } else if (mappingMonthPeriod[period] > weekIndex) {
      const diffDay = 7 - currentDayIndex;
      const diffWeek = mappingMonthPeriod[period] - weekIndex;
      const totalDiffDay = diffDay + (diffWeek * mappingDayPeriod[day]);

      targetDate.setDate(targetDate.getDate() + totalDiffDay);
    } else if (weekIndex > mappingMonthPeriod[period]) {
      targetDate.setMonth(targetDate.getMonth() + 1);
      targetDate.setDate(1);

      const diffWeeks = mappingMonthPeriod[period] - 1;
      targetDate.setDate(targetDate.getDate() + ((diffWeeks * 7) * mappingDayPeriod[day]));
    };

    return targetDate;
  };

  const transformWeekly = weeklySchedules.map((schedule: any) => {
    return {
      ...schedule,
      startTime: convertForWeekly(schedule.startTime, schedule.day),
      endTime: convertForWeekly(schedule.endTime, schedule.day),
    }
  });

  const transformMonthly = monthlySchedules.map((schedule: any) => {
    return {
      ...schedule,
      startTime: convertForMonthly(schedule.period, schedule.startTime, schedule.day),
      endTime: convertForMonthly(schedule.period, schedule.endTime, schedule.day),
    }
  });

  const transformDateRange = dateRangeSchedules.map((schedule: any) => {
    const startTime = new Date(schedule.startDate);
    const endTime = new Date(schedule.endDate);

    const [startHour = 0, startMin = 0] = schedule.startTime.split(':');
    const [endHour = 0, endMin = 0] = schedule.endTime.split(':');

    startTime.setHours(+startHour);
    startTime.setMinutes(+startMin);

    endTime.setHours(+endHour);
    endTime.setMinutes(+endMin);

    return {
      ...schedule,
      startTime,
      endTime,
    };
  });

  return [
    ...transformWeekly,
    ...transformMonthly,
    ...transformDateRange,
  ];
}

const transformScheduleDateTime = (schedules = [] as any) => {
  const normalSchedules = schedules.map((date: any) => {
    return {
      ...date,
      startTime: date.startTime ? parseTimeStrToNormalTime(date.startTime) : undefined,
      endTime: date.endTime ? parseTimeStrToNormalTime(date.endTime) : undefined,
    };
  });

  const convertSchedules: any = convertHourToDateTime(normalSchedules);

  const transformSchedules = transformOpenSchedule(convertSchedules);
  return transformSchedules;
}

const mergeOpenAndClosedSchedule = (openSchedule = {} as any, closedSchedule = {} as any) => {
  const currentDateTime = new Date();

  if (openSchedule.startTime >= closedSchedule.startTime && closedSchedule.endTime >= openSchedule.endTime) {
    return {
      openSchedule: {},
      closedSchedule: {},
    };
  }

  if (closedSchedule.startTime > openSchedule.startTime && openSchedule.endTime > closedSchedule.endTime) {
    return {
      openSchedule: {
        ...openSchedule,
        endTime: closedSchedule.startTime,
      },
      closedSchedule,
    };
  }

  if (closedSchedule.startTime >= openSchedule.startTime && openSchedule.endTime > closedSchedule.endTime) {
    const newStartTime = closedSchedule.endTime;
    if (newStartTime > currentDateTime) {
      return {
        openSchedule: {},
        closedSchedule,
        nextOpenSchedule: {
          ...openSchedule,
          startTime: newStartTime,
        },
      };
    }

    return {
      openSchedule: {
        ...openSchedule,
        startTime: newStartTime,
      },
      closedSchedule,
    };
  }

  if (openSchedule.startTime >= closedSchedule.startTime && closedSchedule.endTime > openSchedule.endTime) {
    return {
      openSchedule: {
        ...openSchedule,
        endTime: closedSchedule.startTime,
      },
      closedSchedule,
    };
  }

  if (closedSchedule.startTime >= openSchedule.startTime && closedSchedule.endTime >= openSchedule.endTime) {
    return {
      openSchedule: {},
      closedSchedule: {},
    };
  }

  return {
    openSchedule,
    closedSchedule,
  };
};

const calculateTimeOpenCloseService = (openSchedules = [], closedSchedules = [], targetDate = new Date()) => {
  // console.log('@targetDate', targetDate);
  const transformOpenSchedules = transformScheduleDateTime(openSchedules);
  const transformClosedSchedules = transformScheduleDateTime(closedSchedules);

  const openSchedule = getOpenService(transformOpenSchedules, targetDate);
  const closedSchedule = getOpenService(transformClosedSchedules, targetDate);
  const nextOpenSchedule = getNextOpenSchedule(transformOpenSchedules, targetDate);


  if (openSchedule && closedSchedule) {
    return {
      nextOpenSchedule,
      ...mergeOpenAndClosedSchedule(openSchedule, closedSchedule),
    }
  }

  return {
    openSchedule,
    closedSchedule,
    nextOpenSchedule,
  }
};

export {
  parseTimeStrToNormalTime,
  getTotalWeeksInMonth,
  getCurrentWeekIndex,
  calculateTimeOpenCloseService,
};