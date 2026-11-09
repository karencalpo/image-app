import { useState } from "react";
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface fileSelectProps {
  onSelect: (file: File) => void;
};

const FileSelect = ({ onSelect }: fileSelectProps) => {
  const [selectFile, setSelectFile] = useState<File | null>(null);
  
  return (
    <>
      <TextField 
          id="file_pick" 
          variant="outlined" 
          slotProps={{ htmlInput: { 'type': 'file', 'accept': 'image/*' }}}
          size="small"
          onChange={(e) => { 
            const event = e.target;
            if (event instanceof HTMLInputElement) {
              const file = event.files?.[0] ?? null;
              setSelectFile(file);
            }
          }}
          sx={{
            marginBottom: 1
          }}
        />
        <Button
          disableRipple
          type="submit"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onClick = {() => { 
            if(selectFile !== null) {
              onSelect(selectFile);
            }
          }}
          sx={{
            marginLeft: 2,
            marginTop: 0.25
          }}
        >
          Upload files
        </Button>    
    </>
  );
};

export default FileSelect;