import React, { useState } from 'react'

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);


  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title:"",
    author:""
  });

  const [userData, setUserData] = useState([]);
  const [userFormData, setUserFormData] = useState({
    id:"",
    name:""
  });


  function postsFun() {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then((posts) => {
        setPosts(posts)
      })
  }


  function usersFun() {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then((users) => {
        setUsers(users)
      })
  }

  function submitHandler(e){
    e.preventDefault();
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    .then(res => res.json())
    .then((newPost) => {
      setData([...data, newPost]);
      setFormData({
        title: "",
        author: ""
      });
    });
  }

  function submitHandler2(e){
    e.preventDefault();

    fetch('http://localhost:3000/users',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(userFormData)
    })
    .then(res=>res.json())
    .then((newUser)=>{
      setUserData([...userData,newUser]);
      setUserFormData({
        id:"",
        name:""
      })
    })

  }


  return (

    <>
      <div className='flex'>

      <form onSubmit={submitHandler2} className='flex flex-col  p-3 gap-2 w-80'>
          <h1 className='capitalize'>Add user</h1>
          <input value={userFormData.id} onChange={(e) => setUserFormData({ ...userFormData, id: e.target.value })} className='px-2 py-2 bg-neutral-300 rounded-md outline-none capitalize' type="text" placeholder='user id' required />
          <input value={userFormData.name} onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })} className='px-2 py-2 bg-neutral-300 rounded-md outline-none capitalize' type="text" placeholder='user name' required />
          <button className='px-2 py-2 bg-green-300 rounded-md capitalize'>submit</button>
        </form>

        <form onSubmit={submitHandler} className='flex flex-col  p-3 gap-2 w-80'>
          <h1 className='capitalize'>Add post</h1>
          <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className='px-2 py-2 bg-neutral-300 rounded-md outline-none capitalize' type="text" placeholder='post title' required />
          <input value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className='px-2 py-2 bg-neutral-300 rounded-md outline-none capitalize' type="text" placeholder='author name' required />
          <button className='px-2 py-2 bg-green-300 rounded-md capitalize'>submit</button>
        </form>

       

      </div>



      <div className='flex gap-58 p-3'>
        <button className='px-3 py-2 bg-blue-500 rounded-md text-white capitalize' onClick={usersFun}>get users</button>
        <button className='px-3 py-2 bg-blue-500 rounded-md text-white capitalize' onClick={postsFun}>get posts</button>
      </div>

      <div className='flex gap-70 p-3'>
        <div>
          <h4 className='font-bold capitalize'>users:</h4>
          {users.map((user) => (
            <div key={user.id}>

            <p>{user.name}</p>
            </div>
          ))}
        </div>

        <div>
          <h4 className='font-bold capitalize'>posts:</h4>
          {posts.map((post) => (
            <div key={post.id}>
              <p> {post.title}</p>
            </div>
          ))}
        </div>
      </div>


    </>

  )
}

export default App
