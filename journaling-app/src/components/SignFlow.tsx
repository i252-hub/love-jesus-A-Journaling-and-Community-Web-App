import React, { useState } from 'react';
import Sign from './Signin'; // Import Sign component
import SignUp from './Signup'; // Import SignUp component

const SignFlow: React.FC = () => {
  const [currentView, setCurrentView] = useState<'signin' | 'signup'>('signin'); // State to manage views

  const switchToSignUp = () => {
    setCurrentView('signup');
    console.log('Switching to SignUp');
  };

  const switchToSignIn = () => {
    setCurrentView('signin');
    console.log('Switching to SignIn');
  };

  return (
    <div>
      {currentView === 'signin' ? (
        <Sign onSwitch={switchToSignUp} />
      ) : (
        <SignUp onSwitch={switchToSignIn} />
      )}
    </div>
  );
};

export default SignFlow;
