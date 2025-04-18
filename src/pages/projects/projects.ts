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
    name: 'Aging and Extreme Heat',
    date: "current",
    description: 'Interdisciplinary applied research pioneering cross-sector responses to climate impacts.',
    demoLink: 'https://www.extremeheat.us',
    tags: ['Adaptation','Health']
  },
  {
    name: 'RethinkAI',
    description: 'AI innovation at the city-civil society interface.',
    date: "current",
    demoLink: 'https://www.newamerica.org/rethinkai/',
    demoLinkRel: 'nofollow noopener noreferrer',
    tags: ['AI', 'Government']
  },
  {
    ...(await getRepositoryDetails('Cornell-Tech-Urban-Tech-Hub/atlas-of-urban-tech')),
    name: 'Atlas of Urban Tech',
    date: "current",
    description: 'Case studies of smart city plans and districts.',
    demoLink: 'https://www.atlasofurbantech.org',
    /* postLink: '/2023-07-02-nycs-urban-tech-ecosystem/', */
    tags: ['Planning', 'Real Estate']
  },
  {
    name: 'Bus Observatory',
    date: "current",
    description: 'Archive of real-time transit data across multiple global cities.',
    demoLink: 'https://api.busobservatory.org',
    tags: ['Mobility','Data']
  },
  {
    name: 'Big Urban Data: A Strategic Guide for Cities',
    date: "2019",
    description: 'A maturity model for Latin American cities to assess data initiatives.',
    demoLink: 'https://publications.iadb.org/publications/english/document/Big_Urban_Data_A_Strategic_Guide_for_Cities.pdf',
    tags: ['Mobility','Data']
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
