import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import MaleIcon from "@mui/icons-material/Male";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import { useEffect, useState } from "react";
import axios from "axios";
import FemaleIcon from "@mui/icons-material/Female";
import { useDispatch, useSelector } from "react-redux";
import { fetchGraphData } from "../../store/action";
import PieChart from "../../components/PieChart";
import BarChartD from "../../components/BarchartD";
import Topbar from "../global/Topbar";

const Dashboard = () => {
  const [state, setState] = useState(["Rajasthan"]);
  const [parliamentary, setparliamentary] = useState([]);
  const [selectparliamentary, setselectedparliamentary] = useState(
    "Tonk-Sawai-Madhopur"
  );
  const [Assembly, setAssembly] = useState([]);
  const [selectAssembly, setSelectAssembly] = useState("All");
  const [Part, setPart] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);
  const [selectpart, setselectpart] = useState("All");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const graphdata = useSelector((state) => state?.graph?.graphData);
  const loadingState = useSelector((state) => state?.graph?.loadingState);
  let male_count = 0,
    female_count = 0;

  if (loadingState === "LOADED") {
    const bar_graph_by_Genderchart = graphdata[0]?.bar_graph_by_Genderchart;
    female_count =
      bar_graph_by_Genderchart.female.reduce((acc, curr) => acc + curr, 0) || 0;
    male_count =
      bar_graph_by_Genderchart.male.reduce((acc, curr) => acc + curr, 0) || 0;
  }

  const total_count = male_count + female_count;
  const male_percent = (male_count / total_count) * 100,
    female_percent = (female_count / total_count) * 100;

  useEffect(() => {
    dispatch(
      fetchGraphData({ AssemblyConstituency: "All", part_number: "All" })
    );
    axios({
      method: "POST",
      url: "http://localhost:5000//get_assemblyConstituency_names",
      data: {
        state: state,
      },
    }).then((res) => {
      setAssembly(res.data);
    });
    axios({
      method: "POST",
      url: "http://localhost:5000//get_part_numbers",
      data: {
        AssemblyConstituency: selectAssembly,
      },
    }).then((res) => {
      setPart(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, selectAssembly]);

  const handleAssemblyChange = (selectedOption) => {
    if (selectedOption) {
      setSelectAssembly(selectedOption);
    }
  };
  const handlePartChange = (selectedOption) => {
    if (selectedOption) {
      setselectpart(selectedOption);
    }
  };

  const ApplyHandder = ({ selectAssembly, selectpart }) => {
    dispatch(
      fetchGraphData({
        AssemblyConstituency: selectAssembly,
        part_number: selectpart,
      })
    );
  };

  return (
    <>
      <Topbar setIsSidebar={setIsSidebar} />
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Cosmic" subtitle="Welcome to your Cosmic-Portal" />
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
              Download Reports(In-Progress)
            </Button>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" width="full" gap={5}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={state}
            sx={{
              width: 170,
              "& .MuiInputBase-root": { height: "40px", width: "170px" },
            }} // Adjust height as needed
            defaultValue={"Rajasthan"}
            renderInput={(params) => (
              <TextField {...params} label="Select State" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={parliamentary}
            defaultValue={selectparliamentary}
            sx={{
              width: 200,
              "& .MuiInputBase-root": { height: "40px", width: "200px" },
            }} // Adjust height as needed
            renderInput={(params) => (
              <TextField {...params} label="Select parliamentary" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Assembly}
            sx={{
              width: 200,
              "& .MuiInputBase-root": { height: "40px", width: "200px" },
            }} // Adjust height as needed
            defaultValue={selectAssembly}
            onChange={(event, selectedOption) =>
              handleAssemblyChange(selectedOption)
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Assembly" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Part}
            sx={{
              width: 150,
              "& .MuiInputBase-root": { height: "40px", width: "150px" },
            }} // Adjust height as needed
            defaultValue={selectpart}
            onChange={(event, selectedOption) =>
              handlePartChange(selectedOption)
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Part No" />
            )}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[700],
              marginRight: 100,
            }}
            onClick={ApplyHandder}
          >
            Apply
          </Button>
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          marginTop={5}
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={selectparliamentary}
              subtitle="parliamentary constituency"
              icon={
                <LocationOnIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Assembly constituency"
              subtitle={selectAssembly}
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Total Male"
              subtitle={male_count}
              increase={`${male_percent.toFixed(2)}%`}
              icon={
                <MaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Total-Female"
              subtitle={female_count}
              increase={`${female_percent.toFixed(2)}%`}
              icon={
                <FemaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>

          {/* ROW 2 */}
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            ></Box>
            <Box height="250px" m="-20px 0 0 0">
              <BarChartD />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Caste Distribution
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <PieChart />
              {/* <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {total_count}
            </Typography> */}
              {/* <Typography>Total Population</Typography> */}
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Sales Quantity
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            padding="30px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
            >
              Geography Based Traffic
            </Typography>
            <Box height="200px">
              <GeographyChart isDashboard={true} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
