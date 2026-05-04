"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginProyecto() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (error) {
        setMessage("Credenciales incorrectas");
        return;
      }

      router.push("/proyectos/nuevo");
      router.refresh();
    } catch (error) {
      setMessage("No se pudo iniciar sesion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <div className="bg-gradient"></div>

      <section className="hero" style={{ height: "auto", minHeight: "100vh", paddingTop: "8rem" }}>
        <div className="fade-in delay-1">
          <Link href="/proyectos" className="badge" style={{ cursor: "pointer", marginBottom: "1rem", display: "inline-block" }}>
            ← Volver a Proyectos
          </Link>
        </div>

        <h1 className="fade-in delay-2" style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}>
          Acceso <span className="highlight">Administrador</span>
        </h1>

        <form onSubmit={handleSubmit} className="fade-in delay-3" style={{
          width: "100%",
          maxWidth: "480px",
          background: "var(--glass)",
          padding: "3rem",
          borderRadius: "30px",
          border: "1px solid var(--glass-border)",
          backdropFilter: "blur(20px)",
          marginTop: "2rem",
        }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--muted)" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              style={{
                width: "100%",
                padding: "1rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                color: "white",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--muted)" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "1rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                color: "white",
                fontSize: "1rem",
              }}
            />
          </div>

          <button type="submit" disabled={loading} className="cta-button" style={{ width: "100%", padding: "1rem", marginTop: "1rem" }}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {message && (
            <p style={{ marginTop: "1.5rem", textAlign: "center", color: "#ef4444" }}>
              {message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
