import { Select } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import { genres } from "../api/mock";
import { useNavigate } from "react-router-dom";
function SearchBox({ setGenre, genre, page, setPage, setName }) {

  const navigate = useNavigate();
  const [tempName, setTempName] = useState("");

  return (
    <div className="flex flex-row gap-5">
      <Search
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        placeholder="serach by name"
        className="dark:h-[30px] "
        onSearch={(name) => {
          if (name) {
            setName(name);
            setPage(1);
            setGenre(null);
          }
          navigate(`/?query=${name}&page=${page}'`, {
            state: { name: name, page: page },
          });
        }}
      />
      <Select
        value={genre}
        placeholder="select genre"
        onChange={(e) => {
          setGenre(e);
          setName(null);
          setTempName(null);
          setPage(1);

          navigate(`/?with_genres=${e}&page=${page}'`, { state: { genre: e } });
        }}
        className="w-[200px] text-center"
        options={genres?.map((item) => ({ value: item.id, label: item.name }))}
      />
    </div>
  );
}

export default SearchBox;
