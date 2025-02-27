import React, { useState, useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action)=>{
  if(action.type === 'USER_INPUT')
  {
    return{
      value:action.val,
      isValid: action.val.includes('@')
    };
  }

  if(action.type === 'INPUR_BLUR')
  {
    return{
    value:state.value,
    isValid: state.value.includes('@')
    };
  }
  return{value: '', isValue:false};

}

const Login = (props) => {
//   const [enteredEmail, setEnteredEmail] = useState('');
//   const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enterCollege, setEnterCollege] = useState('');
  const [collegeValid, setCollegeValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,{
    value:'',
    isValue:null,
  });

  // useEffect(() => {
  //   const iden = setTimeout(()=>{
  //     console.log("1st check")
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enterCollege.trim().length > 5
  //     );
  //   },1000)
  //   return ()=>{
  //     console.log("2nd cleanup");
  //     clearTimeout(iden);
  //   }
    
  // }, [enteredEmail, enteredPassword, enterCollege]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:'USER_INPUT', val:event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );

  };

  const collegeChangeHandler = (event) =>{
    setEnterCollege(event.target.value);
  }

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollegeHandler = () =>
  {
    setCollegeValid(enterCollege.trim().length > 3);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword, enterCollege);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>

        <div
        className={`${classes.control} ${
            collegeValid === false ? classes.invalid : ''
          }`}
          >

        <label htmlFor="college">Enter the college</label>
          <input
            type="college"
            id="college"
            value={enterCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}></div>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;



