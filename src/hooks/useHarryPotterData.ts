// hooks/useHarryPotterData.ts
import { useState, useEffect } from "react";
import type {
  HarryPotterCharacter,
  FacultyData,
  HogwartsHouse,
} from "../types/harryPotter";

export const useHarryPotterData = () => {
  const [characters, setCharacters] = useState<HarryPotterCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://hp-api.onrender.com/api/characters"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const formattedData: HarryPotterCharacter[] = data.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (char: any, index: number) => ({
            id: char.id || `char-${index}`,
            name: char.name,
            dateOfBirth: char.dateOfBirth || null,
            house: char.house || "",
            gender: char.gender,
            species: char.species,
          })
        );

        setCharacters(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStudentsByDateRange = (
    startDate: Date | null,
    endDate: Date | null
  ): FacultyData[] => {
    const houses: HogwartsHouse[] = [
      "Gryffindor",
      "Slytherin",
      "Hufflepuff",
      "Ravenclaw",
    ];

    return houses.map((house) => {
      const count = characters.filter((char) => {
        if (char.house !== house || !char.dateOfBirth) return false;

        const birthDate = new Date(char.dateOfBirth);

        // Проверка диапазона дат
        const afterStart = !startDate || birthDate >= startDate;
        const beforeEnd = !endDate || birthDate <= endDate;

        return afterStart && beforeEnd;
      }).length;

      return { faculty: house, count };
    });
  };

  return {
    characters,
    loading,
    error,
    getStudentsByDateRange,
  };
};
