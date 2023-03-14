import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import loginSchema from '@/lib/formSchemas/loginSchema';

import TextButton from '@/components/buttons/TextButton';
import Spinner from '@/components/common/spinner';
import TextInput from '@/components/common/textInput';

import { useAuth } from '@/contexts/authContext';

import Container from '../container';
const LoginForm = () => {
  const { login } = useAuth();
  const [loading, setIsLoading] = useState(false);
  //  TODO: create a form builder instead of writing all of this every time
  //  TODO: use react query or something
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onLogin = async (data: FieldValues) => {
    setIsLoading(true);
    await login(data.nationalId, data.password);
    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <Container className='py-7'>
        <section className='my-auto flex h-[90vh] flex-col items-center justify-center overflow-hidden bg-white shadow-2xl md:flex-row'>
          {/* <div className='relative hidden h-full w-1/2 md:block'>
          <div className='loginClipper absolute bottom-0 h-full w-full bg-indigo-900'></div>
        </div> */}
          <div className='flex h-full w-full flex-1 flex-col justify-center gap-5 p-7'>
            <h1 className='mb-7 text-center text-6xl text-indigo-900'>Login</h1>
            <TextInput
              type='text'
              label='national id'
              placeholder='your national id'
              registeredProps={register('nationalId')}
              error={errors['nationalId']}
            />
            <TextInput
              label='password'
              type='password'
              placeholder='your password'
              registeredProps={register('password')}
              error={errors['password']}
            />

            <TextButton
              type='submit'
              className='mt-10 flex w-full justify-center bg-indigo-900 px-20 text-white'
              disabled={loading}
            >
              {loading ? <Spinner size={20} /> : 'Log in'}
            </TextButton>
          </div>
        </section>
      </Container>
    </form>
  );
};

export default LoginForm;
