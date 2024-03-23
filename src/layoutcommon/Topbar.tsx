import { AppBar, Toolbar, Typography } from "@mui/material";
import sizeConfigs from "../config/sizeConfigs";
import colorConfigs from "../config/colorConfigs";

const Topbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color
      }}
    >
      <Toolbar>
        <Typography variant="h6">
          React sidebar with dropdown
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;