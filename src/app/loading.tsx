"use client";
import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="grid place-content-center h-screen">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
