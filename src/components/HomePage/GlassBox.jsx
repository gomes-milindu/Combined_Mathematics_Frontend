export default function GlassBox() {
  return (
    <div
      className="
       w-7xl h-[67px]
        rounded-xl
        bg-linear-to-r from-[#F3ECFF]/30 to-white/40
        border border-white/20
        backdrop-blur-lg backdrop-saturate-150
        shadow-[0_8px_20px_rgba(90,52,255,0.08)]
        absolute
        z-20
        top-5
        left-1/12
      "
      style={{ WebkitBackdropFilter: "blur(12px)" }}
    >
    </div>
  );
}