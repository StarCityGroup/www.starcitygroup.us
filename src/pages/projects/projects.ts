import { getRepositoryDetails } from "../../utils";

export interface Project {
  name: string;
  date: string
  demoLink: string;
  tags?: string[],
  description?: string;
  postLink?: string;
  demoLinkRel?: string;
  [key: string]: any;
}

export const projects: Project[] = [
  {
    name: 'Initiative on Aging and Extreme Heat',
    date: "2024 to present",
    image:'/images/neo-newyork-tem-2002226-lrg-crop.webp',
    description: 'Data-driven climate adaptation.',
    demoLink: 'https://www.extremeheat.us',
    tags: ['Resilience','Health']
  },

  {
    name: 'RethinkAI',
    description: 'AI innovation at the city-civil society interface.',
    date: "2024 to present",
    image:'/images/sky-star-atmosphere-nebula-universe-astronomical-object-1428609-pxhere.com_-768x438.jpg',
    demoLink: 'https://www.newamerica.org/rethinkai/',
    demoLinkRel: 'nofollow noopener noreferrer',
    tags: ['AI', 'Government']
  },
  {
    ...(await getRepositoryDetails('Cornell-Tech-Urban-Tech-Hub/atlas-of-urban-tech')),
    name: 'Atlas of Urban Tech',
    date: "2023 to present",
    description: 'Case studies of smart city plans and districts.',
    image: '/images/aerial-view-architecture-bridges-buildings-cars-city-1560273-pxhere.com_-768x432.jpg',
    demoLink: 'https://www.atlasofurbantech.org',
    /* postLink: '/2023-07-02-nycs-urban-tech-ecosystem/', */
    tags: ['Planning', 'Economic Development']
  },
  {
    name: 'Bus Observatory',
    image:'/images/toronto-728462_1280-768x512.jpg',
    date: "2020 to present",
    description: 'Archive of real-time transit data across multiple global cities.',
    demoLink: 'https://api.busobservatory.org',
    tags: ['Mobility','Data']
  },
  {
    name: 'The Most Important Mile',
    date: "2020",
    description: 'Inclusive futures for urban commerce and logistics.',
    image: '/images/_image-2.webp',
    demoLink: '/pdf/The-Most-Important-Mile.pdf',
    tags: ['Mobility','Scenarios']
  },
  {
    name: 'Taming the Autonomous Vehicle',
    date: '2017',
    description: 'A futures primer for automated urban mobility.',
    image: '/images/Shuttles-Scene-5-1600px-768x512.png',
    demoLink: '/pdf/The-Most-Important-Mile.pdf',
    tags: ['Mobility','Scenarios']
  },
  {
    name: 'Big Urban Data',
    date: "2019",
    image:'/images/casa-london.png',
    description: 'A maturity model for Latin American cities to assess data initiatives.',
    demoLink: 'https://publications.iadb.org/publications/english/document/Big_Urban_Data_A_Strategic_Guide_for_Cities.pdf',
    tags: ['Government','Data']
  },

  {
    name: 'How Cities Make Software Together',
    date: "2023",
    image: '/images/victor-rodriguez-IiLFMkqiFrM-unsplash-768x510.jpg',
    description: 'Comparative study of 6 multi-city open source collaborations.',
    demoLink: 'https://sites.coecis.cornell.edu/urbantech/files/2023/04/How-Cities-Make-Software-Together.pdf',
    tags: ['Government','Innovation']
  },




  {
    name: 'Blue Economy Innovation District',
    date: "2019",
    description: 'Narrative development for an ocean tech cluster in Gulfport, Mississippi.',
    image: '/images/spencer-watson-ioy3bN5Irew-unsplash.jpg',
    demoLink: '/pdf/SA-Gulfport-BEID-20200124.pdf',
    tags: ['Planning','Economic Development']
  },
  
  /* {
    ...(await getRepositoryDetails('syakirurahman/react-lab')),
    name: 'React Lab',
    demoLink: 'https://devaradise.com/lab/react/',
    tags: ['React']
  },
  {
    ...(await getRepositoryDetails('syakirurahman/pokemon-catcher')),
    name: 'Pokemon Catcher',
    demoLink: 'https://pokemon-catcher-18636.web.app/',
    tags: ['Hobby']
  },
  {
    ...(await getRepositoryDetails('syakirurahman/movie-nominations')),
    name: 'Movie Nominations',
    demoLink: 'https://movie-nominations-c21c3.web.app/',
    tags: ['Hobby']
  },
  {
    ...(await getRepositoryDetails('syakirurahman/organization-tree')),
    name: 'Organization tree',
    demoLink: 'https://organization-tree-2a446.web.app/',
    tags: ['Hobby']
  } */
]
