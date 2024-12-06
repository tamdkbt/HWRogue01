'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          password: password.trim() 
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại')
      }

      router.push('/admin')
    } catch (error) {
      console.error('Login error:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#4A4A4A] flex items-center justify-center p-4">
      <Card className="w-full max-w-[600px] bg-[#6E6E6E] shadow-2xl rounded-xl">
        <CardHeader className="flex flex-col items-center gap-8 pt-16 pb-12">
          <div className="relative group">
            <div className="w-96 h-96 relative transform transition-all duration-300 ease-in-out group-hover:-translate-y-2">
              <Image
                src="/images/admin-logo.png"
                alt="Admin Logo"
                fill
                className="object-contain drop-shadow-2xl filter contrast-125"
                priority
              />
            </div>
            <div className="absolute -bottom-6 left-0 right-0 h-16 bg-gradient-to-t from-[#4A4A4A] to-transparent opacity-30"></div>
          </div>
          <h1 className="text-4xl font-bold text-[#FFD700] tracking-wider">Đăng nhập Admin</h1>
        </CardHeader>

        <CardBody className="px-12 pb-12">
          {error && (
            <div className="flex items-center gap-2 bg-[#8B0000] border border-[#660000] text-white px-5 py-4 rounded-lg mb-8">
              <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0" />
              <span className="text-base">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-base font-medium text-[#A9A9A9] mb-1.5">
                Email đăng nhập
              </label>
              <Input
                type="email"
                placeholder="admin@tamgymcheck.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
                classNames={{
                  base: "h-12",
                  mainWrapper: "h-full",
                  input: "text-base",
                  inputWrapper: [
                    "h-full",
                    "font-normal",
                    "bg-white",
                    "!border-gray-200",
                    "hover:!border-gray-300",
                    "focus-within:!border-[#FFD700]",
                    "rounded-lg",
                    "shadow-md",
                    "transition-colors",
                    "!w-full",
                  ],
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-base font-medium text-[#A9A9A9] mb-1.5">
                Mật khẩu
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
                classNames={{
                  base: "h-12",
                  mainWrapper: "h-full",
                  input: "text-base",
                  inputWrapper: [
                    "h-full",
                    "font-normal",
                    "bg-white",
                    "!border-gray-200",
                    "hover:!border-gray-300",
                    "focus-within:!border-[#FFD700]",
                    "rounded-lg",
                    "shadow-md",
                    "transition-colors",
                    "!w-full",
                  ],
                }}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-medium bg-[#20B2AA] hover:bg-[#1A8F8A] text-white rounded-lg transition-colors shadow-lg mt-4"
              size="lg"
              isLoading={isLoading}
              spinner={
                <svg className="animate-spin h-6 w-6 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              }
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
