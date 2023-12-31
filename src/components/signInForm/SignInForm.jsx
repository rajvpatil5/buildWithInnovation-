import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInAuthUserWithEmailandPassword } from '../../redux/services/SignInBWICore';
import { setCurrentUser } from '../../redux/user/user.reducer';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const SignInForm = () => {
  const dispatch = useDispatch();
  const [errorRes, setErrorRes] = useState('');
  const navigate = useNavigate();
  const routeChange = () => {
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      username: '',
    },
  });

  const handleSubmitForm = async (data) => {
    let response;
    try {
      const { password, username } = data;
      response = await signInAuthUserWithEmailandPassword(username, password);
      if (response.id) {
        dispatch(setCurrentUser({ user: response }));
        routeChange();
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setErrorRes(response);
    }
  };

  return (
    <div className="container items-center justify-center flex h-screen">
      <div className="bg-[#d5d5d5] px-10 py-10 lg:rounded-xl flex flex-col gap-4 w-[50%] h-screen lg:h-auto items-center justify-center">
        <h3 className="text-center text-xl mb-4 font-bold">Login</h3>
        <div className="w-full">
          <Input
            {...register('username', {
              required: 'Username is required',
            })}
            name="username"
            placeholder="Username"
            type="text"
          />
          <p className={`text-red-500 ${errors.username?.message ? '' : 'mb-6'}`}>{errors.username?.message}</p>
        </div>

        <div className="w-full">
          <Input
            {...register('password', {
              required: 'Password is required',
            })}
            name="password"
            placeholder="Password"
            type="password"
          />
          <p className={`text-red-500 ${errors.password?.message ? '' : 'mb-6'}`}>{errors.password?.message}</p>
        </div>

        <Button className="w-full font-bold" onClick={handleSubmit(handleSubmitForm)}>
          Login
        </Button>
        <p className={`text-red-500 ${errorRes.message ? '' : 'mb-6'}`}>{errorRes.message}</p>
        <div className="">
          <div>Kindly use below details for Login.</div>
          <div>Username - kminchelle</div>
          <div>Password - 0lelplR</div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
