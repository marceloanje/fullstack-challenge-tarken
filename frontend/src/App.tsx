import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputAdornment,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import StopCircleIcon from '@mui/icons-material/StopCircle';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Review: string;
}

const MyComponent = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const [audio, setAudio] = useState<{ [key: string]: HTMLAudioElement | null }>({});

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await fetch(`http://localhost:3000/search/movie?query=${searchQuery}`);
      if (!response.ok) throw new Error("Erro ao buscar filmes");

      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleAddToLibrary = async (imdbID: string) => {
    try {
      const response = await fetch(`http://localhost:3000/library/add-movie/${imdbID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) throw new Error("Erro ao adicionar filme à biblioteca");
  
      alert("Filme adicionado à biblioteca com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
      alert("Erro ao adicionar filme à biblioteca");
    }
  };

  const handleDeleteLibrary = async (imdbID: string) => {
    try {
      const response = await fetch(`http://localhost:3000/library/remove-movie/${imdbID}`, {
        method: "DELETE",
      });
  
      if (!response.ok) throw new Error("Erro ao deletar filme à biblioteca");
  
      alert("Filme deletado da biblioteca com sucesso!");
      handleGetMoviesInLibrary();
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
      alert("Erro ao deletar filme da biblioteca");
    }
  };

  const handleGetMoviesInLibrary = async () => {
    try {
      const response = await fetch("http://localhost:3000/library/movies");
      if (!response.ok) throw new Error("Erro ao buscar filmes na biblioteca");
  
      const data = await response.json();
      const formattedMovies = data.movies.map((movie: any) => ({
        Title: movie.title,
        Year: movie.imdbRating.toString(),
        imdbID: movie.imdbID,
        Type: "movie",
        Poster: movie.poster,
        Review: movie.review,
      }));
      setMovies(formattedMovies || []);
    } catch (error) {
      console.error("Erro ao buscar filmes na biblioteca:", error);
      alert("Erro ao buscar filmes na biblioteca");
    }
  };

  useEffect(() => {
    if (selectedTab === 0 ) {
      setMovies([]);
    }
    if (selectedTab === 1) {
      handleGetMoviesInLibrary();
    }
  }, [selectedTab]);

  const handlePlayAudio = (movieId: string, reviewUrl: string) => {
    if (isPlaying[movieId]) return;
    const audioInstance = new Audio(`http://localhost:3000${reviewUrl}`);
    audioInstance.play().catch((error) => {
      console.error("Erro ao reproduzir o áudio:", error);
      alert("Não foi possível reproduzir o áudio.");
    });

    setIsPlaying((prev) => ({ ...prev, [movieId]: true }));
    setAudio((prev) => ({ ...prev, [movieId]: audioInstance }));
  };

  const handleStopAudio = (movieId: string) => {
    const currentAudio = audio[movieId];
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    setIsPlaying((prev) => ({ ...prev, [movieId]: false }));
  };
  
  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#dce0e2", boxShadow: "none" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#F2911B", marginRight: 10 }}>
            Moovy
          </Typography>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            <Tab
              label="Search"
              sx={{
                textTransform: "none",
                color: "#F2911B",
                fontWeight: "bold",
                "&.Mui-selected": {
                  color: "black",
                },
              }}
            />
            <Tab
              label="My Library"
              sx={{
                textTransform: "none",
                color: "#F2911B",
                fontWeight: "bold",
                "&.Mui-selected": {
                  color: "black",
                },
              }}
            />
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* Renderização do conteúdo com base no Tab selecionado */}
      <div style={{ marginTop: "64px", padding: "16px", paddingLeft: "240px" }}>
        {selectedTab === 0 && (
          <div>
            <Typography variant="h5" sx={{ fontWeight: "400", marginBottom: 2, color: "black" }}>
              Search
            </Typography>

            {/* Barra de Pesquisa */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 4 }}>
              <TextField
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                placeholder="Search..."
                variant="outlined"
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  width: "500px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
                slotProps={{
                  input: {
                    endAdornment: <InputAdornment position="end" onClick={handleSearch} style={{ cursor: 'pointer' }}><SearchIcon /></InputAdornment>,
                  },
                }}
              />
            </Box>

            {/* Tela padrão quando não há pesquisa */}
            {movies.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50vh",
                  color: "#F2911B",
                }}
              >
                <SearchIcon sx={{ fontSize: 100, marginBottom: 2 }} />
                <Typography variant="h5">Faça uma pesquisa para encontrar filmes</Typography>
              </Box>
            )}

            {/* Cards de Exibição */}
            <Grid container spacing={3}>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="320"
                      image={movie.Poster}
                      alt={movie.Title}
                    />
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                        <Typography variant="h6">{movie.Title}</Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <StarRoundedIcon sx={{ color: "#FCC419", marginLeft: 0.5 }} />
                          <Typography>{movie.Year}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          onClick={() => handleAddToLibrary(movie.imdbID)} 
                          // style={{ cursor: 'pointer' }}
                          variant="contained"
                          startIcon={<LibraryBooksIcon />}
                          sx={{
                            borderRadius: "15px",
                            backgroundColor: "#2e7d32",
                            "&:hover": {
                              backgroundColor: "#1b5e20",
                            },
                          }}
                        >
                          Add to My Library
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
        {selectedTab === 1 && 
          <div>
            <Typography variant="h5" sx={{ fontWeight: "400", marginBottom: 2, color: "black" }}>
              My Library
            </Typography>
            {/* Cards de Exibição */}
            <Grid container spacing={3}>
                {movies.map((movie) => (
                  <Grid item key={movie.imdbID} sx={{ flexBasis: '22%', minWidth: '250px', maxWidth: '300px' }}>
                    <Card sx={{ width: '100%', height: '500px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', '&:hover .hover-message': {display: 'block',} }}>
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="320"
                          image={movie.Poster}
                          alt={movie.Title}
                        />
                        {movie.Review ? (
                          <Tooltip title="Listen to your audio review" arrow>
                            <IconButton
                              sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                              }}
                              onClick={() => {
                                if (isPlaying[movie.imdbID]) {
                                  handleStopAudio(movie.imdbID);
                                } else {
                                  handlePlayAudio(movie.imdbID, movie.Review);
                                }
                              }}
                            >
                              {isPlaying[movie.imdbID] ? <StopCircleIcon /> : <PlayCircleFilledWhiteRoundedIcon />}
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Box className="hover-message" sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '10px',
                            borderRadius: '5px',
                            color: 'white',
                            textAlign: 'center',
                            display: 'none',
                          }}>
                            <Typography variant="body2">Record a review on mobile app</Typography>
                          </Box>
                        )}
                      </Box>  
                      <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                          <Typography variant="h6">{movie.Title}</Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <StarRoundedIcon sx={{ color: "#FCC419", marginLeft: 0.5 }} />
                            <Typography>{movie.Year}</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "auto" }}>
                          <Button
                            onClick={() => handleDeleteLibrary(movie.imdbID)} 
                            variant="contained"
                            startIcon={<LibraryBooksIcon />}
                            sx={{
                              width: "80%",
                              borderRadius: "15px",
                              backgroundColor: "#FE6D8E",
                              "&:hover": {
                                backgroundColor: "#1b5e20",
                              },
                            }}
                          >
                            Remove
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
          </div>}
      </div>
    </>
  );
};
export default MyComponent;
