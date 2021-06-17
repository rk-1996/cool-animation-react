import React,{useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/Loader';


const axios = require('axios').default;

interface Props {
    cards:any,
    match:any,
    location:any
}

const FileList : React.FC<Props> = ({match, location}) => {
  let history = useHistory();
  const [userRepo,setUserRepo] = useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    if(location.state === null || location.state === undefined){
        history.push({
          pathname: `/`,
        })
        return
    }
    axios
        .get(`https://api.github.com/repos/${location.state.userName}/${location.state.repo}/git/trees/${location.state.branch}?recursive=1`)
        .then((resp:any) => {
          console.log("resp",resp)
          setUserRepo(resp.data.tree)
          setLoading(false)
          let newArr:any = []

          // resp.data.tree.map((val:any)=>{
          //   // console.log("val",val)
          //     let arrPath = val.path.split('/')
          //     console.log("arrPath",arrPath,arrPath.length)
          //     if(arrPath.length === 1){
          //         newArr.push({
          //             key:arrPath[0],
          //             childArr:[]
          //         })
          //     }else{
          //         let result:any = parseArr(newArr,arrPath)
          //         console.log('result',result,'arrPath',arrPath)
          //         // newArr = [...result]
          //     }
          // })
          // console.log('newArr',newArr)

          
        }).catch((err:any)=>{
          console.log('err',err)
            alert(`No any files with this ${location.state.repo} repository`)
            history.push({
              pathname: `/`,
            })
          })
  },[])

  const parseArr = (newArr:any,arrPath:any) => {
    console.log("function called",newArr)
    newArr.map((newArrPath:any,indNewArrPath:any)=>{
      console.log('newArrPath',newArrPath)
      arrPath.map((valArrPath:any,indValArrPath:any) => {
      console.log('valArrPath',valArrPath)
        if(newArrPath.key === valArrPath){
          if(newArrPath.childArr.length > 0){
            parseArr(newArrPath.childArr,valArrPath)
          }else{
            newArr[indNewArrPath].childArr.push({
                key:valArrPath,
                childArr:[]
            })
            return newArr
          }
        }
      })
    })
  }

  
    return (
        loading ? <Loader /> :
      // <div style={{ padding:'10px',backgroundColor:'#282c34' }}>
      <div style={{  }} className='row m-0 repo-root-div'>
        {/* <ul className="wtree">
          <li>
            <span>REDME.md</span>
          </li>
          <li>
            <span>Src</span>
            <ul>
              <li>
                <span>Nivel 2</span>
              </li>
              <li>
                <span>Nivel 2</span>
              </li>
              <li>
                <span>Nivel 2</span>
              </li>
              <li>
                <span>Nivel 2</span>
              </li>
              <li>
                <span>Nivel 2</span>
                
                <ul>
                  <li>
                    <span>Nivel 2</span>
                  </li>
                  <li>
                    <span>Nivel s2</span>
                  </li>
                  <li>
                    <span>Nivel 2</span>
                  </li>
                  <li>
                    <span>Nivel 2</span>
                  </li>
                  <li>
                    <span>Nivel 2</span>

                    <ul>
                      <li>
                        <span>Nivel 2</span>
                      </li>
                      <li>
                        <span>Nivel 2</span>
                      </li>
                      <li>
                        <span>Nivel 2</span>
                      </li>
                      <li>
                        <span>Nivel 2</span>
                      </li>
                      <li>
                        <span>Nivel 2</span>
                      </li>
                    </ul>

                  </li>
                </ul>

              </li>
            </ul>
          </li>
          <li>
            <span>Nivel 1</span>
            <ul>
              <li>
                <span>Nivel 2</span>
                <ul>
                  <li>
                    <span>Nivel 3</span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul> */}
          {
            userRepo?.map((val:any)=>{
              return  <div className='col-xl-4 col-md-5 col-sm-12 col-lg-4 span-repo-list' key={val.id} >
                  <div className='repo-column-main-div'>
                    <div className='repository-list-icon-div'>
                      <FontAwesomeIcon icon={faFile} />
                    </div>
                    <div style={{marginLeft:'20px'}}>
                      <span style={{cursor:'pointer'}}>{val.path}</span>
                    </div>
                  </div>
              </div>
            })
          }
        <div>
        </div>
      </div>
    )
  }

  export default FileList;