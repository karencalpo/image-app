import { useState } from "react";
import { Button, TextField, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Home = () => {
  // const [count, setCount] = useState(0);
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

  return (
    <>
      <div
        style={{
          marginBottom: "10px"
        }}
      >
        <TextField 
          id="outlined-basic" 
          variant="outlined" 
          slotProps={{ htmlInput: { 'type': 'file' } }} 
          size="small"
          sx={{
            marginBottom: 1
          }}
        />
        <Button
          type="submit"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{
            marginLeft: 2,
            marginTop: 0.25
          }}
        >
          Upload files
        </Button>
      </div>
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
