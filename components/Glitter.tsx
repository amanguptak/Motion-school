"use client";
import React, { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

interface GlitterProps {
  isConfettiActive?: boolean;
}

const Glitter = ({ isConfettiActive }: GlitterProps) => {
  const { width, height } = useWindowSize();

  const [isConfetti, setConfettiActive] = useState(isConfettiActive);
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  },[]);

  return <div>{isConfetti && <Confetti width={width} height={height} />}</div>;
};

export default Glitter;
