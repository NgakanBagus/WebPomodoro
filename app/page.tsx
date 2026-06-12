import Timer from "@/components/timer"
import "./globals.css";

export default function Page() {
  return (
    <div className="bg-red-500 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Pomodoro Timer
      </h1>

      <Timer />
    </div>
  )
}