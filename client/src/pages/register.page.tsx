import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { TypeOf, object, string } from 'zod';
import { toast } from 'react-toastify';
import { useRegisterUserMutation } from '../redux/api/authApi';

const registerSchema = object({
  name: string().min(1, 'Full name is required').max(100),
  username: string()
    .min(1, 'Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(32, 'Username must be less than 32 characters'),
  email: string().min(1, 'Email is required').email('Invalid email address'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  // ? Calling the Register Mutation
  const [registerUser, { isLoading, isSuccess, error, isError }] =
    useRegisterUserMutation();

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success('Registration successful');
      navigate('/verifyemail');
    }

    if (isError) {
      console.log(error);
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) => {
          toast.error(el.message, {
            position: 'top-right',
          });
        });
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        });
      }
    }
  }, [error, isError, isLoading, isSuccess, navigate]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    // ? Calling the RegisterUser Mutation
    // registerUser(values);
    await registerUser(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <label htmlFor="name">Name</label>
      <input {...register('name')} name="name" type="text" />
      <label htmlFor="username">Username</label>
      <input {...register('username')} name="username" type="text" />
      <label htmlFor="email">Email address</label>
      <input {...register('email')} name="email" type="email" />
      <label htmlFor="password">Password</label>
      <input {...register('password')} name="password" type="password" />
      <label htmlFor="passwordConfirm">Confirm Password</label>
      <input
        {...register('passwordConfirm')}
        name="passwordConfirm"
        type="password"
      />
      <p>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default RegisterPage;
