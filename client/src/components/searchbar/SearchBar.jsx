"use client";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";

const SearchBar = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(search ? search.get("q") : "");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      router.push(`/search?q=${searchQuery}`);
    }
    router.push(`/search?q=${searchQuery}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          background: "#f4f4f5",
          color: "#fff",
          width: "100%",
          justifyContent: "space-between",
          borderRadius : "20px"

        }}
      >
        <TextField
          sx={{
            "& fieldset": { border: 'none' },
            flexGrow: 1,
            outline : "none",
            borderRadius : "20px"
            
          }}
          id="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          size="small"
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "#000" }} />
        </IconButton>
      </Box>
      </form>
  );
};

export default SearchBar;
