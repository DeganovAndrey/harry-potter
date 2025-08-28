import { format, parse } from "date-fns";

export const formDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

export const parseDateString = (dateString: string): Date | null => {
  try {
    return parse(dateString, "dd-MM-yyyy", new Date());
  } catch {
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};
