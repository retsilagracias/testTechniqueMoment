import React, { useState, useEffect, useRef } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { resultPopularMovies, MovieDataContent } from '../Service/api/imdb'
import MovieDetail from './movieDetail'

const MainPage = () => {
  const [page, setPage] = useState(1)
  const [popularMovies, setPopularMovies] = useState<Array<MovieDataContent>>([])
  const [currentMovie, setCurrentMovie] = useState<MovieDataContent>()
  const [open, setOpen] = useState(false);
  const apiKey: string = "c75099c1241ae2994f1cfe8535c1626f"
  const pageRef = useRef(page)
  const setPageRef = (data: number) => {
    pageRef.current = data
    setPage(data)
  }
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
      setPageRef(pageRef.current + 1)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`,
      {
        method: "GET",
      }
    )
      .then(res => res.json())
      .then((response: resultPopularMovies) => {
        setPopularMovies([...popularMovies, ...response.results])
      })
      .catch(error => console.log(error))
  }, [page])

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }),
  );
  function createData(title: string, release: string, language: string,) {
    return { title, release, language };
  }

  const rows = () => {
    const movies = popularMovies
    if (movies) {
      return movies.map(e => {
        return createData(e.title, e.release_date, e.original_language)
      })
    } else {
      return [createData('Undefined', 'Undefined', 'Undefinded')]
    }
  }


  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={2}>
          <button onClick={() => setPage(page + 1)}> Manual load</button>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>Test technique Front-End Moment by GRACIAS Alister</Paper>
          <div style={{ height: '40px' }}></div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Release</TableCell>
                  <TableCell align="right">Language</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {popularMovies.map((row) => (
                  <TableRow key={row.title} hover={true} onClick={() => {
                    setCurrentMovie(row)
                    setOpen(!open)
                  }}>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.release_date}</TableCell>
                    <TableCell align="right">{row.original_language}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <MovieDetail open={open} setOpen={setOpen} detail={currentMovie} />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>

    </div >
  );
}

export default MainPage;