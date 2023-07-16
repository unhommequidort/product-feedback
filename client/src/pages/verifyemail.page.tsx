import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TypeOf, object, string } from 'zod';
import { toast } from 'react-toastify';
import { useVerifyEmailMutation } from '../redux/api/authApi';

const verificationCodeSchema = object({
  verificationCode: string().min(1, 'Verification code is required'),
});

export type VerificationCodeInput = TypeOf<typeof verificationCodeSchema>;

const EmailVerificationPage = () => {
  const { verificationCode } = useParams();

  const methods = useForm<VerificationCodeInput>({
    resolver: zodResolver(verificationCodeSchema),
  });

  // ? Calling the Register Mutation
  const [verifyEmail, { isLoading, isSuccess, data, error, isError }] =
    useVerifyEmailMutation();

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (verificationCode) {
      reset({ verificationCode });
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate('/login');
    }
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        });
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  const onSubmitHandler: SubmitHandler<VerificationCodeInput> = async ({
    verificationCode,
  }) => {
    // ? Calling the RegisterUser Mutation
    await verifyEmail({ verificationCode });
  };

  return (
    <form {...methods} onSubmit={handleSubmit(onSubmitHandler)}>
      <label htmlFor="verificationCode">Verification code</label>
      <input
        {...register('verificationCode')}
        defaultValue={verificationCode}
        name="verificationCode"
        type="text"
      />
      <button type="submit">Verify email</button>
    </form>
  );
};

export default EmailVerificationPage;
