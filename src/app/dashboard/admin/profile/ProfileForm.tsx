'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'

export default function ProfileForm({ email, name }: { email: string; name: string }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (next.length < 8) {
      setError('Le nouveau mot de passe doit contenir au moins 8 caractères.')
      return
    }
    if (next !== confirm) {
      setError('Les deux nouveaux mots de passe ne correspondent pas.')
      return
    }
    if (current === next) {
      setError('Le nouveau mot de passe doit être différent de l\'ancien.')
      return
    }

    setLoading(true)

    const result = await authClient.changePassword({
      currentPassword: current,
      newPassword: next,
    })

    setLoading(false)

    if (result.error) {
      setError(result.error.message || 'Impossible de changer le mot de passe.')
      return
    }

    setSuccess('Mot de passe mis à jour.')
    setCurrent('')
    setNext('')
    setConfirm('')
  }

  const inputCls =
    'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500'

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input value={email} readOnly className={`${inputCls} bg-slate-50 text-slate-500`} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Nom</label>
        <input value={name} readOnly className={`${inputCls} bg-slate-50 text-slate-500`} />
      </div>

      <div className="my-2 border-t border-slate-200" />

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Mot de passe actuel</label>
        <input
          type="password"
          value={current}
          onChange={e => setCurrent(e.target.value)}
          autoComplete="current-password"
          className={inputCls}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Nouveau mot de passe</label>
        <input
          type="password"
          value={next}
          onChange={e => setNext(e.target.value)}
          autoComplete="new-password"
          minLength={8}
          className={inputCls}
          required
        />
        <p className="mt-1 text-xs text-slate-500">Au moins 8 caractères.</p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Confirmer le nouveau mot de passe</label>
        <input
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          autoComplete="new-password"
          minLength={8}
          className={inputCls}
          required
        />
      </div>

      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
      {success && <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {loading ? 'Mise à jour…' : 'Changer le mot de passe'}
      </button>
    </form>
  )
}
