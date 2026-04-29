'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_PORTFOLIO_API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => {
        setProyectos(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching proyectos:', err)
        setError(true)
        setLoading(false)
      })
  }, [])

  return (
    <main className="container">
      <div className="bg-gradient"></div>

      <section className="hero" style={{ height: 'auto', minHeight: '100vh', paddingTop: '8rem' }}>
        <div className="fade-in delay-1" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Link href="/" className="badge" style={{ cursor: 'pointer', marginBottom: 0 }}>
            ← Volver al inicio
          </Link>
          <Link href="/proyectos/nuevo" className="badge" style={{ cursor: 'pointer', marginBottom: 0, background: 'var(--accent)', color: 'white', border: 'none' }}>
            + Nuevo Proyecto
          </Link>
        </div>

        <h1 className="fade-in delay-2" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
          Mis <span className="highlight">Proyectos</span>
        </h1>

        <p className="description fade-in delay-3" style={{ marginBottom: '3rem' }}>
          Lista de proyectos obtenidos directamente desde la base de datos local (SQLite) usando Drizzle ORM.
        </p>

        <div className="fade-in delay-3" style={{ width: '100%', maxWidth: '800px' }}>
          {loading ? (
            <p style={{ color: 'var(--muted)' }}>Cargando proyectos...</p>
          ) : error ? (
            <div className="error-card">
              <span style={{ fontSize: '2rem' }}>⚠️</span>
              <h3>Error de Conexión</h3>
              <p>No se ha podido obtener la lista de proyectos de la base de datos local.</p>
              <button onClick={() => window.location.reload()} className="cta-button" style={{ marginTop: '1.5rem', padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>
                Reintentar
              </button>
            </div>
          ) : proyectos.length > 0 ? (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {proyectos.map((proyecto, index) => (
                <div key={index} className="project-card fade-in" style={{ animationDelay: `${0.1 * index}s`, display: 'block' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{proyecto.titulo}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: '1.6' }}>
                    {proyecto.descripcion}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="error-card" style={{ borderStyle: 'dashed' }}>
              <span style={{ fontSize: '2rem' }}>📭</span>
              <h3>Sin proyectos</h3>
              <p>La base de datos está vacía. Añade tu primer proyecto para empezar.</p>
              <Link href="/proyectos/nuevo">
                <button className="cta-button" style={{ marginTop: '1.5rem', padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>
                  Añadir mi primer proyecto
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        .project-card {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          padding: 2rem;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .project-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent);
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.1);
        }
        .error-card {
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 3rem;
          border-radius: 24px;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .error-card h3 {
          margin: 1rem 0 0.5rem;
          color: #ef4444;
          font-size: 1.5rem;
        }
        .error-card p {
          color: var(--muted);
          line-height: 1.5;
        }
      `}</style>
    </main>
  )
}
