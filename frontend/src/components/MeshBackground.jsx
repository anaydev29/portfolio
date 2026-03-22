/**
 * MeshBackground - Animated pastel blob mesh gradient background
 * Inspired by modern glassmorphism portfolio designs
 */
const MeshBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base white background */}
      <div className="absolute inset-0 bg-[#f8fafc]" />

      {/* Animated blobs */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl animate-blob"
        style={{ background: 'radial-gradient(circle, #c7d2fe, #e0e7ff)' }}
      />
      <div
        className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-25 blur-3xl animate-blob animation-delay-2000"
        style={{ background: 'radial-gradient(circle, #fbcfe8, #fce7f3)' }}
      />
      <div
        className="absolute top-[40%] left-[20%] w-[400px] h-[400px] rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000"
        style={{ background: 'radial-gradient(circle, #bae6fd, #e0f2fe)' }}
      />
      <div
        className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full opacity-25 blur-3xl animate-blob animation-delay-1000"
        style={{ background: 'radial-gradient(circle, #ddd6fe, #ede9fe)' }}
      />
      <div
        className="absolute bottom-[-10%] left-[10%] w-[450px] h-[450px] rounded-full opacity-20 blur-3xl animate-blob animation-delay-3000"
        style={{ background: 'radial-gradient(circle, #a5f3fc, #cffafe)' }}
      />
    </div>
  );
};

export default MeshBackground;
