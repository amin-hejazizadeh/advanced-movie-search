import React, { useState } from "react";
import DetailsCard from "./DetailsCard";
import { useNavigate } from "react-router-dom";

function MovieCard({ data }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const cover = data.poster_path;
  return (
    <li
      onClick={() =>
        navigate(`/movie/${data.title}`, { state: { movieId: data.id } })
      }
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      className="flex   flex-col w-[320px] h-[500px] rounded-sm  p-3 justify-around text-center items-center hover:cursor-pointer shadow dark:shadow-red-600 dark:shadow"
    >
      <img
        className={`rounded-md relative  ${
          show ? "brightness-50 blur-sm" : "brightness-100"
        }`}
        src={cover}
      />
      <h2 className="font-semibold ">{data.title}</h2>
      {show && (
        <div
          onMouseOver={() => setShow(true)}
          onMouseOut={() => setShow(false)}
          className="absolute  "
        >
          <DetailsCard data={data} />
        </div>
      )}
    </li>
  );
}

export default MovieCard;
