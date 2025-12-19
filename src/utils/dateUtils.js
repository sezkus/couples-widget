// Date utility functions
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, addYears, addMonths, addDays, format } from 'date-fns';
import { tr } from 'date-fns/locale';

export const calculateTimeTogether = (startDate) => {
    const now = new Date();
    const start = new Date(startDate);

    let years = differenceInYears(now, start);
    let tempDate = addYears(start, years);

    let months = differenceInMonths(now, tempDate);
    tempDate = addMonths(tempDate, months);

    let days = differenceInDays(now, tempDate);
    tempDate = addDays(tempDate, days);

    let hours = differenceInHours(now, tempDate);
    let minutes = differenceInMinutes(now, tempDate) % 60;
    let seconds = differenceInSeconds(now, tempDate) % 60;

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        totalDays: differenceInDays(now, start),
    };
};

export const formatDate = (date, formatStr = 'd MMMM yyyy') => {
    return format(new Date(date), formatStr, { locale: tr });
};

export const getDaysUntil = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);

    // Set to same year or next year
    let nextOccurrence = new Date(now.getFullYear(), target.getMonth(), target.getDate());
    if (nextOccurrence < now) {
        nextOccurrence = new Date(now.getFullYear() + 1, target.getMonth(), target.getDate());
    }

    return differenceInDays(nextOccurrence, now);
};
