import React from "react";
import Header from "../../components/Header";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import GeographyChart from "../../components/GeographyChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const response = await fetch(
        "https://69b13113adac80b427c44986.mockapi.io/data/1",
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  const transactions = dashboardData?.transactions || [];

  const row1 = [
    {
      title: "12,361",
      subtitle: "Emails sent",
      progress: "0.75",
      increase: "+14%",
      icon: (
        <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
      ),
    },
    {
      title: "32,441",
      subtitle: "New  clients",
      progress: "0.30",
      increase: "+5%",
      icon: (
        <PersonAddIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
    },
    {
      title: "32,441",
      subtitle: "New  clients",
      progress: "0.30",
      increase: "+5%",
      icon: (
        <PersonAddIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
    },
    {
      title: "1,325,134",
      subtitle: "Traffic Inbound",
      progress: "0.80",
      increase: "+43%",
      icon: (
        <TrafficIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
    },
  ];
  // Handle loading state to prevent the "map of undefined" error

  return (
    <Box
      m={"20px"}
      height="90vh" // Restrict height to viewable area
      overflow="auto" // Enable scrolling for this box only
      pr="10px" // Add some padding so the scrollbar doesn't hug the grid
      sx={{
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: colors.primary[500],
          borderRadius: "10px",
        },
      }}
    >
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent={"space-between"}
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={{ xs: "10px", sm: "0" }}
        position="sticky" // Keeps header at the top during scroll
        top="0"
        zIndex="10"
        pb="20px"
        backgroundColor={theme.palette.background.default}
      >
        <Header title={"DASHBOARD"} subtitle={"Welcome to your dashboard"} />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* Grid & CHARTS */}
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        gap={"20px"}
      >
        {/* Row 1 */}
        {row1.map((stat, index) => (
          <Box
            key={index}
            gridColumn={{ xs: "span 12", sm: "span 6", md: "span 3" }}
            backgroundColor={colors.primary[400]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <StatBox
              title={stat.title}
              subtitle={stat.subtitle}
              progress={stat.progress}
              increase={stat.increase}
              icon={stat.icon}
            />
          </Box>
        ))}

        {/* Row 2*/}
        <Box
          gridColumn={{ xs: "span 12", md: "span 8" }}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt={"25px"}
            p={"0 30px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={"600"}
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight={"bold"}
                color={colors.greenAccent[500]}
              >
                $59,342.42
              </Typography>
            </Box>

            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box height={"250px"} mt={"-20px"}>
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* TRANSACTIONS */}
        <Box
          gridColumn={{ xs: "span 12", md: "span 4" }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          height="300px" // Add this fixed height to trigger overflow
          sx={{
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colors.primary[500],
              borderRadius: "10px",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            color={colors.grey[100]}
            p="15px"
            position="sticky"
            top="0"
            backgroundColor={colors.primary[400]}
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>

          {isLoading ? (
            <Box p="15px">Loading Transactions...</Box>
          ) : error ? (
            <Box p="15px" color="red">
              Error: {error.message}
            </Box>
          ) : (
            transactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))
          )}
        </Box>

        {/* Row 3 CHARTS*/}
        <Box
          gridColumn={"span 4"}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          p={"30px"}
        >
          <Typography variant="h5" fontWeight={"600"}>
            Campaign
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            mt={"25px"}
          >
            <ProgressCircle size={{ xs: "100px", sm: "125px", md: "150px" }} />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>

        <Box
          gridColumn={"span 4"}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight={"600"}
            sx={{ p: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box mt={"-20px"} height={{ xs: "200px", md: "250px" }}>
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn={"span 4"}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          p={"30px"}
        >
          <Typography variant="h5" fontWeight={"600"} sx={{ mb: "15px" }}>
            Geography Based Traffic
          </Typography>
          <Box mt={"-20px"} height={{ xs: "200px", md: "250px" }}>
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
