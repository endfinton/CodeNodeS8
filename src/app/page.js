import Link from 'next/link'

export default function Home() {
  return (
    <main className="container">
      <div className="bg-gradient"></div>

      <section className="hero">
        <div className="fade-in delay-1">
          <span className="badge">Disponible para nuevos proyectos</span>
        </div>

        <h1 className="fade-in delay-2">
          Luis <span className="highlight">Lluy</span>
        </h1>

        <p className="description fade-in delay-3">
          Estudiante desarrollador <span className="highlight">DAM/DAW</span>.
          Apasionado por crear experiencias digitales modernas, eficientes y visualmente impactantes.
        </p>

        <div className="fade-in delay-3">
          <Link href="/proyectos">
            <button className="cta-button">Ver mi trabajo</button>
          </Link>
        </div>
      </section>

      {/* Visual element */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'var(--accent)',
        filter: 'blur(150px)',
        borderRadius: '50%',
        opacity: '0.3',
        zIndex: -1
      }}></div>
    </main>
  )
}
