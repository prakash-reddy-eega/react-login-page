import React, { useState, useEffect, useReducer, useRef } from 'react';

import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, auction) => {
  if(auction.type === 'EMAIL_INPUT'){
    return {value: auction.val, isValid: auction.val.includes('@')}
  }
  if(auction.type === 'EMAIL_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid: false}
}

const passwordReducer = (state, auction) => {
  if(auction.type === 'PASSWORD_INPUT'){
    return {value: auction.val, isValid: auction.val.trim().length > 7}
  }
  if(auction.type === 'PASSWORD_BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 7}
  }
  return {value: '', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null})
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null})
  console.log(passwordState.isValid)


  // useEffect(() => {
  //   console.log('EFFECT RUNNING');
  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);

  const {isValid : emailIsValid} = emailState
  const {isValid: passwordIsValid} = passwordState

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'EMAIL_INPUT', val: event.target.value})
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'PASSWORD_INPUT', val: event.target.value});
    // setFormIsValid(
    //   emailState.value.includes('@') && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'EMAIL_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      props.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
      emailInputRef.current.focus()
    }else{
      passwordInputRef.current.focus()
    }
  };

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input type="email"
            ref={emailInputRef}
            id="email"
            label="E-MAIL"
            isValid={emailIsValid}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler} />
        <Input type="password"
            ref={passwordInputRef}
            id="password"
            label="Password"
            isValid={passwordIsValid}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler} />   
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
