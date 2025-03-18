import React,{useState} from 'react'

const App = () => {

  function postsFun(){
    fetch('http://localhost:3000/posts')
    .then(res=>res.json())
    .then((posts)=>{
      console.log(posts)
    })
  }

  function usersFun(){
    fetch('http://localhost:3000/users')
    .then(res=>res.json())
    .then((users)=>{
     console.log(users);
    })
  }

  return (
    <>

      <button onClick={usersFun}>get users</button>
      <button onClick={postsFun}>get posts</button>
    </>

  )
}

export default App
