import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { beforeAfterExamples } from '@/lib/config'
import type { Locale } from '@/lib/i18n'

export function BeforeAfterSlider({ locale }: { locale: Locale }) {
  return (
    <div className="space-y-12">
      {beforeAfterExamples.map((ex) => (
        <Card key={ex.id} variant="elevated" className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 bg-red-50/50">
                <Badge variant="error" className="mb-4">Avant</Badge>
                <div className="aspect-video bg-gray-200 rounded-xl mb-6 flex items-center justify-center text-gray-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <ul className="space-y-2">
                  {ex.before.issues[locale].map((issue, i) => (
                    <li key={i} className="flex items-center gap-2 text-red-700"><svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>{issue}</li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-green-50/50">
                <Badge variant="success" className="mb-4">Après</Badge>
                <div className="aspect-video bg-gray-200 rounded-xl mb-6 flex items-center justify-center text-gray-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <ul className="space-y-2">
                  {ex.after.improvements[locale].map((imp, i) => (
                    <li key={i} className="flex items-center gap-2 text-green-700"><svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
              <div><h3 className="font-semibold text-anthracite">{ex.title[locale]}</h3><p className="text-sm text-gray-600">{ex.profession}</p></div>
              <div className="flex gap-6">
                {ex.metrics.map((m, i) => (
                  <div key={i} className="text-center"><div className="text-2xl font-bold text-violet">{m.value}</div><div className="text-xs text-gray-600">{m.label[locale]}</div></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
