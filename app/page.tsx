
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-cloud">
        <div className="container-pro py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary" />
            <span className="text-xl font-bold tracking-tight">Most Like Me</span>
          </div>
          <nav className="flex items-center gap-3">
            <Link className="button-secondary" href="/join">Join</Link>
          </nav>
        </div>
      </header>

      <section className="container-pro py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Somewhere out there, someone answers life’s questions almost exactly like you do.
          </h1>
          <p className="mt-6 text-lg text-ash">
            Different life, different story—same way of seeing the world. Using privacy‑first data and
            modern machine learning, Most Like Me finds the person whose choices align with yours.
          </p>
          <div className="mt-8 flex gap-3">
            <Link className="button-primary" href="/join">Join now → Take the quiz</Link>
            <a className="button-secondary" href="#how-it-works">How it works</a>
          </div>
        </div>

        <div id="how-it-works" className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            {title: 'Private by design', body: 'We never sell your data and we don’t run ads. Your answers are used only for anonymous similarity matching.'},
            {title: 'Built with real AI', body: 'We encode your choices as a vector and compare against others with fast, explainable similarity search.'},
            {title: 'Thoughtful reveal', body: 'If a strong match isn’t ready, we wait. You’ll get an email the moment your closest match appears.'},
          ].map((c, i) => (
            <div key={i} className="card p-6">
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="mt-2 text-ash">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-cloud">
        <div className="container-pro py-10 text-sm text-ash">
          <p>© {new Date().getFullYear()} Most Like Me — Privacy-first. No ads. No data sales.</p>
        </div>
      </footer>
    </main>
  )
}
