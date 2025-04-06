import { ProjectLocation } from "../types";

// Define project locations for fiber optic installations
export const projectLocations: ProjectLocation[] = [
  {
    id: 1,
    projectId: "FO-JKT-001",
    name: "Fiber Optik Tebet",
    location: "Jakarta Selatan",
    position: [-6.2265, 106.8536], // Tebet, Jakarta
    isDocumented: true,
    category: 'distribution'
  },
  {
    id: 2,
    projectId: "FO-JKT-002",
    name: "Fiber Optik Sudirman",
    location: "Jakarta Pusat",
    position: [-6.2088, 106.8186], // Sudirman, Jakarta
    isDocumented: true,
    category: 'backbone'
  },
  {
    id: 3,
    projectId: "FO-JKT-003",
    name: "Fiber Optik Kemang",
    location: "Jakarta Selatan",
    position: [-6.2601, 106.8130], // Kemang, Jakarta
    isDocumented: false,
    category: 'access'
  },
  {
    id: 4,
    projectId: "FO-JKT-004",
    name: "Fiber Optik Menteng",
    location: "Jakarta Pusat",
    position: [-6.1957, 106.8303], // Menteng, Jakarta
    isDocumented: true,
    category: 'backbone'
  },
  {
    id: 5,
    projectId: "FO-BDG-001",
    name: "Fiber Optik Dago",
    location: "Bandung",
    position: [-6.8915, 107.6107], // Dago, Bandung
    isDocumented: false,
    category: 'distribution'
  },
  {
    id: 6,
    projectId: "FO-BDG-002",
    name: "Fiber Optik Pasteur",
    location: "Bandung",
    position: [-6.8969, 107.5961], // Pasteur, Bandung
    isDocumented: true,
    category: 'access'
  },
  {
    id: 7,
    projectId: "FO-SMG-001",
    name: "Fiber Optik Simpang Lima",
    location: "Semarang",
    position: [-6.9932, 110.4203], // Simpang Lima, Semarang
    isDocumented: false,
    category: 'maintenance'
  },
  {
    id: 8,
    projectId: "FO-SBY-001",
    name: "Fiber Optik Tunjungan",
    location: "Surabaya",
    position: [-7.2575, 112.7381], // Tunjungan, Surabaya
    isDocumented: true,
    category: 'backbone'
  },
];