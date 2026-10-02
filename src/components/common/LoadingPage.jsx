import logo from '../../assets/Logo.png'

export default function LoadingPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-6" role="status" aria-live="polite">
      <div className="flex flex-col items-center text-center">
        <div className="relative grid h-16 w-16 place-items-center">
          <span className="absolute inset-0 rounded-full border-2 border-blue-100 border-t-blue-600 motion-safe:animate-spin" />
          <img src={logo} alt="" className="h-9 w-9 object-contain" />
        </div>
      </div>
    </main>
  )
}