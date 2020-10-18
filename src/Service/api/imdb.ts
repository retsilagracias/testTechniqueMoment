import axios, { AxiosError } from 'axios'

const apiKey: string = "c75099c1241ae2994f1cfe8535c1626f"

const apiIMBD = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export type MovieDataContent = {
  popularity: number,
  vote_count: number,
  video: boolean,
  poster_path: string,
  id: number,
  adult: boolean,
  backdrop_path: string,
  original_language: string,
  original_title: string,
  genre_ids: Array<number>,
  title: string,
  vote_average: number,
  overview: string,
  release_date: string
}

export type resultPopularMovies = {
  page: string,
  total_results: number,
  total_pages: number,
  results: Array<MovieDataContent>
}

export const getPopularMovies = async (page: number): Promise<resultPopularMovies> => {
  return await apiIMBD
    .get(`/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
    .then((res) => {
      if (res.data !== null) {
        return res.data
      }
      return null
    })
    .catch((error: AxiosError) => {
      console.log('API IMBD: getPopularMovies', error)
      return null
    })
}
