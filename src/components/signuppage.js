import React, { useState } from "react";
import styled from "styled-components";
import OrganizerSignUp from "./signup_orga";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Validation from './signupValidation'

const SignUpPageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hsl(113, 11%, 85%);
 `;

 const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
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
  padding: 3rem;
  background: white;

  .form {
    width: 100%;
    display: grid;
    gap: 0.8rem;
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
      
    .headerDiv h2 {
      font-size: 1.5rem;
      font-weight: bold;
      gap: 0.3rem;
    }

  .inputDiv {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    }

    .inputDiv label {
    min-width: 90px; /* Set a fixed width for labels */
    font-weight: none;
  }

  .input {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 5px;
    background: hsl(150, 20%, 80%);
  }
  .input input {
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem;
    flex: 1;
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    .form{
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
  }
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
`;

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [showOrganizerForm, setShowOrganizerForm] = useState(false); // Track organizer form state

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const openOrganizerForm = () => setShowOrganizerForm(true);
  const closeOrganizerForm = () => setShowOrganizerForm(false);

  const [values, setValues] = useState({
    FirstName:'',
    LastName:'',
    DateOfBirth:'',
    Address:'',
    City:'',
    IDCard:'',
    Email:'',
    Password:'',
    CPassword:'',
  })

const navigate = useNavigate();
const [errors, setErrors] = useState({})
const handleInput =(event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value ]}))
}
const handleSubmit =(event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if(errors.name === "" && errors.email === "" && errors.password === ""){
        axios.post('http://localhost:8081/signuppage', values)
        .then(res => {
          console.log("signed");
            navigate('/');
        })
        .catch(err => console.log(err))
    }
}

  const [showOrganizerSignUp, setShowOrganizerSignUp] = useState(false);
  if (showOrganizerForm) {
    return <OrganizerSignUp onClose={closeOrganizerForm} />;
  }

  return (
    <SignUpPageContainer>
      <Container>
      <ImageDiv>
          <TextDiv>
            <h2 className="title">Create Your Account</h2>
          </TextDiv>
          <FooterDiv>
            <span>Are you an event organizer?</span>
            <button className="btn" onClick={openOrganizerForm}>Sign Up as Organizer</button>
          </FooterDiv>
        </ImageDiv>
        <FormDiv>
          <div className="headerDiv">
            <h2>Join us and explore more!</h2>
          </div>
          <form className="form">
            {step === 1 && (
              <>
                <div className="inputDiv">
                  <label>First Name:</label>
                  <div className="input"><input type="text" placeholder="Enter first name" name="FirstName" onChange={handleInput} /></div>
                </div>
                <div className="inputDiv">
                  <label>Last Name:</label>
                  <div className="input"><input type="text" placeholder="Enter last name" name="LastName" onChange={handleInput}/></div>
                </div>
                <div className="inputDiv">
                  <label>Date of Birth:</label>
                  <div className="input"><input type="date" name="DateOfBirth" onChange={handleInput} /></div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="inputDiv">
                  <label>Address:</label>
                  <div className="input"><input type="text" placeholder="Enter address" name="Address" onChange={handleInput} /></div>
                </div>
                <div className="inputDiv">
                  <label>City:</label>
                  <div className="input"><input type="text" placeholder="Enter city" name="City" onChange={handleInput} /></div>
                </div>
                <div className="inputDiv">
                  <label>ID Card:</label>
                  <div className="input"><input type="text" placeholder="Enter ID" name="IDCard" onChange={handleInput} /></div>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="inputDiv">
                  <label>Email:</label>
                  <div className="input"><input type="email" placeholder="Enter email" name="Email" onChange={handleInput} /></div>
                </div>
                <div className="inputDiv">
                  <label>Password:</label>
                  <div className="input"><input type="password" placeholder="Enter password" name="Password" onChange={handleInput} /></div>
                </div>
                <div className="inputDiv">
                  <label>Confirm Password:</label>
                  <div className="input"><input type="password" placeholder="Confirm password" name="CPassword" onChange={handleInput} /></div>
                </div>
              </>
            )}
            <div className="btn-container">
              {step > 1 && <button type="button" className="btn" onClick={prevStep}>Previous</button>}
              {step < 3 ? (
                <button type="button" className="btn" onClick={nextStep}>Next</button>
              ) : (
                
              <form onSubmit={handleSubmit} className="form">
                <button type="submit" className="btn">Sign Up</button>
              </form>
            
                
              )}
            </div>
          </form>
        </FormDiv>
      </Container>
      {/* Organizer Sign-Up Modal */}
      {showOrganizerForm && (
        <Overlay>
          <OrganizerSignUp onClose={closeOrganizerForm} />
        </Overlay>
      )}
    </SignUpPageContainer>
  );
};

export default SignUpPage;
