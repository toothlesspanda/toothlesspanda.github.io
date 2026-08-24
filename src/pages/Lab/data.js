import mediumLogo from "../../images/medium-logo.svg";
import devtoLogo from "../../images/devto-logo.svg";

export const PublicationType = Object.freeze({
  MEDIUM: { name: "Medium", color: "#1a1a1a", logo: mediumLogo },
  DEVTO:  { name: "dev.to",  color: "#0a0a0a", logo: devtoLogo },
});

export const projects = [
  {
    name: "lucky-movie",
    language: "Python",
    stars: 0,
    description: "AI-powered movie recommendation engine. Search a film, tune your mood with emotion sliders, and discover similar movies using Faiss, HuggingFace embeddings, and emotional profiling.",
    repo: "https://github.com/toothlesspanda/movies-recommender",
    site: "https://luckymovie.link",
    image: "/projects/lucky-movie.gif",
  },
  {
    name: "eng-ladder-tool",
    language: "JavaScript",
    stars: 3,
    description: "Browser-based tool for engineering managers to track direct reports' career progression against customizable role frameworks, with radar charts.",
    repo: "https://github.com/toothlesspanda/eng-ladder-tool",
    image: "/projects/eng-ladder-tool.png",
  },
  {
    name: "earthquake-app",
    language: "Ruby",
    stars: 1,
    description: "Rails app for visualizing USGS earthquake data with user authentication, a REST API with filtering, and 3D seismic visualizations with Three.js.",
    repo: "https://github.com/toothlesspanda/earthquake-app",
    image: "/projects/earthquake-app.gif",
  },
  {
    name: "ardc-website",
    language: "JavaScript",
    stars: 0,
    description: "Website for As Raparigas do Codigo, built with React and Apex API integration. Contributed across all pages, restructured the project, and built the forms and APIs.",
    repo: "https://github.com/As-Raparigas-do-Codigo/ardc-website",
    site: "https://www.raparigasdocodigo.pt/",
    image: "/projects/ardc.gif",
  },
  {
    name: "community-where",
    language: "Ruby",
    stars: 2,
    description: "Open-source Rails app that lets people map useful community resources in their neighborhoods (recycling bins, EV chargers) with community validation.",
    repo: "https://github.com/toothlesspanda/community-where",
  },
  {
    name: "emoji-totext",
    language: "JavaScript",
    stars: 0,
    description: 'npm package that converts emojis to their text descriptions — e.g. a pizza slice becomes "a slice of pizza".',
    repo: "https://github.com/toothlesspanda/emoji-totext",
  },
  {
    name: "cassia-assistant",
    language: "Python",
    stars: 0,
    description: "Home Assistant setup running on a Raspberry Pi 4 with Docker, with modular sensor scripts for custom smart home configurations.",
    repo: "https://github.com/toothlesspanda/cassia-assistant",
  },
  {
    name: "adventofcode",
    language: "JavaScript",
    stars: 0,
    description: "My Advent of Code solutions.",
    repo: "https://github.com/toothlesspanda/adventofcode",
  },
];

export const langColor = {
  JavaScript: "#e8c96a",
  Ruby:       "#cc342d",
  Python:     "#3572A5",
};

export const publications = [
  {
    title: "Acessibilidade web: apenas 13% das paginas da administracao publica estao conforme a lei",
    year: "2018", venue: "Gerador",
    href: "https://gerador.eu/acessibilidade-web-apenas-13-das-paginas-da-administracao-publica-estao-conforme-a-lei/",
  },
  {
    title: "Semantic Content Analysis Supporting Web Accessibility Evaluation",
    year: "2018", venue: "15th International Web for All Conference",
    href: "https://repositorio.ul.pt/handle/10451/30934",
  },
  {
    title: "SCREW — Semantic Content Analysis for Repair and Evaluation of Web Accessibility",
    year: "2017", venue: "MSc Thesis · 18/20",
    description: "AI-based algorithm (Clarifai, Swoogle, Indico.io) to measure semantic similarity between alt texts and images, integrated into QualWeb.",
    href: "https://repositorio.ul.pt/handle/10451/30934",
  },
  {
    title: "Development Technologies Impact in Web Accessibility",
    year: "2016", venue: "13th International Web for All Conference",
    href: "https://repositorio.ul.pt/handle/10451/30934",
  },
];

export const menuItems = [
  { id: "about",    label: "about" },
  { id: "projects", label: "projects" },
  { id: "articles", label: "articles" },
  { id: "cv",       label: "cv" },
];

export const RADIUS = 200;
export const HUB = 580;

export const pixels = [
  { top: '8%',  left: '10%' },
  { top: '20%', left: '85%' },
  { top: '72%', left: '12%' },
  { top: '82%', left: '78%' },
  { top: '14%', left: '55%' },
  { top: '65%', left: '92%' },
  { top: '40%', left: '4%' },
  { top: '88%', left: '42%' },
];
