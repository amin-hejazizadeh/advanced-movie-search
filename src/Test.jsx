import React from "react";
import MovieCard from "./components/MovieCard";
import { Pagination } from "antd";
import { useStore } from "zustand";
import { useQuery } from "@tanstack/react-query";
import { getMoviesList, getMoviesListBySearch } from "./api/apiService";
import { useNavigate } from "react-router-dom";
import { ApiOutlined } from "@ant-design/icons";
import SkeletonImage from "antd/es/skeleton/Image";

function Test({ genre, page, setPage, name }) {
  const listNumber = [];
  for (let i = 0; i < 20; i++) {
    listNumber.push(i);
  }
  const navigate = useNavigate();
  const listsQuery = useQuery({
    queryKey: ["movieList", genre, page],
    queryFn: () => getMoviesList(genre, page),
    enabled: !!genre,
  });

  const searchQuery = useQuery({
    queryKey: ["movieListBySearch", name, page],
    queryFn: () => getMoviesListBySearch(name, page),
    enabled: !!name,
  });
  console.log(listsQuery, "test");

  return (
    <div>
      {listsQuery?.data || searchQuery?.data || listsQuery.isFetched ? (
        <div className="flex flex-col">
          <ul className="flex flex-wrap justify-center items-center p-2 gap-10  ">
            {searchQuery?.data
              ? searchQuery?.data?.results?.map((item) => {
                  return <MovieCard key={item.id} data={item} />;
                })
              : listsQuery?.data?.results?.map((item) => {
                  return <MovieCard key={item.id} data={item} />;
                })}
          </ul>
          <Pagination
            onChange={(page) => {
              if (genre) {
                navigate(`/?with_genres=${genre}&page=${page}'`, {
                  state: { genre: genre, page: page },
                });
              } else {
                navigate(`/?query=${name}&page=${page}'`, {
                  state: { name: name, page: page },
                });
              }

              setPage(page);
            }}
            className="m-auto py-2"
            total={
              genre
                ? listsQuery?.data?.total_pages
                : searchQuery?.data?.total_pages
            }
            current={genre ? listsQuery?.data?.page : searchQuery?.data?.page}
          />
        </div>
      ) : (searchQuery.isLoading || listsQuery.isLoading && !listsQuery.isFetched) ? (
        <div className="text-3xl flex flex-wrap gap-20 h-[100%] px-8 py-5 w-full">
          {listNumber.map(() => {
            return (
              <div>
                <SkeletonImage active className=" !w-[300px] !h-[500px]   " />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="m-auto w-full text-3xl flex justify-center items-center !h-screen">
          <ApiOutlined className="text-9xl animate-bounce" />
          oops there is somting wrong
        </div>
      )}
    </div>
  );
}

export default Test;
