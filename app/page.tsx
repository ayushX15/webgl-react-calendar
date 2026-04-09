import WallCalendar from '@/components/WallCalendar'
import LiquidEther from '@/components/LiquidEther'

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center py-10 overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <LiquidEther />
      </div>
      <div className="relative z-10 w-full max-w-6xl pointer-events-none px-4 md:px-10 flex justify-center">
         <div className="pointer-events-auto w-full">
           <WallCalendar />
         </div>
      </div>
    </main>
  )
}