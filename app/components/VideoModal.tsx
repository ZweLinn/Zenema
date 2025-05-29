'use client';


const VideoModal = ({ videoKey , onClose }:  {videoKey : string | null ; onClose : () => void} ) => {
  if (!videoKey) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000,
        padding: '1rem',
      }}
      className="w-vw h-vh"
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: '900px', aspectRatio: '16 / 9' , marginTop: '2rem' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-40px', right: '0',
            background: 'red',
            color: 'white',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            zIndex: 1,
            marginBottom : '2.5rem'
          }}
        >
          ✖ Close
        </button>

        <div style={{ position: 'relative', width: '100%', height: '100%' , marginTop: '.4rem'} }>
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="YouTube video player"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
