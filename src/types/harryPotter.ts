// types/harryPotter.ts
export interface HarryPotterCharacter {
  id: string;
  name: string;
  dateOfBirth: string | null;
  house: HogwartsHouse;
  gender: string;
  species: string;
}

export type HogwartsHouse =
  | "Gryffindor"
  | "Slytherin"
  | "Hufflepuff"
  | "Ravenclaw"
  | "";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface FacultyData {
  faculty: HogwartsHouse;
  count: number;
}
