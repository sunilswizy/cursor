import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const cursor = useRef(null);
  const inner = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cursorX = useRef(0);
  const cursorY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.current = e.pageX;
      mouseY.current = e.pageY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const animate = () => {
      cursorX.current += (mouseX.current - cursorX.current) * 0.1;
      cursorY.current += (mouseY.current - cursorY.current) * 0.1;

      if(cursor.current) {
        cursor.current.style.left = cursorX.current + 'px';
        cursor.current.style.top = cursorY.current + 'px';
      };

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const mouseOver = () => {
    cursor.current.style.height = '50px';
    cursor.current.style.width = '50px';
    inner.current.style.height = '20px';
    inner.current.style.width = '20px';
  };

  const mouseOut = () => {
    cursor.current.style.height = '40px';
    cursor.current.style.width = '40px';
    inner.current.style.height = '0px';
    inner.current.style.width = '0px';
  };

  return (
    <div className='container'>
      <h1 className='title' onMouseOver={mouseOver} onMouseOut={mouseOut}>Cursor</h1>
      <div className='cursor' ref={cursor}>
        <div className='inner' ref={inner}></div>
      </div>
    </div>
  )
}

export default App;
