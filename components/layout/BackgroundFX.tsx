"use client";

export default function BackgroundFX() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{ background: '#020308' }} />
    </div>
  );
}
