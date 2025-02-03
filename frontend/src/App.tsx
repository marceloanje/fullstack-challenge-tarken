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
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const MyComponent = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#dce0e2", boxShadow: "none"}}>
        <Toolbar>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#F2911B", marginRight: 10}}>
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
        {/* {selectedTab === 0 && <div>Conteúdo da página Search</div>} */}
        {selectedTab === 0 && (
          <div>
            {/* Título */}
            <Typography variant="h5" sx={{ fontWeight: "400", marginBottom: 2, color: "black" }}>
              Search
            </Typography>

            {/* Barra de Pesquisa */}
            <TextField
              fullWidth
              placeholder="search..."
              variant="outlined"
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                width: "500px",
                marginRight: 2,
                marginBottom: 4,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none"
                  }
                }
              }}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                },
              }}
            />

            {/* Cards de Exibição */}
            <Grid container spacing={3}>
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="300"
                      image="https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg" // Imagem de exemplo
                      alt="Poster movie"
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                        <Typography variant="h6">Título do Filme</Typography>
                        <Box sx={{ display: "flex", alignItems: "center"}}>
                          <StarRoundedIcon sx={{ color: "#FCC419", marginLeft: 0.5}} />
                          <Typography>8.5</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "center"}}>
                        <Button 
                          variant="contained"
                          startIcon={<LibraryBooksIcon />}
                          sx={{
                            borderRadius: "15px",
                            backgroundColor: '#2e7d32',
                            '&:hover': {
                              backgroundColor: '#1b5e20'
                            }
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