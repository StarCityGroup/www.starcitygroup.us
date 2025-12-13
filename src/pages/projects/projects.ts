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
    name: 'RethinkAI',
    description: 'AI innovation at the city-civil society interface.',
    date: "2024 to present",
    image:'/images/sky-star-atmosphere-nebula-universe-astronomical-object-1428609-pxhere.com_-768x438.jpg',
    demoLink: 'https://www.newamerica.org/rethinkai/',
    demoLinkRel: 'nofollow noopener noreferrer',
    tags: ['AI', 'Government']
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
    name: 'Big Urban Data in Latin American Cities',
    date: "2019",
    image:'/images/casa-london.png',
    description: 'A maturity model for Latin American cities to assess data initiatives.',
    demoLink: 'https://publications.iadb.org/publications/english/document/Big_Urban_Data_A_Strategic_Guide_for_Cities.pdf',
    tags: ['Government','Data']
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
