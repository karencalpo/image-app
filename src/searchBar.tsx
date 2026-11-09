import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";


type SearchText = {
  text: string,
  onChange: (text: string) => void;
};

const SearchBar = ({ text, onChange }: SearchText) => {

  return (
    <TextField 
      id="file_pick" 
      variant="outlined"
      size="small"
      slotProps={{ 
        htmlInput: { 'type': 'text' },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }
      }}
      value={text}
      onChange={(e) => { 
        onChange(e.target.value)
        console.log(e.target.value)
      }}
      placeholder="Search images..."
      sx={{
        width: "500px",
        marginBottom: 3,
        marginTop: 1
      }}
    />
  );
}

export default SearchBar;