import { Progress, Skeleton } from "antd";
import React from "react";
import { ApiOutlined, StarFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../api/apiService";
import SkeletonImage from "antd/es/skeleton/Image";
import { round, separate } from "../../helper/helper";

function MainPage() {
  const location = useLocation();
  const id = location.state.movieId;
  const detailsQuery = useQuery({
    queryKey: ["movieDetail"],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
    retry: 0,
    staleTime: Infinity,
  });
  const genreList = detailsQuery?.data?.genres;
  const productionList = detailsQuery?.data?.production_countries;
  const movieScore = round(detailsQuery?.data?.vote_average, 1);
  const voteCount = detailsQuery?.data?.vote_count;
  const overView = detailsQuery?.data?.overview;
  const year = detailsQuery?.data?.release_date;
  const budget = detailsQuery?.data?.budget;
  const runTime = detailsQuery?.data?.runtime;
  const homePage = detailsQuery?.data?.homepage;

  let newYear = "";
  if (year) {
    for (let i = 0; i < 4; i++) {
      newYear += year[i];
    }
  }
  return (
    <div className={`relative  flex  items-center  h-screen `}>
      {detailsQuery.data && !detailsQuery.isLoading && !detailsQuery.isError ? (
        <>
          <div
            className={`!z-40 text-white  absolute p-5 flex flex-row gap-14 w-full  `}
          >
            <img
              className="w-[600px] shadow border rounded-lg "
              src={detailsQuery?.data?.poster_path}
            />
            <div className="flex flex-col gap-2">
              <section className="flex flex-row justify-between w-[90%]">
                {year && (
                  <h2 className="text-5xl font-semibold">
                    {detailsQuery?.data?.title}({newYear})
                  </h2>
                )}
                <Progress
                  status="active"
                  strokeColor={{
                    "0%": "#FF0000",
                    "65%": "#FFFF00",
                    "80%": "#008000",
                  }}
                  className={`!text-xl ${
                    movieScore < 5
                      ? "!text-red-600"
                      : movieScore >= 7
                      ? "!text-[#008000]"
                      : "!text-yellow-300"
                  }`}
                  format={() => (
                    <div className={`!text-lg font-semibold flex flex-col`}>
                      <div className="text-lg">
                        <StarFilled className="!text-xl text-yellow-300 " />
                        <span
                          className={`text-2xl ${
                            movieScore < 5
                              ? "!text-red-600"
                              : movieScore >= 7
                              ? "!text-green-500"
                              : "!text-yellow-300"
                          }`}
                        >
                          {movieScore}
                        </span>
                      </div>
                      <div className="bg-yellow-300 h-[1px] w-1/2 m-auto" />(
                      {voteCount})
                    </div>
                  )}
                  percent={movieScore * 10}
                  type="dashboard"
                />
              </section>
              <div className="flex flex-wrap w-full text-xl gap-5 justify-between py-5 text-left">
                <p className="w-1/2">
                  <span className="text-2xl font-bold text-yellow-300">
                    Genres:{" "}
                  </span>{" "}
                  {genreList?.map((item, i) => {
                    if (i === 0) {
                      return item.name;
                    } else {
                      return "," + item.name;
                    }
                  })}
                </p>
                <p className="w-1/2">
                  <span className="text-2xl font-bold text-yellow-300">
                    Production Countries:{" "}
                  </span>
                  {productionList?.map((item, i) => {
                    if (i === 0) {
                      return item.name;
                    } else {
                      return "," + item.name;
                    }
                  })}
                </p>
                <p className="w-1/2">
                  <span className="text-2xl font-bold text-yellow-300">
                    Budget:
                  </span>
                  {separate(budget)}$
                </p>

                <p className="w-1/2">
                  <span className="text-2xl font-bold text-yellow-300">
                    Run Time:
                  </span>
                  {runTime} minutes
                </p>
                <a target="_blank" href={homePage} className="w-1/2">
                  <span className="text-2xl font-bold text-yellow-300">
                    Home Page:
                  </span>

                  {homePage}
                </a>
              </div>
              <div className="h-1 bg-yellow-300 w-1/2" />
              <p className="text-2xl font-semibold justify-stretch w-[70%] ">
                {" "}
                {overView}
              </p>
            </div>
          </div>
          {detailsQuery?.data?.backdrop_path ? (
            <img
              src={detailsQuery?.data?.backdrop_path}
              className="absolute w-screen  brightness-50  blur-sm"
            />
          ) : (
            <div className="h-screen " />
          )}
        </>
      ) : detailsQuery.isLoading ? (
        <div className="flex flex-row gap-14 py-32 px-6">
          <SkeletonImage active className="!w-[600px] !h-[850px]  " />

          <Skeleton
            className="w-[50%] mt-52 "
            active
            paragraph={{ rows: 6, width: 200 }}
          />
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

export default MainPage;
