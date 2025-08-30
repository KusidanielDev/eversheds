// components/people/data.ts

export type DirectoryPerson = {
  id: string; // "1"..."10"
  name: string;
  title: string;
  office: string;
  sector: string; // e.g., "Energy", "Financial services"
  service: string; // e.g., "Corporate", "Employment"
  image?: string; // /images/people/pN.jpg
};

export const PEOPLE: DirectoryPerson[] = [
  {
    id: "1",
    name: "Alice Benton",
    title: "Partner, Corporate",
    office: "United Kingdom",
    sector: "Energy",
    service: "Corporate",
    image: "/images/people/p1.jpg",
  },
  {
    id: "2",
    name: "Ben Carter",
    title: "Associate, Employment",
    office: "United Kingdom",
    sector: "Technology",
    service: "Employment",
    image: "/images/people/p2.jpg",
  },
  {
    id: "3",
    name: "Cara Dyer",
    title: "Counsel, Litigation",
    office: "United Kingdom",
    sector: "Real Estate",
    service: "Litigation",
    image: "/images/people/p3.jpg",
  },
  {
    id: "4",
    name: "Daniel Evans",
    title: "Partner, Tax",
    office: "United Kingdom",
    sector: "Financial services",
    service: "Tax",
    image: "/images/people/p4.jpg",
  },
  {
    id: "5",
    name: "Elliot Fox",
    title: "Senior Associate, IP",
    office: "United Kingdom",
    sector: "Life Sciences",
    service: "IP",
    image: "/images/people/p5.jpg",
  },
  {
    id: "6",
    name: "Fiona Grant",
    title: "Partner, Employment",
    office: "United Kingdom",
    sector: "Consumer",
    service: "Employment",
    image: "/images/people/p6.jpg",
  },
  {
    id: "7",
    name: "George Hall",
    title: "Associate, Corporate",
    office: "United Kingdom",
    sector: "Energy",
    service: "Corporate",
    image: "/images/people/p7.jpg",
  },
  {
    id: "8",
    name: "Hannah Irwin",
    title: "Partner, Litigation",
    office: "United Kingdom",
    sector: "TMT",
    service: "Litigation",
    image: "/images/people/p8.jpg",
  },
  {
    id: "9",
    name: "Isaac Jones",
    title: "Associate, Real Estate",
    office: "United Kingdom",
    sector: "Real Estate",
    service: "Real Estate",
    image: "/images/people/p9.jpg",
  },
  {
    id: "10",
    name: "Julia King",
    title: "Partner, Corporate",
    office: "United Kingdom",
    sector: "Financial services",
    service: "Corporate",
    image: "/images/people/p10.jpg",
  },
];

export const PEOPLE_BY_ID: Record<string, DirectoryPerson> = Object.fromEntries(
  PEOPLE.map((p) => [p.id, p])
);

// Optional: export filter lists so Directory & others share the same constants
export const ALL_OFFICES = [
  "United Kingdom",
  "Ireland",
  "United States",
  "France",
  "Germany",
];

export const ALL_SECTORS = [
  "Energy",
  "Financial services",
  "Technology",
  "Real Estate",
  "Life Sciences",
  "Consumer",
  "TMT",
];

export const ALL_SERVICES = [
  "Corporate",
  "Employment",
  "Litigation",
  "Tax",
  "IP",
  "Real Estate",
];
