import { useEffect, useState } from "react";
import Layout from "../Layout";
import PubCard from "../../components/PubCard";
import {
  getMediumPublications,
  getDevToPublications,
} from "../../services/publications";
import mediumLogo from "../../images/medium-logo.svg";
import devtoLogo from "../../images/devto-logo.svg";

const PublicationType = Object.freeze({
  MEDIUM: { name: "Medium", color: "#1a1a1a", logo: mediumLogo },
  DEVTO:  { name: "dev.to",  color: "#0a0a0a", logo: devtoLogo  },
});

const Home = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [mediumItems, devtoItems] = await Promise.all([
        getMediumPublications(),
        getDevToPublications(),
      ]);

      const medium = mediumItems.map((item) => ({
        title: item.title,
        image: item.thumbnail,
        type: PublicationType.MEDIUM,
        link: item.link,
        date: item.pubDate,
      }));

      const devto = devtoItems.map((item) => ({
        title: item.title,
        image: item.cover_image || item.social_image,
        type: PublicationType.DEVTO,
        link: item.url,
        date: item.published_at,
      }));

      const all = [...medium, ...devto].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setPublications(all);
    }

    fetchData();
  }, []);

  return (
    <Layout title="Home">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        <p style={{ color: "var(--text-muted)", letterSpacing: "2px", fontSize: "0.85em", marginBottom: "24px" }}>
          LATEST WRITING
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}>
          {publications.map((item, idx) => (
            <PubCard
              key={idx}
              title={item.title}
              thumbnail={item.image}
              link={item.link}
              type={item.type}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
