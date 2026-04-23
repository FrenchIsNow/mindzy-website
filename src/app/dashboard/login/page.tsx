import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-2xl font-semibold">Mindzy Dashboard</h1>
        <p className="mb-6 text-sm text-slate-600">Connectez-vous pour gérer vos articles.</p>
        <LoginForm />
      </div>
    </div>
  )
}
