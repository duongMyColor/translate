import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

const history = [
  {
    title: "English > French",
    text: "Our live chat is open 9am-8pm on weekdays, and 10am-5pm on weekends.",
    translation:
      "Notre chat en direct est ouvert de 9h à 20h en semaine et de 10h à 17h le week-end",
  },
  {
    title: "English > French",
    text: "Where is the train station?",
    translation: "Où est la gare?",
  },
  {
    title: "English > Ukrainian",
    text: "There is a possibility of rain in the evening, please take the umbrella with you",
    translation:
      " із собою парасольку.Увечері можливий дощ, візьміть із собою парасол",
  },
  {
    title: "English > Georgian",
    text: "Take control of your payments. Say goodbye to credit card fees and say hello to instant settlements.",
    translation:
      "ონმგონმდ3გინ.განამბაგნონგმბგ6ნოგმნ.აგ8გნეომნბაფგმგომაფამბ.ბაგნონმqs ონგამბაგონ დინბნბ6აგმნბდბ6ნოგოლს. ონმგონმდ3გინ.განამბაგნონგმბგ6ნოგმნ.აგ8გნეომნბაფგმგომაფამბ.ბაგნონმqs ონგამბაგონ დინბნბ6აგმნბდბ6ნოგოლს.",
  },
  {
    title: "English > Georgian",
    text: "The culture and people were very interesting",
    translation:
      "onmgmond3g6n.gamabmgonbgm6ofmgmn.@ag88gncmogmbagfgmngmoafamnb.bagmnom Ongbamdgon dynbngfa6gamndb6mgogol",
  },
];

export default function ListShow({history}) {
  return (
    <Box sx={{ flexGrow: 1, paddingTop: 2 }}>
      <Grid container spacing={1} sx={{
           gridAutoFlow: "dense", // Cho phép các thẻ fit nhau
      }}>
        {history.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ background: "#f3f6fb", border: "none" }}>
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
                        color: "#7c95b1",
                        textAlign: "left",
                        fontFamily: "'Inter-SemiBold', sans-serif",
                        fontSize: "8.199999809265137px",
                        fontWeight: "600",

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
                      color: "#8f99ad",
                      textAlign: "left",
                      fontFamily: "'Inter-SemiBold', sans-serif",
                      fontSize: "11px",
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
                    color: "#c1c5ce",
                    textAlign: "left",
                    fontFamily: "'Inter-SemiBold', sans-serif",
                    fontSize: "10px",
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
