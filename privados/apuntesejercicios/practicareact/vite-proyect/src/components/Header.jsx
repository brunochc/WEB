import React from 'react'

function Header({ title = 'Mi App' }) {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <a href="#" style={styles.brand} aria-label="Inicio">
          {title}
        </a>
        <nav style={styles.nav} aria-label="Navegación principal">
          <a href="#" style={styles.link}>Inicio</a>
          <a href="#" style={styles.link}>Acerca</a>
          <a href="#" style={styles.link}>Contacto</a>
        </nav>
      </div>
    </header>
  )
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    background: 'rgba(255,255,255,0.8)',
    backdropFilter: 'saturate(180%) blur(10px)',
    borderBottom: '1px solid #eaeaea',
  },
  container: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#1f2937',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    color: '#374151',
    textDecoration: 'none',
    fontWeight: 500,
  },
}

export default Header
