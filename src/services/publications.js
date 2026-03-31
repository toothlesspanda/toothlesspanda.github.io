const extractFirstImage = (html) => {
  const match = html && html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

export const getMediumPublications = async () => {
  try {
    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?" +
        new URLSearchParams({
          rss_url: "https://medium.com/feed/@inesdematos",
        })
    );
    const data = await res.json();
    return (data.items ?? []).map((item) => ({
      ...item,
      thumbnail: item.thumbnail || extractFirstImage(item.content),
    }));
  } catch (err) {
    console.log("Medium fetch error:", err);
    return [];
  }
};

export const getDevToPublications = async () => {
  try {
    const res = await fetch(
      "https://dev.to/api/articles?" +
        new URLSearchParams({
          username: "hersoftsyntax",
          per_page: 20,
        })
    );
    const data = await res.json();
    return data ?? [];
  } catch (err) {
    console.log("dev.to fetch error:", err);
    return [];
  }
};
