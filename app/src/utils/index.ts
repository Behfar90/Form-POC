import type { MemberType } from "../types";

export const convertDateToISO = (date: string): string =>
  new Date(date).toISOString();

export const convertToLocaleDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export const getMemberTypeName = (
  id: string,
  memberTypes: MemberType[],
): string => memberTypes.find((m) => m.id === id)?.name ?? id;
