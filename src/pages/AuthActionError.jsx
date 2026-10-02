import { Link, useSearchParams } from 'react-router-dom';
import { CircleAlert } from 'lucide-react';

export default function AuthActionError() {
  const [searchParams] = useSearchParams();
  const isMissing = searchParams.get('reason') === 'missing';

  return (
    <main className="grid min-h-[calc(100vh-80px)] place-items-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-7 text-center shadow-sm">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-amber-50 text-amber-700"><CircleAlert size={22} /></div>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">{isMissing ? 'Incomplete account link' : 'Unable to process this link'}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{isMissing ? 'The link is missing information. Open the full link from your email or request a new one.' : 'This link is invalid or uses an account action Applora cannot process.'}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2">Return to Applora</Link>
          <Link to="/forgot-password" className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2">Reset password</Link>
        </div>
      </section>
    </main>
  );
}