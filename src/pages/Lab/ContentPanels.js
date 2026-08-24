import React, { useState } from "react";
import profileImg from "../../images/profile-lab.jpg";
import { projects, langColor, publications } from "./data";

const Bullet = ({ active, children }) => (
  <div style={{ marginBottom: "10px", display: "flex", gap: "8px" }}>
    <span style={{ color: active ? "var(--yellow)" : "var(--text-muted)", flexShrink: 0 }}>&#9656;</span>
    <span style={{ color: active ? "var(--text)" : "var(--text-muted)" }}>{children}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "32px" }}>
    <h4 style={{
      color: "var(--yellow)", fontSize: "1em", marginBottom: "16px",
      paddingBottom: "6px", borderBottom: "1px solid var(--border)",
    }}>
      {title}
    </h4>
    {children}
  </div>
);

export const AboutContent = () => (
  <div>
    <div style={{ display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "48px" }}>
      <img src={profileImg} alt="Ines de Matos" style={{
        width: "240px", height: "240px", objectFit: "cover",
        borderRadius: "12px", border: "2px solid var(--border)", flexShrink: 0,
      }} />
      <div style={{ flex: 1, minWidth: "200px" }}>
        <h2 style={{ marginTop: 0, marginBottom: "16px" }}>Hi!</h2>
        <p style={{ lineHeight: "2", color: "var(--text)", margin: 0 }}>
          I'm a generalist, a fast learner and a people-person with computers in between.
          Passionate about backend, good practices, developer experience, leadership and people's behavior.
        </p>
        <p style={{ lineHeight: "2", color: "var(--text-muted)", marginTop: "12px", marginBottom: 0 }}>
          Foodie. Photographer. Dog mom. Writer. Sci-fi obsessed. IoT tinkerer.
        </p>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
      <div>
        <Section title="Experience">
          <Bullet active>Web Summit — Oct 2022–present · 3y+</Bullet>
          <div style={{ paddingLeft: "24px", marginTop: "-4px", marginBottom: "10px" }}>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9em", marginBottom: "2px" }}>↳ Engineering Manager · Jun 2024–present</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9em" }}>↳ Software Engineer · Oct 2022–Aug 2024</div>
          </div>
          <Bullet active>Collaborator @ As Raparigas do Codigo</Bullet>
          <Bullet>Talkdesk — Oct 2019–Sep 2022 · 3y</Bullet>
          <div style={{ paddingLeft: "24px", marginTop: "-4px", marginBottom: "10px" }}>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9em", marginBottom: "2px" }}>↳ Software Engineer III · Aug 2021–Sep 2022</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9em", marginBottom: "2px" }}>↳ Software Engineer II · Feb 2021–Jul 2021</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9em" }}>↳ Software Engineer I · Oct 2019–Feb 2021</div>
          </div>
          <Bullet>NTT DATA — Nov 2017–Aug 2019 · 2y</Bullet>
          <div style={{ paddingLeft: "24px", marginTop: "-4px", marginBottom: "10px" }}>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9em", marginBottom: "2px" }}>↳ Consultant · Sep 2018–Aug 2019</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9em" }}>↳ Assistant Consultant · Nov 2017–Aug 2018</div>
          </div>
          <Bullet>Junior Researcher @ LaSIGE - FCUL — Mar 2015–Sep 2017 · 2y</Bullet>
        </Section>
        <Section title="Education">
          <Bullet>MSc Informatics @ University of Lisbon · 2015–2017</Bullet>
          <Bullet>BSc Information Technologies @ University of Lisbon · 2012–2016</Bullet>
        </Section>
      </div>

      <div>
        <Section title="Publications">
          {publications.map((pub) => (
            <div key={pub.year + pub.title.slice(0,10)} style={{
              marginBottom: "20px", padding: "14px",
              background: "var(--surface-alt)", borderRadius: "8px",
              border: "1px solid var(--border)",
            }}>
              <a href={pub.href} target="_blank" rel="noreferrer" style={{ lineHeight: "1.6", display: "block" }}>
                {pub.title}
              </a>
              <p style={{ color: "var(--text-muted)", margin: "6px 0 0", fontSize: "0.85em" }}>
                {pub.year} — {pub.venue}
              </p>
              {pub.description && (
                <p style={{ color: "var(--text-muted)", margin: "6px 0 0", fontSize: "0.85em", lineHeight: "1.6" }}>
                  {pub.description}
                </p>
              )}
            </div>
          ))}
        </Section>
      </div>
    </div>
  </div>
);

export const ProjectsContent = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    {projects.map((project) => (
      <div
        key={project.name}
        className="project-card"
        style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "10px", overflow: "hidden",
          display: "flex", transition: "border-color 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--yellow)"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
      >
        {project.image && (
          <div className="project-card__image" style={{
            width: "380px", flexShrink: 0,
            background: "var(--surface-alt)",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRight: "1px solid var(--border)", overflow: "hidden",
          }}>
            <img
              src={project.image.startsWith("http") ? project.image : `${process.env.PUBLIC_URL}${project.image}`}
              alt={project.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        )}
        <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
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
            <span style={{ fontSize: "0.8em", color: langColor[project.language] ?? "var(--text-muted)" }}>
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
      </div>
    ))}
  </div>
);

const ArticleCard = ({ title, image, link, type }) => {
  const [imgError, setImgError] = useState(false);
  const showImg = image && !imgError;

  return (
    <a href={link} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "block" }}>
      <div className="article-card" style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "10px", overflow: "hidden",
        display: "flex", transition: "border-color 0.15s",
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--yellow)"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
      >
        {showImg && (
          <div className="article-card__image" style={{
            width: "180px", flexShrink: 0,
            background: "var(--surface-alt)", overflow: "hidden",
            borderRight: "1px solid var(--border)",
          }}>
            <img
              src={image} alt={title} onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        )}
        <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{
            background: "var(--yellow)", color: "#fff", fontFamily: "var(--font)",
            fontSize: "0.7em", borderRadius: "4px", padding: "2px 8px",
            alignSelf: "flex-start", marginBottom: "8px",
          }}>
            {type?.name}
          </span>
          <span style={{
            color: "var(--text)", fontFamily: "var(--font)",
            fontSize: "0.9em", lineHeight: "1.5",
          }}>
            {title}
          </span>
        </div>
      </div>
    </a>
  );
};

export const ArticlesContent = ({ articles }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    {articles.length === 0 && (
      <p style={{ color: "var(--text-muted)" }}>Loading articles...</p>
    )}
    {articles.map((item, idx) => (
      <ArticleCard
        key={idx}
        title={item.title}
        image={item.image}
        link={item.link}
        type={item.type}
      />
    ))}
  </div>
);

export const CvContent = () => (
  <iframe
    id="cv-iframe"
    src={`${process.env.PUBLIC_URL}/cv.html`}
    title="CV"
    style={{ width: "100%", height: "100%", border: "none", minHeight: "60vh" }}
  />
);
