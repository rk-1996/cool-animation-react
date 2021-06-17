import React,{useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/Loader';

const axios = require('axios').default;

interface Props {
    cards:any,
    match:any,
    location:any
}

interface UserRepo{
  owner:any,

}

const Card : React.FC<Props> = ({match, location}) => {
  let history = useHistory();
  const [userName,setUserName] = useState('');
  const [userRepo,setUserRepo] = useState<Array<UserRepo>>([]);
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    console.log(location)
    if(location.state === null || location.state === undefined || location.state === ''){
      history.push({
        pathname: `/`,
      })
      return
    }
    axios
        .get(`https://api.github.com/users/${location.state.detail}/repos`)
        .then((resp:any) => {
          console.log("resp",resp)
          setUserName(location.state.detail);
          setUserRepo(resp.data)
          setLoading(false)
        }).catch((err:any)=>{
          alert(`No any account or repository found with this ${location.state.detail} name`)
          history.push({
            pathname: `/`,
          })
        })
  },[])

  const redirectToFiles = (event:any,val:any) => {
    history.push({
      pathname: `/files-list/${userName}/${val.name}`,
      state: { userName: userName,repo: val.name,branch:val.default_branch}
    })
  }

    return (
        loading ? <Loader /> :  
      <div style={{  }} className='row m-0 repo-root-div'>
        <div className='col-4 user-info-div'>
          <div className='user-column-main-div'>
            <div className='div-image-height'>
              <img className='user-info-image-div' src={userRepo[0].owner.avatar_url} alt="" />
            </div>
            <div className='ml-20'>
              <div>
                <span className='username-div'>{userRepo[0].owner.login}</span>
              </div>
              <div className='git-repo-icon-div'>
                <FontAwesomeIcon icon={faCodeBranch} />
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 text-align-center mb-3'>

        </div>
          {
            userRepo?.map((val:any)=>{
              return <div className='col-xl-4 col-md-5 col-sm-12 col-lg-4 span-repo-list' key={val.id} >
                <div className='repo-column-main-div'>
                  <div className='repository-list-icon-div'>
                    <FontAwesomeIcon icon={faFolderPlus} />
                  </div>
                  <div style={{marginLeft:'20px'}}>
                    <span style={{cursor:'pointer'}} onClick={(e) => redirectToFiles(e,val)}>{val.clone_url}</span>
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

  export default Card;