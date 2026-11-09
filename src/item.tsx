import { useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

type ItemProps = {
  file: string;
  onDelete: (file: string) => void;
}

const Item = ({ file, onDelete }: ItemProps) => {
  return (
    <StyledPaper>
      <img 
        src={`/uploads/${encodeURIComponent(file)}`}
        alt={file}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover"
        }}
      />
      <Button 
        disableRipple 
        onClick={() => onDelete(file)}
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          }
        }}
      >
          Delete
        </Button>
    </StyledPaper>
  )
};

export default Item;