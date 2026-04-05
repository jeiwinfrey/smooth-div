export function RoundedDiv() {
    return (
      <div>
        <span className="text-xs text-[#7e7e7e]">rounded-div</span>
        <div className="size-[158px] rounded-[22px] bg-[#f1f1f1]" />
      </div>
    )
  }
  
  export function SmoothDiv() {
    return (
      <div>
        <span className="text-xs text-[#7e7e7e]">smooth-div</span>
        <div className="corner-shape size-[158px] bg-[#f1f1f1]" />
      </div>
    )
  }  

export default function App() {
  return (
    <div className="flex h-screen flex-wrap items-center justify-center gap-10 px-4 bg-white">
      <RoundedDiv />
      <SmoothDiv />
    </div>
  )
}