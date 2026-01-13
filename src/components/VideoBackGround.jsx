const VideoBackGround = ({ trailer, poster }) => {
  if (!trailer) return null;

  const videoId = trailer.split("v=")[1]?.split("&")[0];

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&modestbranding=1&playlist=${videoId}`;

  const posterUrl = poster ? `https://${poster}` : null;

  return (
    <div
      className="
        relative w-full 
        aspect-[16/9] 
        bg-cover bg-center 
        overflow-hidden
      "
      style={{
        backgroundImage: posterUrl ? `url(${posterUrl})` : "none",
      }}
    >
      <iframe
        className="
          absolute top-0 left-0 
          w-full h-full 
          object-cover 
          md:scale-110 
          lg:scale-125 
          xl:scale-150 
          2xl:scale-[1.7]
          transform
        "
        src={embedUrl}
        title="Movie Trailer Background"
        allow="autoplay; encrypted-media;"
        loading="lazy"
        allowFullScreen
      ></iframe>

      {/* overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
};

export default VideoBackGround;
