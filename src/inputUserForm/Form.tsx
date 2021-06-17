import {Form, Input, Button} from "antd";
import React,{ useState} from 'react';
import 'antd/dist/antd.css';

interface Props {
  onSubmit:(repoData:any) => any;
}

const  FormUser: React.FC<Props> = ({onSubmit}) => {
    const [username, setUsername] = useState('')
  
    const handleSubmit = (event:any) => {
      event.preventDefault()
      if(username.length !== 0){
        onSubmit(username)
      }else{
        alert("please enter user name")
      }
    }


    return (
      <div>

      <Form layout="inline">
            <Form.Item>
                <div>
                  <Input className='input-user-name-git' type="text" placeholder="GitHub username" value={username} onChange={event => setUsername(event.target.value)}/>
                </div>
                <div style={{ marginTop: '1em' }}>
                  <Button className='git-user-login-button' htmlType="submit" type="primary" onClick={event => {handleSubmit(event)}}> Find Repository </Button>
                </div>
            </Form.Item>
        </Form>
      </div>
    )
}

export default FormUser;