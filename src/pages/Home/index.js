import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
  DEVTO: { name: "dev.to", color: "#0a0a0a", logo: devtoLogo },
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
      <Container
        style={{
          maxWidth: "100%",
          background: "rgba(0, 0, 0, 0.3)",
          padding: "22px",
          marginTop: "50px",
          paddingTop: "50px",
          marginBottom: "50px",
        }}>
        <Row xs={2} md={3} lg={4} className="g-4">
          {publications.map((item, idx) => (
            <Col key={idx}>
              <PubCard
                title={item.title}
                thumbnail={item.image}
                link={item.link}
                type={item.type}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
