export interface WeekInterface {
    week: number;
    startdate: string;
    enddate: string;
}

export const getCurrentWeek = (weeks: WeekInterface[]): number | null => {
  const today = new Date(); //gives current date

  for (const week of weeks) {
    const start = new Date(week.startdate);
    const end = new Date(week.enddate);
    if (today >= start && today <= end) {
      return week.week;
    }
  }
  return null;
};
