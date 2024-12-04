import "./styles.css";

import { Root } from "./Root/Root";
import { Box } from "@mui/material";

export default function App() {
  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Root />
    </Box>
  );
}
