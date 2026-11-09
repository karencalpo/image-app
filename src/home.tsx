import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/material/styles";
import FileSelect from './fileSelect';
import Item from './item';

const Home = () => {

  const [files, setFiles] = useState<string[]>([]);
  const [resetUpload, setResetUpload] = useState(0);

  
  // const StyledTypography = styled(Typography)(({ theme }) => ({
  //   ...theme.typography.h1,
  //   fontSize: "18px"
  // }));

  const handleFiles = () => {
    fetch("/api/images", {
      method: "GET"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Files not fetched successfully');
      }
      return response.json();
    })
    .then((files: string[]) => {
      setFiles(files);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  };

  const handleFileSelect = (file: File): void => {
    const formData = new FormData();

    formData.append("uploaded_file", file);

    fetch("/api/upload", {
      method: "POST",
      body: formData
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Upload was not successful');
      }
      handleFiles();
      setResetUpload((prev) => prev + 1);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  };

  const handleDelete = (file: string) => {
    fetch(`/api/delete/${encodeURIComponent(file)}`, {
      method: "DELETE"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('There was a problem deleting the image');
      }
      handleFiles();
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  };

  useEffect(() => {
    handleFiles();
  }, []);

  return (
    <>
      <Typography 
        variant="h1"
        sx={{
          fontSize: "48pt"
        }}
      >
        Image Gallery
      </Typography>
      <FileSelect key={resetUpload} onSelect={handleFileSelect} />
      {files.length > 0 ? 
      <Box 
        sx={{ 
          flexGrow: 1, 
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "rgba(0, 0, 0, 0.23)",
          borderRadius: "10px",
          padding: "15px 15px 50px 15px"

        }}
      >
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {files.map((file) => (
                <Grid 
                  key={file} 
                  size={{ xs: 2, sm: 4, md: 4 }}
                  sx={{
                    objectFit: "cover",
                    "& .MuiPaper-root": {
                      height: "200px"
                    }
                  }}  
                >
                  <Item 
                    key={file}
                    file={file}
                    onDelete={handleDelete}
                  />
                </Grid>
              ))
              }
        </Grid>
      </Box>: "No images found."}
    </>
  );
};

export default Home;
