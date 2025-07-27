'use client';

import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 로그인 처리 로직
    console.log({ email, password });
  };

  const handleSocialLogin = (provider: 'kakao' | 'naver') => {
    // TODO: 소셜 로그인 처리 로직
    console.log(`Login with ${provider}`);
  };

  return (
    <div className='max-w-md mx-auto mt-16 bg-white rounded-2xl shadow p-8 space-y-6'>
      <h2 className='text-2xl font-bold text-center'>로그인</h2>

      {/* 일반 로그인 */}
      <form onSubmit={handleLogin} className='space-y-4'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-600'>
            이메일
          </label>
          <input
            id='email'
            type='email'
            className='w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='you@example.com'
          />
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-600'>
            비밀번호
          </label>
          <input
            id='password'
            type='password'
            className='w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='비밀번호 입력'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
        >
          로그인
        </button>
      </form>

      {/* 소셜 로그인 */}
      <div className='space-y-3'>
        <button
          onClick={() => handleSocialLogin('kakao')}
          className='w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition'
        >
          카카오 로그인
        </button>

        <button
          onClick={() => handleSocialLogin('naver')}
          className='w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition'
        >
          네이버 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
