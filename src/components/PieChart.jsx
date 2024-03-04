import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";

const BasicPie = () => {
  const loadingState = useSelector((state) => state?.graph?.loadingState);
  const graphData = useSelector((state) => state?.graph?.graphData);
  let caste_description = [];


  if (loadingState === "LOADED") {
    caste_description = graphData?.[1]?.caste_des;
  }
  const total_count = caste_description.reduce((acc, curr) => {
    return curr.value + acc;
  }, 0);

  const transformedArray = caste_description.map((item, idx) => ({
    id: idx,
    value: item.value,
    label: `${item.name} [ ${((item.value / total_count) * 100).toFixed(2)}% ]`,
  }));


  return (
    <PieChart
      series={[
        {
          data: transformedArray,
        },
      ]}
      width={400}
      height={160}
    />
  );
};

export default BasicPie;
