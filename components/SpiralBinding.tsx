'use client'

export default function SpiralBinding({ color }: { color: string }) {
  return (
    <div className="flex gap-5 justify-center py-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-10 rounded-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)',
            boxShadow: `inset 0 1px 3px rgba(255,255,255,1), 0 4px 6px rgba(0,0,0,0.1), 0 0 20px ${color}33`,
            border: '1px solid rgba(255,255,255,0.5)',
            backdropFilter: 'blur(12px)'
          }}
        >
           {/* Inner metallic reflection */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-white/80 to-transparent" />
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/10" />
        </div>
      ))}
    </div>
  )
}