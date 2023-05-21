import { User } from 'lucide-react'

export function SignIn() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className="flex-items-center flex gap-3 text-left transition-colors hover:text-gray-50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <User className="text-gray h-5 w-5"></User>
      </div>
      <p className="leaning-snug max-w-[140px] text-sm">
        <span className="underLine">Crie sua conta e salve suas memórias!</span>
      </p>
    </a>
  )
}
