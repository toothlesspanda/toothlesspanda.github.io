import Layout from "../Layout";

const projects = [
  {
    name: "ardc-website",
    language: "JavaScript",
    stars: 0,
    description: "Website for As Raparigas do Código, built with React and Apex API integration. Contributed across all pages, restructured the project, and built the forms and APIs.",
    repo: "https://github.com/As-Raparigas-do-Codigo/ardc-website",
    site: "https://www.raparigasdocodigo.pt/",
  },
  {
    name: "lucky-movie",
    language: "Python",
    stars: 0,
    description: "AI-powered movie recommendation engine. Search a film, tune your mood with emotion sliders, and discover similar movies using Faiss, HuggingFace embeddings, and emotional profiling.",
    repo: "https://github.com/toothlesspanda/movies-recommender",
    site: "https://luckymovie.link",
  },
  {
    name: "eng-ladder-tool",
    language: "JavaScript",
    stars: 3,
    description: "Browser-based tool for engineering managers to track direct reports' career progression against customizable role frameworks, with radar charts.",
    repo: "https://github.com/toothlesspanda/eng-ladder-tool",
  },
  {
    name: "community-where",
    language: "Ruby",
    stars: 2,
    description: "Open-source Rails app that lets people map useful community resources in their neighborhoods (recycling bins, EV chargers) with community validation.",
    repo: "https://github.com/toothlesspanda/community-where",
  },
  {
    name: "cassia-assistant",
    language: "Python",
    stars: 0,
    description: "Home Assistant setup running on a Raspberry Pi 4 with Docker, with modular sensor scripts for custom smart home configurations.",
    repo: "https://github.com/toothlesspanda/cassia-assistant",
  },
  {
    name: "earthquake-app",
    language: "Ruby",
    stars: 1,
    description: "Rails app for visualizing USGS earthquake data with user authentication, a REST API with filtering, and 3D seismic visualizations with Three.js.",
    repo: "https://github.com/toothlesspanda/earthquake-app",
  },
  {
    name: "emoji-totext",
    language: "JavaScript",
    stars: 0,
    description: "npm package that converts emojis to their text descriptions — e.g. 🍕 becomes \"a slice of pizza\".",
    repo: "https://github.com/toothlesspanda/emoji-totext",
  },
  {
    name: "adventofcode",
    language: "JavaScript",
    stars: 0,
    description: "My Advent of Code solutions.",
    repo: "https://github.com/toothlesspanda/adventofcode",
  },
];

const langColor = {
  JavaScript: "#e8c96a",
  Ruby:       "#cc342d",
  Python:     "#3572A5",
};

const Projects = () => {
  return (
    <Layout title="Projects">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85em", marginBottom: "24px" }}>
          PUBLIC PROJECTS
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
        }}>
          {projects.map((project) => (
            <div
              key={project.name}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "20px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.15s, transform 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--yellow)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <span style={{ color: "var(--yellow)", fontFamily: "var(--font)" }}>{project.name}</span>
                {project.stars > 0 && (
                  <span style={{ color: "var(--text-muted)", fontSize: "0.85em" }}>★ {project.stars}</span>
                )}
              </div>
              <p style={{ color: "var(--text-muted)", margin: "0 0 16px", lineHeight: "1.7", fontSize: "0.9em", flex: 1 }}>
                {project.description}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{
                  fontSize: "0.8em",
                  color: langColor[project.language] ?? "var(--text-muted)",
                }}>
                  ● {project.language}
                </span>
                <div style={{ display: "flex", gap: "12px" }}>
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noreferrer"
                      style={{ color: "var(--text-muted)", fontSize: "0.8em", textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.color = "var(--yellow)"}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>
                      GitHub
                    </a>
                  )}
                  {project.site && (
                    <a href={project.site} target="_blank" rel="noreferrer"
                      style={{ color: "var(--text-muted)", fontSize: "0.8em", textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.color = "var(--yellow)"}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>
                      Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
