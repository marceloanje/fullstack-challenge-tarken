import React, { useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const MyComponent = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

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
      // console.log(movies);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
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

            {/* Cards de Exibição */}
            <Grid container spacing={3}>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="300"
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
        {selectedTab === 1 && <div>Conteúdo da página My Library</div>}
      </div>
    </>
  );
};
export default MyComponent;
