import { motion } from "framer-motion";

export function BackgroundBlobs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-abyss" />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "55vw",
          height: "55vw",
          left: "-10vw",
          top: "-10vw",
          background:
            "radial-gradient(circle at center, rgba(149,96,240,0.55), rgba(149,96,240,0) 65%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 30, -10, 0],
          opacity: [0.55, 0.8, 0.5, 0.55],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "45vw",
          height: "45vw",
          right: "-10vw",
          bottom: "-15vw",
          background:
            "radial-gradient(circle at center, rgba(228,201,66,0.35), rgba(228,201,66,0) 65%)",
          filter: "blur(90px)",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -20, 10, 0],
          opacity: [0.4, 0.6, 0.35, 0.4],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
    </div>
  );
}