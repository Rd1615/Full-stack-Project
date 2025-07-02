import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 900px)"); // Adjusted breakpoint for better responsiveness
  const [isSidebarOpen, setIsSidebarOpen] = useState(isNonMobile); // Sidebar closed by default on mobile
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  return (
    <Box display="flex" width="100vw" height="100vh" overflow="hidden">
      {/* Sidebar */}
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <Box
        component="main"
        flexGrow={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          overflow: "auto",
          }}
      >
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box p={isNonMobile ? "24px" : "16px"}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
