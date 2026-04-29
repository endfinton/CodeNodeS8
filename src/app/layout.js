import './globals.css'

export const metadata = {
  title: 'Luis Lluy | Desarrollador DAM/DAW',
  description: 'Portafolio de Luis Lluy, estudiante y desarrollador enfocado en aplicaciones web modernas y soluciones DAM/DAW.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}
