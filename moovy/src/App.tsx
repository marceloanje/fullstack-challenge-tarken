import React, { useState } from "react";
import { AppBar, Toolbar, Tabs, Tab, Typography } from "@mui/material";

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
      <div style={{ marginTop: "64px", padding: "16px" }}>
        {selectedTab === 0 && <div>Conteúdo da página Search</div>}
        {selectedTab === 1 && <div>Conteúdo da página My Library</div>}
      </div>
    </>
  );
};

export default MyComponent;
