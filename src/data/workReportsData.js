  // workReportsData.js
  import { differenceInMinutes } from "date-fns";

  const WORK_TYPES = ["Project", "Maintenance", "Others"];
  const CLIENTS = ["ABC Corp", "XYZ Ltd", "Tech Solutions", "Global Systems", "Data Pro", "Cloud Services"];
  const COUNTRIES = ["United States", "India", "United Kingdom", "Germany", "Singapore", "Australia"];
  const CITIES = {
    "United States": ["New York", "San Francisco", "Chicago", "Dallas"],
    "India": ["Mumbai", "Delhi", "Bangalore", "Chennai"],
    "United Kingdom": ["London", "Manchester", "Birmingham"],
    "Germany": ["Berlin", "Frankfurt", "Munich"],
    "Singapore": ["Singapore"],
    "Australia": ["Sydney", "Melbourne", "Perth"]
  };
  const DATA_CENTERS = ["Data Center 1", "Data Center 2", "Data Center 3", "Data Center 4"];

  export const generateWorkReportsData = () => {
    return Array.from({ length: 50 }, (_, i) => {
      const startHour = 8 + (i % 5);
      const endHour = startHour + ((i % 5) + 1);

      const dateStr = `2025-09-${String((i % 30) + 1).padStart(2, "0")}`;
      const startTime = `${String(startHour).padStart(2, "0")}:00`;
      const endTime = `${String(endHour).padStart(2, "0")}:00`;

      const startDateTime = new Date(`${dateStr}T${startTime}`);
      const endDateTime = new Date(`${dateStr}T${endTime}`);
      const durationMinutes = differenceInMinutes(endDateTime, startDateTime);
      const duration = (durationMinutes / 60).toFixed(1);

      const country = COUNTRIES[i % COUNTRIES.length];
      const city = CITIES[country][i % CITIES[country].length];
      const client = CLIENTS[i % CLIENTS.length];
      const dataCenter = DATA_CENTERS[i % DATA_CENTERS.length];

      const additionalFTsCount = i % 6;
      const additionalFTsNames = Array.from({ length: additionalFTsCount }, (_, j) =>
        `FT${1000 + i + j}`
      );

      return {
        id: i + 1,
        date: dateStr,
        client: client,
        country: country,
        city: city,
        dataCenter: dataCenter,
        additionalFTs: additionalFTsCount,
        additionalFTsNames: additionalFTsNames,
        startTime: startTime,
        endTime: endTime,
        duration: duration,
        workType: WORK_TYPES[i % WORK_TYPES.length],
        referenceNumber: `TICKET-${1000 + i}`,
        bills: i % 4 === 0 ? ["https://via.placeholder.com/300"] : [],
        description: `Work description for ${client} at ${dataCenter} in ${city}, ${country}`,
        priority: i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Low",
        status: i % 4 === 0 ? "Completed" : i % 4 === 1 ? "In Progress" : i % 4 === 2 ? "Pending" : "Cancelled",
        createdAt: `${dateStr}T${startTime}`,
        updatedAt: `${dateStr}T${endTime}`,
      };
    });
  };

  export { WORK_TYPES };