import FormUserConst from './inputUserForm/Form'
import './App.css';
import { useHistory } from "react-router-dom";
import UseSpan from './spanElement/CreateSpan'
import { useEffect } from 'react';


function App() {
  const colors:any = [
    '#2196f3',
    '#e91e63',
    '#ffeb3b',
    '#74ff1d'
  ]

  const CreateSpan = () => {
    let section:any = document.querySelector('section');
    let square:any = document.createElement('span');

    let size = Math.random() * 50;
    console.log("size",size)
    square.style.width = 20 + size + 'px';
    square.style.height = 20 + size + 'px';
    square.style.class = 'square-dynamic-class'
    square.style.top = Math.random() * window.innerHeight + 'px';
    console.log(square.style.top);

    const bg = colors[Math.floor(Math.random() * colors.length)];
    square.style.background = bg;

    square.classList.add("square-dynamic-class");
    console.log("window.innerHeight",window.innerWidth)
    square.style.left = Math.random() * window.innerHeight * 1.8 + 'px';
    console.log( square.style.left);
    

    section.appendChild(square);

    setTimeout(()=>{
      square.remove();
    },5000)

    return () => {
      section.removeChild(square);
    }
  } 

  useEffect(()=>{
    const interval = setInterval(CreateSpan,150);
    return () => clearInterval(interval);
  },[])

  
  let history = useHistory();

  const userRepo = (userName:any) => {
    history.push({
      pathname: '/repo-lists',
      state: { detail: userName }
    })
  }

  return (
    <div className="App">
        <section>
        </section>

          <header className="App-header">
            <div className='git-user-form-div'>
              {/* <h3 style={{color:"rgb(156 156 156 / 85%)"}}>
                FIND GIT HUB USER REPO
              </h3> */}

              <div className='github-logo-div'>
                <img style={{height:'100px'}} src="./logo192.png" alt="" />
              </div>
              <FormUserConst onSubmit={(repo) => userRepo(repo)} />
            </div>
          </header>
      </div>
  );
}

export default App;
