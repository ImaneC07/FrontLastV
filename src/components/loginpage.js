import React, { useState } from "react";
import styled from "styled-components";
import SignupPage from "./signuppage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// STYLES

const LoginPageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hsl(113, 11%, 85%);
`;

const Container = styled.div`
  height: 70vh;
  width: 60%;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 0 7px 50px rgb(217, 223, 213);
  background: white;
  overflow: hidden;
`;

const ImageDiv = styled.div`
  flex: 1;
  padding: 2rem;
  background: url("/images/LOGO.webp") center/cover no-repeat; /* Background Image */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  position: relative; /* Allows adding overlays */
  
  /* Optional: Overlay effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Dark overlay */
    z-index: 1;
  }

  /* Ensures text stays above the overlay */
  * {
    position: relative;
    z-index: 2;
  }
`;


const TextDiv = styled.div`
  .title {
    font-size: 1.4rem;
    font-weight: bold;
  }
`;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .btn {
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 8px;
    padding: 0.8rem;
    color: black;
    background: hsl(90, 75%, 60%);
    transition: 0.3s ease-in-out;
  }

  .btn:hover {
    background: hsl(93, 75%, 76%);
    color: black;
  }
`;

const FormDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  background: white;

  .headerDiv h2 {
    font-size: 1.5rem;
    font-weight: bold;
    gap: 1rem;
  }

  .form {
    width: 100%;
    display: grid;
    gap: 1rem;

    .btn {
      border: none;
      outline: none;
      cursor: pointer;
      border-radius: 8px;
      padding: 0.8rem;
      color: black;
      background: hsl(90, 75%, 60%);
      transition: 0.3s ease-in-out;
    }

    .btn:hover {
      background: hsl(93, 75%, 76%);
      color: black;
    }
  }

  .inputDiv {
    display: flex;
    align-items: center; /* Align label and input on the same line */
    justify-content: space-between;
    gap: 0.3rem; /* Add some space between label and input */
  }

  .inputDiv label {
    min-width: 90px; /* Set a fixed width for labels */
    font-weight: none;
  }

  .input {
    flex : 1;
    display: flex;
    align-items: center;
    padding: 0.4rem;
    border-radius: 2px;
    background: hsl(150, 20%, 80%);
  }

  .input input {
    border: none;
    outline: none;
    background: none;
    padding: 0.4rem;
    flex: 1;
    //color: hsl(94, 55%, 56%);
    color: black;
    width : 100%;
  }

  .forgotPassword a {
    text-decoration: none;
    font-size: 0.9rem;
    color: hsl(90, 75%, 60%);
  }
`;


const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate authentication success
    navigate("/user-space"); // Redirect to the UserSpace component
  };
  const [values, setValues] = useState({
      Email:'',
      Password:'',
    })
  
    const handleInput = (event) =>{
      setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };
  
    const handleSubmit = async(event) => {
      event.preventDefault(); // Prevent form from submitting and redirecting
      axios.post('http://localhost:8081/loginpage', values)
      .then(res => {
        if(res.data.Login){
          console.log("logged in succ");
          navigate('/');
        }else{
          alert("No Record");
        }
        console.log(res);
      })
      .catch(err => console.log(err));
    };
  const [showSignup, setShowSignup] = useState(false);
  if (showSignup) {
    return <SignupPage onClose={() => setShowSignup(false)} />; // Affiche la page d'inscription
  }
  return (
    <LoginPageContainer>
      <Container>
        <ImageDiv>
          <TextDiv>
            <h2 className="title">Create and reserve your own events</h2>
            <p>Manage your hobbies</p>
          </TextDiv>
          <FooterDiv>
            <span>Don't have an account?</span>
            <button className="btn" onClick={() => setShowSignup(true)}>Sign Up</button>
          </FooterDiv>
        </ImageDiv>
        <FormDiv>
          <div className="headerDiv">
            <h2>Welcome Back!</h2>
          </div>
          <form className="form"  onSubmit={handleLogin}>
            <span>Login Status will go here</span>

            <div className="inputDiv">
              <label htmlFor="Email">E-mail :</label>
              <div className="input" >
                <span className="icon">🔒</span>
                <input type="text" id="Email" placeholder="Enter e-mail" name="Email" onChange={handleInput}/>
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="Password">Password :</label>
              <div className="input">
                <span className="icon">🔑</span>
                <input
                  type="password"
                  id="Password"
                  placeholder="Enter Password"
                  name="Password" 
                  onChange={handleInput}
                />
              </div>
            </div>

            <button type="submit" className="btn">
              Log In
            </button>

            <span className="forgotPassword">
              <a href="#">Forgot your password?</a>
            </span>
          </form>
        </FormDiv>
      </Container>
    </LoginPageContainer>
  );
};

export default LoginPage;
