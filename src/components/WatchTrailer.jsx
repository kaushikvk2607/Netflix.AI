import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTrailer } from "../store/configSlice";

const WatchTrailer = () => {
  const dispatch = useDispatch();
  const videoUrl = useSelector((store) => store.config?.videoUrl);

  const modalRef = useRef(null);

  if (!videoUrl) return null;

  const videoId = videoUrl.split("v=")[1]?.split("&")[0];
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1`;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") dispatch(removeTrailer());
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [dispatch]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(removeTrailer());
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={handleOutsideClick} 
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800"
      >
        <button
          onClick={() => dispatch(removeTrailer())}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-red-600 text-white rounded-full transition-colors duration-200 group"
        >
          ✕
        </button>

        <iframe
          className="w-full h-full"
          src={embedUrl}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default WatchTrailer;
