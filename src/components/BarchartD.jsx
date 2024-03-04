import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";

const BarChartD = () => {
  const graphdata = useSelector((state) => state?.graph?.graphData);
  const loadingState = useSelector((state) => state?.graph?.loadingState);
  let maledata = [],
    femaledata = [],
    male_femaleData = [];

  if (loadingState === "LOADED") {
    const bar_graph_by_Genderchart = graphdata[0]?.bar_graph_by_Genderchart;
    femaledata = bar_graph_by_Genderchart.female;
    maledata = bar_graph_by_Genderchart.male;
    male_femaleData =
      graphdata[0]?.bar_graph_by_male_female_countchart?.male_femaleCount;
  }
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      {loadingState === "LOADED" ? (
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["18-25", "25-35", "35-45", "45-55", "55-65", "65+"],
            },
          ]}
          series={[
            { data: maledata, label: "Male" },
            { data: femaledata, label: "Female" },
            { data: male_femaleData, label: "Combined" },
          ]}
          width={900}
          height={300}
        />
      ) : null}
    </div>
  );
};

export default BarChartD;
