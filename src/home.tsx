import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileSelect from './fileSelect';

const Home = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  // const [selectFile, setSelectFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    console.log(file);
  };

  return (
    <>
      <FileSelect onSelect={handleFileSelect} />
      <Box 
        sx={{ 
          flexGrow: 1, 
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "rgba(0, 0, 0, 0.23)",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(6)).map((_, index) => (
            <Grid 
              key={index} 
              size={{ xs: 2, sm: 4, md: 4 }}
              sx={{
                objectFit: "cover",
                "& .MuiPaper-root": {
                  height: "200px"
                }
              }}  
            >
              <Item>{index + 1}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
