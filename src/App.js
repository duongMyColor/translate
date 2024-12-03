import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Grid,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Select from "react-select";

const languages = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "uk", label: "Ukrainian" },
  { value: "ka", label: "Georgian" },
];

const App = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [fromLanguage, setFromLanguage] = useState(languages[0]);
  const [toLanguage, setToLanguage] = useState(languages[1]);

  const handleTranslate = () => {
    // Chức năng dịch (giả lập)
  window.electron.translateText(inputText, (result) => {
    setOutputText(result.translated_text || "Translation error.");
  });
  };

  const swapLanguages = () => {
    const temp = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(temp);
    setInputText(outputText);
    setOutputText(inputText);
  };

  return (
    <Box
      sx={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        mb={2}
        sx={{ color: "#4c4c4c" }}
      >
        Language Translator
      </Typography>

      {/* Input and Output Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Typography variant="body1" mb={1} fontWeight="bold" color="#4c4c4c">
            Input Text:
          </Typography>
          <TextField
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            multiline
            rows={6}
            placeholder="Type here..."
            fullWidth
            variant="outlined"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f1f1f1",
                borderRadius: "10px",
                borderColor: "#d1d1d1",
              },
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={2}
          textAlign="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={swapLanguages}
            color="primary"
            sx={{ fontSize: "30px" }}
          >
            <SwapHorizIcon />
          </IconButton>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography variant="body1" mb={1} fontWeight="bold" color="#4c4c4c">
            Translated Text:
          </Typography>
          <TextField
            value={outputText}
            multiline
            rows={6}
            placeholder="Translation will appear here..."
            fullWidth
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f1f1f1",
                borderRadius: "10px",
                borderColor: "#d1d1d1",
              },
            }}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Language Selection */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={5}>
          <Typography variant="body1" fontWeight="bold" color="#4c4c4c">
            From Language:
          </Typography>
          <Select
            options={languages}
            value={fromLanguage}
            onChange={(option) => setFromLanguage(option)}
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
                borderColor: "#d1d1d1",
              }),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2} textAlign="center">
          <IconButton
            onClick={swapLanguages}
            color="primary"
            sx={{ fontSize: "30px" }}
          >
            <SwapHorizIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography variant="body1" fontWeight="bold" color="#4c4c4c">
            To Language:
          </Typography>
          <Select
            options={languages}
            value={toLanguage}
            onChange={(option) => setToLanguage(option)}
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
                borderColor: "#d1d1d1",
              }),
            }}
          />
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleTranslate}
          sx={{
            padding: "12px 20px",
            backgroundColor: "#007BFF",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          Translate
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setInputText("")}
          sx={{
            padding: "12px 20px",
            fontWeight: "bold",
            borderColor: "#007BFF",
            color: "#007BFF",
            "&:hover": {
              backgroundColor: "#007BFF",
              color: "#fff",
            },
          }}
        >
          Clear
        </Button>
      </Box>

      {/* History Section */}
      <Paper
        sx={{
          padding: "20px",
          marginTop: "30px",
          backgroundColor: "#f8f9fa",
          boxShadow: "none",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "#4c4c4c", mb: 2 }}
        >
          History
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ color: "#007BFF", fontWeight: "bold" }}
            >
              English → Georgian
            </Typography>
            <Typography variant="body2" sx={{ color: "#4c4c4c" }}>
              The culture and people were very interesting
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ color: "#007BFF", fontWeight: "bold" }}
            >
              English → French
            </Typography>
            <Typography variant="body2" sx={{ color: "#4c4c4c" }}>
              Where is the train station?
            </Typography>
          </Grid>
        </Grid>
        {/* Separator */}
        <Box sx={{ mt: 2, mb: 2, height: "1px", backgroundColor: "#d1d1d1" }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ color: "#007BFF", fontWeight: "bold" }}
            >
              English → Ukrainian
            </Typography>
            <Typography variant="body2" sx={{ color: "#4c4c4c" }}>
              There is a possibility of rain in the evening, please take the
              umbrella with you
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ color: "#007BFF", fontWeight: "bold" }}
            >
              English → Georgian
            </Typography>
            <Typography variant="body2" sx={{ color: "#4c4c4c" }}>
              Take control of your payments. Say goodbye to credit card fees and
              say hello to instant access.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default App;
