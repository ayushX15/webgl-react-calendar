import type { MonthTheme } from '@/lib/themes'

interface CalendarHeroProps {
  theme: MonthTheme
  year: number
  fullHeight?: boolean
}

export default function CalendarHero({ theme, year, fullHeight = false }: CalendarHeroProps) {
  return (
    <div 
      className={`relative w-full rounded-2xl overflow-hidden shadow-2xl group ${
        fullHeight ? 'h-full min-h-[400px]' : 'aspect-[4/3] lg:aspect-auto lg:h-full min-h-[350px]'
      }`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-110"
        style={{ backgroundImage: `url(${theme.image})` }}
      />

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 backdrop-blur-[2px]" />

      {/* Text Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end pb-12 z-10 pointer-events-none">
        
        {/* Layered Text for glowing mix-blend effect */}
        <div className="relative">
          <h2 className="absolute text-[clamp(2.5rem,8vw,5rem)] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tighter drop-shadow-2xl mix-blend-overlay">
            {theme.label}
          </h2>
          <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black text-white tracking-tighter drop-shadow-2xl opacity-80">
            {theme.label}
          </h2>
        </div>
        
        <div 
          className="text-2xl lg:text-3xl font-bold tracking-[0.4em] uppercase drop-shadow-lg mt-2 relative z-20"
          style={{ color: theme.tint }}
        >
          {year}
        </div>
      </div>
      
      {/* Decorative accent bar */}
      <div 
        className="absolute bottom-0 left-0 h-1.5 w-full blur-[1px] transition-all duration-500 ease-in-out group-hover:h-3 group-hover:blur-none"
        style={{ backgroundColor: theme.accent, boxShadow: `0 -5px 25px ${theme.accent}` }}
      />
    </div>
  )
}