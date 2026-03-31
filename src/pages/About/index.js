import Layout from "../Layout";

const Bullet = ({ active, children }) => (
  <div style={{ marginBottom: "10px", display: "flex", gap: "8px" }}>
    <span style={{ color: active ? "var(--yellow)" : "var(--text-muted)", flexShrink: 0 }}>▸</span>
    <span style={{ color: active ? "var(--text)" : "var(--text-muted)" }}>{children}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "32px" }}>
    <h4 style={{
      color: "var(--yellow)",
      fontSize: "1em",
      marginBottom: "16px",
      paddingBottom: "6px",
      borderBottom: "1px solid var(--border)",
    }}>
      {title}
    </h4>
    {children}
  </div>
);

const About = () => {
  return (
    <Layout title="About">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Bio row */}
        <div style={{ display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "48px" }}>
          <img
            src="profile.png"
            alt="Inês de Matos"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "12px",
              border: "2px solid var(--border)",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: "220px" }}>
            <h2 style={{ marginTop: 0, marginBottom: "16px" }}>Hi! 👋</h2>
            <p style={{ lineHeight: "2", color: "var(--text)", margin: 0 }}>
              I'm a generalist, a fast learner and a people-person with computers in between.
              Passionate about backend, good practices, developer experience, leadership and people's behavior.
            </p>
            <p style={{ lineHeight: "2", color: "var(--text-muted)", marginTop: "12px", marginBottom: 0 }}>
              Foodie. Photographer. Dog mom. Writer. Sci-fi obsessed. IoT tinkerer.
            </p>
          </div>
        </div>

        {/* Content grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>

          <div>
            <Section title="Experience">
              <Bullet active>Web Summit — Oct 2022–present · 3y+</Bullet>
              <div style={{ paddingLeft: "24px", marginTop: "-4px", marginBottom: "10px" }}>
                <div style={{ color: "var(--text-muted)", fontSize: "0.9em", marginBottom: "2px" }}>↳ Engineering Manager · Jun 2024–present</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.9em" }}>↳ Software Engineer · Oct 2022–Aug 2024</div>
              </div>
              <Bullet active>Collaborator @ As Raparigas do Código</Bullet>
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
              {[
                {
                  title: "Acessibilidade web: apenas 13% das páginas da administração pública estão conforme a lei",
                  year: "2018",
                  venue: "Gerador",
                  href: "https://gerador.eu/acessibilidade-web-apenas-13-das-paginas-da-administracao-publica-estao-conforme-a-lei/",
                },
                {
                  title: "Semantic Content Analysis Supporting Web Accessibility Evaluation",
                  year: "2018",
                  venue: "15th International Web for All Conference",
                  href: "https://repositorio.ul.pt/handle/10451/30934",
                },
                {
                  title: "SCREW — Semantic Content Analysis for Repair and Evaluation of Web Accessibility",
                  year: "2017",
                  venue: "MSc Thesis · 18/20",
                  description: "AI-based algorithm (Clarifai, Swoogle, Indico.io) to measure semantic similarity between alt texts and images, integrated into QualWeb.",
                  href: "https://repositorio.ul.pt/handle/10451/30934",
                },
                {
                  title: "Development Technologies Impact in Web Accessibility",
                  year: "2016",
                  venue: "13th International Web for All Conference",
                  href: "https://repositorio.ul.pt/handle/10451/30934",
                },
              ].map((pub) => (
                <div key={pub.year} style={{
                  marginBottom: "20px",
                  padding: "14px",
                  background: "var(--surface-alt)",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                }}>
                  <a href={pub.href} style={{ lineHeight: "1.6", display: "block" }}>
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
    </Layout>
  );
};

export default About;
