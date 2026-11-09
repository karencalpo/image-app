import { useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

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
}

const Item = ({ file }: ItemProps) => {
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
  </StyledPaper>
};

export default Item;