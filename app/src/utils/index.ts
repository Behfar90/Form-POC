export const convertDateToISO = (date: string): string =>
  new Date(date).toISOString();

export const convertToLocaleDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
