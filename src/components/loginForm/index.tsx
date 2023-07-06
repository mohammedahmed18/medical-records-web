import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import loginSchema from '@/lib/formSchemas/loginSchema';

import TextButton from '@components/buttons/TextButton';
import Spinner from '@components/common/spinner';
import TextInput from '@components/common/textInput';

import { useAuth } from '@/contexts/authContext';

import Container from '../container';

import IdIcon from '~/svg/id-card-icon.svg';
import LockIcon from '~/svg/lock-icon.svg';

export const Bubble = ({ size = 50, className = '' }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={twMerge(
        'absolute -z-[99999999] rounded-full bg-primary-100/20 blur-sm',
        className
      )}
    ></div>
  );
};

const LoginForm = () => {
  const { login } = useAuth();
  //  TODO: create a form builder instead of writing all of this every time
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onLogin = async (data: FieldValues) => {
    await login(data.nationalId, data.password);
  };
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      {/* <Bubble className='left-1/2' size={500} /> */}
      <Container narrow className='py-7'>
        <section className='my-auto flex h-[90vh] flex-col items-center justify-center overflow-hidden rounded-3xl border-2 bg-white shadow-2xl md:flex-row'>
          {/* <div className='relative hidden h-full w-1/2 md:block'>
          <div className='loginClipper absolute bottom-0 h-full w-full bg-indigo-900'></div>
        </div> */}
          <div className='flex h-full w-full flex-1 flex-col justify-center gap-5 p-7'>
            <h1 className='mb-7 text-center text-6xl capitalize text-indigo-900'>
              Welcome back
            </h1>
            <TextInput
              type='text'
              label='national id'
              placeholder='your national id'
              registeredProps={register('nationalId')}
              error={errors['nationalId']}
              Icon={IdIcon}
            />
            <TextInput
              label='password'
              type='password'
              placeholder='your password'
              registeredProps={register('password')}
              error={errors['password']}
              Icon={LockIcon}
            />

            <TextButton
              type='submit'
              className='mx-auto mt-10 flex justify-center rounded-full bg-indigo-900 px-20 text-white'
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner size={20} /> : 'Log in'}
            </TextButton>
          </div>
        </section>
      </Container>
    </form>
  );
};

export default LoginForm;
