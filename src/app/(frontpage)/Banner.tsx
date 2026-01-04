"use client";
import React, { useEffect, useRef } from "react";

const ASCII_ART = `
  __  __ _     _  ____            _             _ 
 |  \\/  (_) __| |/ ___|___  _ __ | |_ _ __ ___ | |
 | |\\/| | |/ _\` | |   / _ \\| '_ \\| __| '__/ _ \\| |
 | |  | | | (_| | |__| (_) | | | | |_| | | (_) | |
 |_|  |_|_|\\__,_|\\____\\___/|_| |_|\\__|_|  \\___/|_|
`;

export default function Banner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let columns: number = 0;
    let rows: number = 0;

    // Store the state of the grid
    // We use a flat array or 2D array. Let's use an array of objects for extra control if needed,
    // but for performance, simple arrays of chars is good.
    // To make it shimmer, we'll store the character at each position.
    let grid: string[] = [];
    let asciiOpacity = 0;
    let frameCount = 0;

    const fontSize = 14;
    // We can just use monospace font where width ~= height or close to it
    // If we want tight spacing like the SVG (letterSpacing="25px"), we can adjust.
    // The original had explicit letterSpacing="25px" presumably on top of font size.
    // Let's stick to a standard grid cell size.
    const cellWidth = 20;
    const cellHeight = 20;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight; // Or fixed height if you prefer
      } else {
        canvas.width = window.innerWidth;
        canvas.height = 911; // Fallback to original viewBox height
      }

      columns = Math.ceil(canvas.width / cellWidth);
      rows = Math.ceil(canvas.height / cellHeight);

      // Initialize grid
      grid = new Array(columns * rows).fill(" ");

      // Initial fill
      for (let i = 0; i < grid.length; i++) {
        if (Math.random() > 0.6) {
          grid[i] = getRandomChar();
        }
      }
    };

    const getRandomChar = () => {
      const asciiCode = Math.floor(Math.random() * 94) + 33;
      return String.fromCharCode(asciiCode);
    };

    // Load background image
    const bgImage = new Image();
    bgImage.src = "/background.png";
    let bgLoaded = false;
    bgImage.onload = () => {
      bgLoaded = true;
    };

    const draw = () => {
      // 1. Randomly update some characters
      // Change ~1-2% of the characters per frame for a shimmer
      const totalChars = columns * rows;
      const changesPerFrame = Math.max(1, Math.floor(totalChars * 0.01)); // 5% shuffle

      for (let i = 0; i < changesPerFrame; i++) {
        const idx = Math.floor(Math.random() * totalChars);
        // Toggle: chance to become empty, chance to become char
        if (Math.random() > 0.5) {
          grid[idx] = Math.random() > 0.7 ? getRandomChar() : " ";
        } else {
          // Just randomize the char if it exists
          if (grid[idx] !== " ") grid[idx] = getRandomChar();
        }
      }

      // 2. Draw everything
      if (!ctx) return;

      // Clear & Draw Background
      ctx.fillStyle = "rgb(6, 20, 52)"; // Match the background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (bgLoaded) {
        ctx.save();
        ctx.globalAlpha = 0.3;
        // Draw image to cover the canvas (like object-fit: cover)
        // Calculate aspect ratios
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = bgImage.width / bgImage.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
          // Canvas is wider than image -> width matches, height is cropped
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          // Canvas is taller than image -> height matches, width is cropped
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgAspect;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.drawImage(bgImage, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
      }

      // Draw Rain with opacity
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#7d9ddf";
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const char = grid[y * columns + x];
          if (char !== " ") {
            ctx.fillText(char, x * cellWidth, y * cellHeight);
          }
        }
      }
      ctx.restore();

      // Draw ASCII Art
      ctx.save();

      // Fade in logic
      frameCount++;
      if (frameCount > 750) {
        // Delay start by ~2 seconds (at 60fps)
        if (asciiOpacity < 1) {
          asciiOpacity += 0.0009; // Adjust speed as needed
          if (asciiOpacity > 1) asciiOpacity = 1;
        }
      }
      ctx.globalAlpha = asciiOpacity;

      ctx.fillStyle = "#ffffff"; // Brighter white for the logo
      // Use a distinct font setting for the art if needed, or same monospace
      // Usually ASCII art looks best with monospace
      const artFontSize = 12; // Larger font size
      ctx.font = `bold ${artFontSize}px monospace`;
      ctx.textBaseline = "top";

      const lines = ASCII_ART.split("\n");
      const lineHeight = artFontSize; // or artFontSize * 1.2
      const artHeight = lines.length * lineHeight;

      // Calculate max width of the art
      let maxLineWidth = 0;
      lines.forEach((line) => {
        const width = ctx.measureText(line).width;
        if (width > maxLineWidth) maxLineWidth = width;
      });

      const startX = (canvas.width - maxLineWidth) / 2;
      const startY = (canvas.height - artHeight) / 2;

      lines.forEach((line, index) => {
        // Center each line individually if you want them centered relative to each other
        // OR left align the block. ASCII art is usually block aligned.
        // Let's optimize for block alignment (using startX) but we could also center each line.
        // Usually ASCII art strings are padded or meant to be left-aligned as a block.
        // If we want each line centered, we'd recalculate x per line.
        // Let's assume block alignment is safer for general ASCII art.

        // HOWEVER, if the user pastes unpadded text, centering each line might look weird or better.
        // Let's try block alignment first (using startX based on max width).
        // Actually, let's just draw it.
        ctx.fillText(line, startX, startY + index * lineHeight);
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    // Initial setup
    resize();

    // Start loop
    draw();

    // Use ResizeObserver to handle parent container resizing (crucial for the shrink animation)
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(); // Force a draw after resize to avoid flickering
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px", // Ensure it has some height if parent doesn't enforce
        display: "block",
        background: "rgb(6, 20, 52)",
      }}
    />
  );
}
