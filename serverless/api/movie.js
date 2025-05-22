export default async function handler(req, res) {
    try {
        const apiKey = process.env.VITE_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "API key is missing" });
        }

        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`);
        
        if (!response.ok) {
            return res.status(response.status).json({ error: `TMDB API error: ${response.statusText}` });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Serverless API error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
