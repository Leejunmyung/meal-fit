"use client"

import { postSignUp } from "@/shared/api/api"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState<SignUpParams>({
    email: "",
    password: "",
    username: "",
  })

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: postSignUp,
    onSuccess: (data) => {
      console.log("회원가입 성공", data)
      router.push("/login");
    },
    onError: (err) => {
      console.error("회원가입 실패", err)
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(form);
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white rounded-2xl shadow p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center">회원가입</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            이름
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={form.username}
            onChange={handleChange}
            required
            placeholder="홍길동"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="비밀번호 입력"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {isPending ? "가입 중..." : "회원가입"}
        </button>

        {isSuccess && <p className="text-green-600 text-sm text-center">회원가입 성공!</p>}
        {error && <p className="text-red-600 text-sm text-center">회원가입 실패. 다시 시도해주세요.</p>}
      </form>
    </div>
  )
}

export default SignUp
