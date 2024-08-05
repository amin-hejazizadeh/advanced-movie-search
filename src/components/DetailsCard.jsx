import { StarFilled } from "@ant-design/icons";
import React from "react";
import { genres } from "../api/mock";
import { round } from "../helper/helper";

function DetailsCard({ data }) {
  
  const genreList = genres.filter((item) => data.genre_ids.includes(item.id));
  const overview = data.overview;
  const voteCount = data.vote_count;
  const movieScore = round(data.vote_average, 1);
  const releaseDate = data.release_date.replaceAll("-", "/");

  return (
    <div className="text-white w-[290px] px-2 flex flex-col gap-3 ">
      <div className="flex flex-row items-center gap-1">
        <StarFilled className="text-yellow-300" />
        <div className="flex flex-row  items-end">
          <span className="text-lg">{movieScore}</span>
          <span className="text-md "> /10</span>
          <span className="ml-2">({voteCount})</span>
        </div>
      </div>
      <div className="flex flex-row">
        {genreList.map((genre, i) =>
          i === 0 ? <p>{genre.name}</p> : <p>,{genre.name}</p>
        )}
      </div>
      <h2 className="text-start">release Date : {releaseDate}</h2>
      <p className="text-wrap overflow-auto h-[150px] text-justify  tracking-tight">
        {overview ? overview : "there is no overview for this moive!"}
      </p>
    </div>
  );
}

export default DetailsCard;
