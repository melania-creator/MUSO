import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Registra il service worker per PWA (installabile su Android e iOS)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/MUSO/sw.js').catch(() => {});
  });
}

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <pre style={{padding:24,color:'red',whiteSpace:'pre-wrap'}}>
          {this.state.error.toString()}{'\n'}{this.state.error.stack}
        </pre>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
