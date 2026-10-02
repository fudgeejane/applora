import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  BarChart3,
  BellRing,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarCheck2,
  CheckCircle2,
  MessageSquareText,
  PenTool,
} from 'lucide-react'
import logo from '../assets/Logo.png'

const featureCards = [
  {
    title: 'Job Application Tracker',
    description: 'Organize and track job applications, statuses, and company details.',
    icon: BriefcaseBusiness,
    accent: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Analytics',
    description: 'Monitor application progress, statistics, and job search trends.',
    icon: BarChart3,
    accent: 'bg-violet-50 text-violet-600',
  },
  {
    title: 'AI Resume Management',
    description: 'Organize resume versions and get AI-powered feedback to improve your resume.',
    icon: PenTool,
    accent: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Interview Management',
    description: 'Organize interview schedules, details, and preparation notes.',
    icon: CalendarCheck2,
    accent: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Smart Reminders',
    description: 'Stay updated on upcoming interviews, deadlines, and follow-ups.',
    icon: BellRing,
    accent: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'AI Career Assistant',
    description: 'Get AI-powered career guidance and job search support.',
    icon: BrainCircuit,
    accent: 'bg-cyan-50 text-cyan-600',
  },
]

const benefitList = [
  'Organization: Manage job applications and career documents in one place.',
  'Time Efficiency: Reduce manual tracking and repetitive tasks.',
  'Career Insights: Monitor progress through analytics and statistics.',
  'Resume Improvement: Get AI-powered feedback to improve resumes.',
  'Interview Readiness: Organize schedules and preparation notes.',
  'Smart Reminders: Keep track of deadlines and follow-ups.',
  'AI Assistance: Get support with job searching and career preparation.',
  'Better Productivity: Stay focused and consistent throughout the job search.',
]

export default function LandingPage() {
  const heroRef = useRef(null)

  useEffect(() => {
    const items = heroRef.current?.querySelectorAll('[data-animate]')
    if (!items) return

    gsap.fromTo(
      items,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' },
    )
  }, [])

  const openAuth = (mode) => {
    window.dispatchEvent(new CustomEvent('applora-auth', { detail: { mode } }))
  }

  return (
    <div className="bg-white text-slate-800">

      <section id="home" className="relative min-h-screen w-full overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),transparent_50%)]" />
        <div aria-hidden="true" className="home-grid-overlay absolute inset-0" />
        <div ref={heroRef} className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="w-full">
            <div className="mx-auto max-w-3xl text-center">
             
              <h1 data-animate className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
                Manage your job search in <span className="text-blue-600">one place.</span>
              </h1>
              <p data-animate className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600">
                Track applications, organize resumes, and monitor your career progress without juggling spreadsheets, notes, and scattered tools.
              </p>
            <div
  data-animate
  className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
>
 <button
  type="button"
  onClick={() => openAuth("signup")}
  className="inline-flex min-h-13 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold !text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
>
  Get started
</button>

  <button
    type="button"
    onClick={() => openAuth("signin")}
    className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
  >
    See live demo
  </button>
</div>
            </div>
          </div>
        </div>
    </section>

    <section
        id="about"
        className="min-h-screen w-full bg-white px-6 py-20 sm:px-8"
    >
        <div className="mx-auto flex min-h-screen max-w-5xl items-center">
            <div className="w-full">
            <div className="max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
                About Applora
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Your job search,{" "}
                <span className="text-blue-600">made simpler.</span>
                </h2>

                <p className="mt-3 text-base leading-8 text-slate-600 sm:text-lg">
                Finding a job takes more than sending applications.
                Applora brings everything together, helping you stay
                organized, prepare for opportunities, and track your
                progress with less effort.
                </p>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-8">
                <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Everything you need to move forward
                </h3>

                <ul className="mt-7 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
                {benefitList.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
                    <span className="text-sm leading-7 text-slate-600 sm:text-base">
                        {benefit}
                    </span>
                    </li>
                ))}
                </ul>
            </div>
            </div>
        </div>
    </section>

    <section id="features" className="w-full bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Features</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Powerful tools for smarter job searching</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => {
              const Icon = feature.icon

              return (
                <article
                  key={feature.title}
                  className="min-h-52 rounded-xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.accent}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen w-full bg-white px-4 py-20 text-slate-800 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-screen max-w-6xl items-center">
          <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="flex flex-col justify-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">Contact</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Get in Touch</h2>
              <p className="mt-4 max-w-md text-base leading-8 text-slate-600">
                Have questions, feedback, or suggestions about Applora? Send us a message. We'd love to hear from you.
              </p>

              <div className="mt-8 space-y-4 text-sm text-slate-600">
              
                <div className="flex items-center gap-3">
                  <MessageSquareText className="h-4 w-4 text-blue-600" />
                  <span>Response within 1 to 2 business days</span>
                </div>
              </div>
            </div>

            <form className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Name
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Subject
                <input
                  type="text"
                  placeholder="What your message is about"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Message
                <textarea
                  rows="5"
                  placeholder="Write your message here"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </label>

              <button type="submit" className="inline-flex cursor-pointer text items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
               <span className='text-white'>Send message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.9fr_0.9fr_] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Applora" className="h-8 w-8" />
              <span className="text-lg font-bold text-slate-900">Applora</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              A simple workspace for managing applications, resumes, and career momentum from first draft to final offer.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Applora</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href="#about" className="hover:text-blue-600">About</a></li>
              <li><a href="#features" className="hover:text-blue-600">Features</a></li>
              <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Resources</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>

       
        </div>

        <div className="border-t border-slate-200 p-4 text-xs text-slate-500 flex items-center justify-center sm:px-6 lg:px-8">
            <span>© 2026 Applora. All rights reserved.</span>
          
        </div>
      </footer>
    </div>
  )
}
