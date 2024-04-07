"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  // Define the type for an array of strings
  type TextArray = string[];

  // Function to generate a random ASCII character or a space with bigger spaces
  const getRandomAsciiChar = (): string => {
    // Higher chance to return a space
    if (Math.random() < 0.6) {
      // Adjust the probability as needed
      return " ";
    } else {
      const asciiCode = Math.floor(Math.random() * 94) + 33;
      return String.fromCharCode(asciiCode);
    }
  };

  // Function to generate a random string of a given length with bigger spaces
  const getRandomAsciiString = (length: number): string => {
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += getRandomAsciiChar();
    }
    return randomString;
  };

  // State to store the array of ASCII strings
  const [randomTextElements, setRandomTextElements] = useState<TextArray>([]);

  // Effect to update the ASCII strings every 100ms, only after the component mounts
  useEffect(() => {
    setRandomTextElements(
      Array.from({ length: 40 }, () => getRandomAsciiString(80))
    ); // Initial set

    const interval = setInterval(() => {
      setRandomTextElements(
        Array.from({ length: 40 }, () => getRandomAsciiString(80))
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      id="bannerSVG"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 1354 911"
      className="opacity-20"
      style={{
        background: "rgb(6, 20, 52)",
        width: "100%",
      }}
    >
      {randomTextElements.map((textString, index) => (
        <text
          key={index}
          x="0" // Start from the very edge
          y={20 + index * 20} // Adjust the Y position for each text element
          fill="#7d9ddf"
          fontSize="12px" // Adjust font size as needed
          dominantBaseline="hanging"
          letterSpacing="25px" // Adjust letter spacing as needed
        >
          {textString}
        </text>
      ))}
    </svg>
  );
}
