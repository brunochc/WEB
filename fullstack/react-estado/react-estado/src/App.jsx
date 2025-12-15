import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiRefreshCw, FiTrendingUp } from 'react-icons/fi';


function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [pulse, setPulse] = useState(false);

  const incrementCount = () => {
    setCount(prev => {
      const newCount = prev + 1;
      setHistory(prevHistory => [...prevHistory.slice(-4), `+1 → ${newCount}`]);
      return newCount;
    });
    setPulse(true);
  };

  const decrementCount = () => {
    setCount(prev => {
      const newCount = prev - 1;
      setHistory(prevHistory => [...prevHistory.slice(-4), `-1 → ${newCount}`]);
      return newCount;
    });
    setPulse(true);
  };

  const resetCount = () => {
    setCount(0);
    setHistory([]);
    setPulse(true);
  };

  useEffect(() => {
    if (pulse) {
      const timer = setTimeout(() => setPulse(false), 300);
      return () => clearTimeout(timer);
    }
  }, [pulse]);

  // Efecto de partículas para números grandes
  const getParticleEffect = () => {
    if (Math.abs(count) > 0 && Math.abs(count) % 10 === 0) {
      return "sparkle";
    }
    return null;
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary">
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="card shadow-lg glass-effect"
          >
            <div className="card-body text-center p-4">
              {/* Header con icono */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="d-flex align-items-center justify-content-center mb-3"
              >
                <FiTrendingUp className="text-purple-300 me-2" size={24} />
                <h1 className="card-title display-6 fw-bold mb-0 gradient-text">Contador Pro</h1>
              </motion.div>
              
              {/* Display del contador con animación */}
              <div className="position-relative my-4">
                <motion.div
                  key={count}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`display-1 fw-bold number-display ${
                    pulse ? 'pulse-effect' : ''
                  } ${
                    count > 0 ? 'text-success' : 
                    count < 0 ? 'text-danger' : 
                    'text-purple-300'
                  }`}
                >
                  {count}
                </motion.div>
                
                {/* Efecto de partículas para hitos */}
                <AnimatePresence>
                  {getParticleEffect() === "sparkle" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="sparkle-effect"
                    >
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="sparkle"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botones con iconos y efectos */}
              <div className="d-flex gap-3 justify-content-center flex-wrap my-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={decrementCount}
                  className="btn btn-danger d-flex align-items-center gap-2 px-3"
                >
                  <FiMinus size={18} />
                  Disminuir
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetCount}
                  className="btn btn-secondary d-flex align-items-center gap-2 px-3"
                >
                  <FiRefreshCw size={18} />
                  Reset
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={incrementCount}
                  className="btn btn-success d-flex align-items-center gap-2 px-3"
                >
                  <FiPlus size={18} />
                  Incrementar
                </motion.button>
              </div>

              {/* Información adicional */}
              <div className="row mt-4">
                <div className="col-6">
                  <div className="stat-box">
                    <small className="text-muted">Valor Actual</small>
                    <div className="h6 mb-0">{count}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-box">
                    <small className="text-muted">Operaciones</small>
                    <div className="h6 mb-0">{history.length}</div>
                  </div>
                </div>
              </div>

              {/* Historial reciente */}
              {history.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3"
                >
                  <small className="text-muted">Historial reciente:</small>
                  <div className="d-flex gap-2 justify-content-center flex-wrap">
                    {history.slice(-3).map((item, index) => (
                      <span key={index} className="badge bg-purple-800">{item}</span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;