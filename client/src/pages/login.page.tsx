import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeOf, object, string } from 'zod';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from '../redux/api/authApi';

const loginSchema = object({
  email: string().min(1, 'Email is required').email('Invalid email address'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // ? Calling the Register Mutation
  const [loginUser, { isLoading, isSuccess, error, isError }] =
    useLoginUserMutation();

  type LocationProps = {
    state: {
      from: Location;
    };
  };

  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;

  const from = location.state?.from.pathname || '/';

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login successful');
      navigate(from);
    }

    if (isError) {
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
  }, [error, from, isError, isLoading, isSuccess, navigate]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    // ? Calling the RegisterUser Mutation
    await loginUser(values);
  };

  return (
    <form {...methods} onSubmit={() => handleSubmit(onSubmitHandler)}>
      <label htmlFor="email">Email address</label>
      <input name="email" type="email" />
      <label htmlFor="password">Password</label>
      <input name="password" type="password" />
      <p>
        Need an account? <Link to="/regiser">Sign up here</Link>
      </p>
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginPage;
