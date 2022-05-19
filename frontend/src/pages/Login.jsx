import {useState,useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa';
function Login() {
  const [formData,setFormData] = useState({
    email:'',
    password:'',
  })
  const {email,password} = formData;
  const handleChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
  }
  return (
    <>
      <section className="heading">
        <h1><FaSignInAlt/> Login</h1>
        <p>Login to start</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='Enter your email-id'
              value={email}
              autoComplete='off'
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              placeholder='Enter password'
              value={password}
              autoComplete='off'
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login;