export default async function handler(req, res) {
    const apiKey = process.env.OPENAPI_KEY;
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`);
    const data = await response.json();
    res.status(200).json(data);
}
