import { Box, useTheme, Tooltip } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({
  progress,
  male_count,
  female_count,
  size = "40",
  tooltipText = `Male: ${male_count}, Female: ${female_count}`,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  
  return (
    <Tooltip title={tooltipText} interactive>
      <Box
        sx={{
          background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
          borderRadius: "50%",
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </Tooltip>
  );
};

export default ProgressCircle;
