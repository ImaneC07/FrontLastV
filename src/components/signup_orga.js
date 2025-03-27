import React, { useState } from "react";
import styled from "styled-components";

const OrganizerSignUpContainer = styled.div`
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

/*const FooterDiv = styled.div`
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
`;*/

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
    .inputDiv input {
      flex: 1;
      display: flex;
      border: none;
      outline: none;
      align-items: center;
      padding: 0.5rem;
      border-radius: 5px;
      background: hsl(150, 20%, 80%);
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
`;

const OrganizerSignUp = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [agreement, setAgreement] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Organizer Form submitted successfully!");
  };

  return (
    <OrganizerSignUpContainer>
      <Container>
        <ImageDiv>
            <TextDiv>
                <h2>Sign Up as Organizer</h2>
            </TextDiv>
        </ImageDiv>
        <FormDiv>
          <div className="headerDiv">
            <h2>Join us and Organize your Events!</h2>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="inputDiv">
                  <label>First Name:</label>
                  <input type="text" placeholder="Enter First Name" required />
                </div>
                <div className="inputDiv">
                  <label>Last Name:</label>
                  <input type="text" placeholder="Enter Last Name" required />
                </div>
                <div className="inputDiv">
                  <label>Date of Birth:</label>
                  <input type="date" required />
                </div>
                <div className="inputDiv">
                  <label>Phone Number:</label>
                  <input type="text" placeholder="Enter Phone Number" required />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="inputDiv">
                  <label>ID Card:</label>
                  <input type="text" placeholder="Enter ID Number" required />
                </div>
                <div className="inputDiv">
                  <label>Address:</label>
                  <input type="text" placeholder="Enter Address" required />
                </div>
                <div className="inputDiv">
                  <label>City:</label>
                  <input type="text" placeholder="Enter City" required />
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="inputDiv">
                  <label>Email:</label>
                  <input type="email" placeholder="Enter Email" required />
                </div>
                <div className="inputDiv">
                  <label>Password:</label>
                  <input type="password" placeholder="Enter Password" required />
                </div>
                <div className="inputDiv">
                  <label>Confirm Password:</label>
                  <input type="password" placeholder="Confirm Password" required />
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <div className="inputDiv">
                  <label>Upload ID Card:</label>
                  <input type="file" required />
                </div>
                <div className="inputDiv">
                  <label>Upload Work Card:</label>
                  <input type="file" required />
                </div>
              </>
            )}
            {step === 5 && (
              <>
                <div className="inputDiv">
                  <label>Upload CV:</label>
                  <input type="file" required />
                </div>
                <div className="inputDiv">
                  <label>Upload Portfolio:</label>
                  <input type="file" required />
                </div>
                <div className="inputDiv">
                  <label>Upload Previous Events:</label>
                  <input type="file" required />
                </div>
              </>
            )}
            {step === 6 && (
              <>
                <div className="inputDiv">
                  <label>Company Name:</label>
                  <input type="text" placeholder="Enter Company Name" required />
                </div>
                <div className="inputDiv">
                  <label>Company Address:</label>
                  <input type="text" placeholder="Enter Company Address" required />
                </div>
                <div className="inputDiv">
                  <label>Company Phone Number:</label>
                  <input type="text" placeholder="Enter Company Phone Number" required />
                </div>
              </>
            )}
            {step === 7 && (
              <>
                <div className="inputDiv">
                  <label>
                    <input
                      type="checkbox"
                      checked={agreement}
                      onChange={() => setAgreement(!agreement)}
                      required
                    />
                    I hereby confirm that I will organize events with honesty and integrity, without fraud, deception, or manipulation.
                  </label>
                </div>
              </>
            )}
            <div className="btn-container">
              {step > 1 && <button type="button" className="btn" onClick={prevStep}>Previous</button>}
              {step < 7 ? (
                <button type="button" className="btn" onClick={nextStep}>Next</button>
              ) : (
                <button type="submit" className="btn">Sign Up</button>
              )}
            </div>
          </form>
          <button className="btn" onClick={onClose}>Cancel</button>
        </FormDiv>
      </Container>
    </OrganizerSignUpContainer>
  );
};

export default OrganizerSignUp;
