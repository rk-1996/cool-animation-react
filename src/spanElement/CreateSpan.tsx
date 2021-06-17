import { useEffect } from 'react';

const useSpan = () => {
  useEffect(() => {
      let section = document.querySelector('section');
    let square:any = document.createElement('span');

    var size = Math.random() * 50;

    square.style.width = 20 + size + 'px';
    square.style.height = 20 + size + 'px';
    square.style.top = Math.random() + window.innerHeight + 'px';
    square.style.left = Math.random() + window.innerHeight + 'px';
    

    document.body.appendChild(square);

    return () => {
      document.body.removeChild(square);
    }
  },[]);
};

export default useSpan;