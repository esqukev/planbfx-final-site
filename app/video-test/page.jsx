export default function VideoTest() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'black',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <video
        src="/videos/plabanfisa.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  )
}
