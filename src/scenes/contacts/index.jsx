import { Box, Toolbar, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fetchContacts = async () => {
    const response = await fetch("http://localhost:5000/users");
    const result = await response.json();

    return result.map((user) => ({
      ...user,
      // Extracting nested strings into new top-level keys
      street: user.address?.street,
      city: user.address?.city,
      zipcode: user.address?.zipcode,
    }));
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column-cell",
    },

    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "street",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipcode",
      headerName: "Zipcode",
      flex: 1,
    },
  ];
  return (
    <Box m={"20px"}>
      <Header
        title={"Contacts"}
        subtitle={"List of Contacts for future reference"}
      />
      <Box
        m={"40px 0 0 0"}
        height={"75vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column-cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiDataGrid-toolbar": {
            display: "flex", // Moves items to the left if they were end-aligned
            justifyContent: "flex-start", // Or use "flex-start" depending on your version
            padding: "10px",
            backgroundColor: colors.primary[400],
          },
        }}
      >
        <DataGrid
          rows={data || []}
          columns={columns}
          loading={isLoading}
          showToolbar
        />
        {isError && <div style={{ color: "red" }}>Error: {error.message}</div>}
      </Box>
    </Box>
  );
};

export default Contacts;
