import { NavLink } from "react-router-dom";
import { Linkedin, Medium, Github, Instagram } from "react-bootstrap-icons";

const Layout = ({ children }) => {
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "var(--yellow)" : "var(--text-muted)",
    fontWeight: isActive ? 700 : 400,
    letterSpacing: "1px",
    fontSize: "1em",
    textDecoration: "none",
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <NavLink to="/" style={{ color: "var(--yellow)", fontWeight: 400, fontSize: "1.1em", textDecoration: "none", fontFamily: "var(--font)" }}>
            Inês de Matos
          </NavLink>
          <nav style={{ display: "flex", gap: "24px" }}>
            <NavLink to="/" end style={navLinkStyle}>home</NavLink>
            <NavLink to="/about" style={navLinkStyle}>about</NavLink>
            <NavLink to="/projects" style={navLinkStyle}>projects</NavLink>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
        padding: "28px 24px",
        textAlign: "center",
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "28px" }}>
          <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/inesdematos/" title="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a target="_blank" rel="noreferrer" href="https://inesdematos.medium.com/" title="Medium">
            <Medium size={20} />
          </a>
          <a target="_blank" rel="noreferrer" href="https://github.com/toothlesspanda" title="GitHub">
            <Github size={20} />
          </a>
          <a target="_blank" rel="noreferrer" href="https://www.instagram.com/nenas.phot/" title="Instagram">
            <Instagram size={20} />
          </a>
        </div>
      </footer>

    </div>
  );
};

export default Layout;
