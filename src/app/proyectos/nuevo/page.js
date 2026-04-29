'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NuevoProyecto() {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_PORTFOLIO_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descripcion }),
      })

      if (res.ok) {
        setMessage('✅ Proyecto añadido correctamente')
        setTitulo('')
        setDescripcion('')
        setTimeout(() => router.push('/proyectos'), 2000)
      } else {
        const error = await res.json()
        setMessage(`❌ Error: ${error.error || 'No se pudo añadir'}`)
      }
    } catch (err) {
      setMessage('❌ Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <div className="bg-gradient"></div>
      
      <section className="hero" style={{ height: 'auto', minHeight: '100vh', paddingTop: '8rem' }}>
        <div className="fade-in delay-1">
          <Link href="/proyectos" className="badge" style={{ cursor: 'pointer', marginBottom: '1rem', display: 'inline-block' }}>
            ← Volver a Proyectos
          </Link>
        </div>
        
        <h1 className="fade-in delay-2" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
          Añadir <span className="highlight">Proyecto</span>
        </h1>

        <form onSubmit={handleSubmit} className="fade-in delay-3" style={{ 
          width: '100%', 
          maxWidth: '600px',
          background: 'var(--glass)',
          padding: '3rem',
          borderRadius: '30px',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(20px)',
          marginTop: '2rem'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--muted)' }}>Título del Proyecto</label>
            <input 
              type="text" 
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1rem'
              }}
              placeholder="Ej: Mi Portfolio Moderno"
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--muted)' }}>Descripción</label>
            <textarea 
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              rows="5"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1rem',
                resize: 'none'
              }}
              placeholder="Describe de qué trata el proyecto..."
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="cta-button" 
            style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
          >
            {loading ? 'Guardando...' : 'Añadir Proyecto'}
          </button>

          {message && (
            <p style={{ 
              marginTop: '1.5rem', 
              textAlign: 'center', 
              color: message.includes('✅') ? '#10b981' : '#ef4444' 
            }}>
              {message}
            </p>
          )}
        </form>
      </section>
    </main>
  )
}
