import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Masonry from "@mui/lab/Masonry";



export default function ListShow({ history }) {
  return (
    <Box sx={{ flexGrow: 1, paddingTop: 2 }}>
      <Masonry columns={{ xs: 1, sm: 3, md: 4 }} spacing={1}>
        {history.map((item, index) => (
          <Card
            key={index}
            sx={{
              background: "#f3f6fb",
              border: "none",
              breakInside: "avoid", // Đảm bảo các thẻ không bị ngắt
            }}
          >
            <CardContent sx={{ height: "fit-content" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 1.1,
                }}
              >
                <Box
                  variant="subtitle1"
                  sx={{
                    background: "#c7e5fb",
                    borderRadius: "7.5px",
                    width: "fit-content",
                    height: "26px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 10px",
                  }}
                >
                  <Box
                    sx={{
                      color: "rgb(37 38 39 / 71%)",
                      textAlign: "left",
                      fontFamily: "'Inter-SemiBold', sans-serif",
                      fontSize: "9px",
                      fontWeight: "700",
                      width: "fit-content",
                      height: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {item.language}
                  </Box>
                </Box>

                <Box>
                  <StarBorderOutlinedIcon fontSize="12px" />
                </Box>
              </Box>
              <Box
                variant="body2"
                sx={{ marginBottom: 1 }}
                height="fit-content"
              >
                <Box
                  sx={{
                    color: "rgb(37 38 39 / 71%)",
                    textAlign: "left",
                    fontFamily: "'Inter-SemiBold', sans-serif",
                    fontSize: "12px",
                    lineHeight: "15px",
                    fontWeight: "600",
                    width: "100%",
                    height: "fit-content",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {item.text}
                </Box>
              </Box>

              <Box
                sx={{
                  color: "#87898d",
                  textAlign: "left",
                  fontFamily: "'Inter-SemiBold', sans-serif",
                  fontSize: "11px",
                  fontWeight: "600",
                  lineHeight: "15px",
                  width: "100%",
                  height: "fit-content",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {item.translation}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Masonry>
    </Box>
  );
}
