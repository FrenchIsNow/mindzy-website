'use client'

import { Suspense, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const TRANSLATIONS = {
  en: {
    eyebrow: 'AI Employee as a Service',
    heroTitle: 'Join the',
    heroTitleItalic: 'waiting list.',
    heroSubtitle: "Be among the first companies to access Mindzy's AI Employee platform when it launches.",
    successEyebrow: "You're on the list",
    successTitle: 'Thank you for',
    successTitleItalic: 'your interest.',
    successBody: "We'll reach out as soon as the platform is ready for early access. We'll be in touch at the email you provided.",
    backToHome: '← Back to home',
    labelFirstName: 'First name',
    labelLastName: 'Last name',
    labelEmail: 'Work email',
    labelRole: 'Job title',
    labelCompany: 'Company',
    labelSize: 'Company size',
    labelUseCase: 'What would you use AI employees for?',
    placeholderFirstName: 'John',
    placeholderLastName: 'Smith',
    placeholderEmail: 'john@company.com',
    placeholderRole: 'CEO, Head of Ops…',
    placeholderCompany: 'Acme Corp',
    placeholderSize: 'Select…',
    placeholderUseCase: "Describe the business roles or workflows you'd like to automate…",
    size1: '1–10 employees',
    size2: '11–50 employees',
    size3: '51–200 employees',
    size4: '201–500 employees',
    size5: '500+ employees',
    submitBtn: 'Join the Waiting List',
    emailSubject: 'New Waiting List — AI Employee as a Service',
  },
  fr: {
    eyebrow: 'AI Employee as a Service',
    heroTitle: 'Rejoignez la',
    heroTitleItalic: "liste d'attente.",
    heroSubtitle: 'Soyez parmi les premières entreprises à accéder à la plateforme AI Employee de Mindzy lors de son lancement.',
    successEyebrow: 'Vous êtes sur la liste',
    successTitle: 'Merci pour',
    successTitleItalic: 'votre intérêt.',
    successBody: "Nous vous contacterons dès que la plateforme sera prête pour un accès anticipé. Nous vous recontacterons à l'adresse e-mail que vous avez fournie.",
    backToHome: "← Retour à l'accueil",
    labelFirstName: 'Prénom',
    labelLastName: 'Nom',
    labelEmail: 'E-mail professionnel',
    labelRole: 'Intitulé du poste',
    labelCompany: 'Entreprise',
    labelSize: "Taille de l'entreprise",
    labelUseCase: 'Pour quoi utiliseriez-vous des employés IA ?',
    placeholderFirstName: 'Jean',
    placeholderLastName: 'Dupont',
    placeholderEmail: 'jean@societe.com',
    placeholderRole: 'PDG, Directeur des Opérations…',
    placeholderCompany: 'Ma Société',
    placeholderSize: 'Sélectionner…',
    placeholderUseCase: 'Décrivez les rôles ou processus métier que vous souhaitez automatiser…',
    size1: '1–10 employés',
    size2: '11–50 employés',
    size3: '51–200 employés',
    size4: '201–500 employés',
    size5: '500+ employés',
    submitBtn: "Rejoindre la liste d'attente",
    emailSubject: "Nouvelle liste d'attente — AI Employee as a Service",
  },
  es: {
    eyebrow: 'AI Employee as a Service',
    heroTitle: 'Únete a la',
    heroTitleItalic: 'lista de espera.',
    heroSubtitle: 'Sé de las primeras empresas en acceder a la plataforma AI Employee de Mindzy cuando se lance.',
    successEyebrow: 'Estás en la lista',
    successTitle: 'Gracias por',
    successTitleItalic: 'tu interés.',
    successBody: 'Nos pondremos en contacto contigo en cuanto la plataforma esté lista para el acceso anticipado. Te escribiremos al correo que proporcionaste.',
    backToHome: '← Volver al inicio',
    labelFirstName: 'Nombre',
    labelLastName: 'Apellido',
    labelEmail: 'Correo profesional',
    labelRole: 'Cargo',
    labelCompany: 'Empresa',
    labelSize: 'Tamaño de la empresa',
    labelUseCase: '¿Para qué usarías los empleados IA?',
    placeholderFirstName: 'Juan',
    placeholderLastName: 'García',
    placeholderEmail: 'juan@empresa.com',
    placeholderRole: 'CEO, Director de Operaciones…',
    placeholderCompany: 'Mi Empresa',
    placeholderSize: 'Seleccionar…',
    placeholderUseCase: 'Describe los roles o flujos de trabajo que te gustaría automatizar…',
    size1: '1–10 empleados',
    size2: '11–50 empleados',
    size3: '51–200 empleados',
    size4: '201–500 empleados',
    size5: '500+ empleados',
    submitBtn: 'Unirse a la lista de espera',
    emailSubject: 'Nueva lista de espera — AI Employee as a Service',
  },
  de: {
    eyebrow: 'AI Employee as a Service',
    heroTitle: 'Tragen Sie sich auf der',
    heroTitleItalic: 'Warteliste ein.',
    heroSubtitle: 'Seien Sie eines der ersten Unternehmen, das Zugang zur KI-Mitarbeiter-Plattform von Mindzy erhält.',
    successEyebrow: 'Sie stehen auf der Liste',
    successTitle: 'Danke für',
    successTitleItalic: 'Ihr Interesse.',
    successBody: 'Wir melden uns, sobald die Plattform für den Früh­zugang bereit ist. Wir werden Sie unter der angegebenen E-Mail-Adresse kontaktieren.',
    backToHome: '← Zurück zur Startseite',
    labelFirstName: 'Vorname',
    labelLastName: 'Nachname',
    labelEmail: 'Geschäftliche E-Mail',
    labelRole: 'Berufsbezeichnung',
    labelCompany: 'Unternehmen',
    labelSize: 'Unternehmensgröße',
    labelUseCase: 'Wofür würden Sie KI-Mitarbeiter einsetzen?',
    placeholderFirstName: 'Max',
    placeholderLastName: 'Müller',
    placeholderEmail: 'max@unternehmen.de',
    placeholderRole: 'CEO, Betriebsleiter…',
    placeholderCompany: 'Mein Unternehmen',
    placeholderSize: 'Auswählen…',
    placeholderUseCase: 'Beschreiben Sie die Geschäftsrollen oder Prozesse, die Sie automatisieren möchten…',
    size1: '1–10 Mitarbeiter',
    size2: '11–50 Mitarbeiter',
    size3: '51–200 Mitarbeiter',
    size4: '201–500 Mitarbeiter',
    size5: '500+ Mitarbeiter',
    submitBtn: 'Auf die Warteliste setzen',
    emailSubject: 'Neue Warteliste — AI Employee as a Service',
  },
  it: {
    eyebrow: 'AI Employee as a Service',
    heroTitle: 'Iscriviti alla',
    heroTitleItalic: "lista d'attesa.",
    heroSubtitle: 'Sii tra le prime aziende ad accedere alla piattaforma AI Employee di Mindzy al suo lancio.',
    successEyebrow: 'Sei nella lista',
    successTitle: 'Grazie per',
    successTitleItalic: 'il tuo interesse.',
    successBody: "Ti contatteremo non appena la piattaforma sarà pronta per l'accesso anticipato. Ti scriveremo all'indirizzo e-mail che hai fornito.",
    backToHome: '← Torna alla home',
    labelFirstName: 'Nome',
    labelLastName: 'Cognome',
    labelEmail: 'E-mail aziendale',
    labelRole: 'Titolo professionale',
    labelCompany: 'Azienda',
    labelSize: 'Dimensione azienda',
    labelUseCase: 'Per cosa useresti i dipendenti IA?',
    placeholderFirstName: 'Marco',
    placeholderLastName: 'Rossi',
    placeholderEmail: 'marco@azienda.it',
    placeholderRole: 'CEO, Responsabile operativo…',
    placeholderCompany: 'La Mia Azienda',
    placeholderSize: 'Seleziona…',
    placeholderUseCase: 'Descrivi i ruoli aziendali o i flussi di lavoro che vorresti automatizzare…',
    size1: '1–10 dipendenti',
    size2: '11–50 dipendenti',
    size3: '51–200 dipendenti',
    size4: '201–500 dipendenti',
    size5: '500+ dipendenti',
    submitBtn: "Iscriviti alla lista d'attesa",
    emailSubject: "Nuova lista d'attesa — AI Employee as a Service",
  },
  pt: {
    eyebrow: 'AI Employee as a Service',
    heroTitle: 'Junte-se à',
    heroTitleItalic: 'lista de espera.',
    heroSubtitle: 'Seja uma das primeiras empresas a aceder à plataforma AI Employee da Mindzy quando for lançada.',
    successEyebrow: 'Está na lista',
    successTitle: 'Obrigado pelo',
    successTitleItalic: 'seu interesse.',
    successBody: 'Entraremos em contacto assim que a plataforma estiver pronta para acesso antecipado. Iremos contactá-lo pelo e-mail que forneceu.',
    backToHome: '← Voltar ao início',
    labelFirstName: 'Nome',
    labelLastName: 'Apelido',
    labelEmail: 'E-mail profissional',
    labelRole: 'Cargo',
    labelCompany: 'Empresa',
    labelSize: 'Dimensão da empresa',
    labelUseCase: 'Para que utilizaria os funcionários IA?',
    placeholderFirstName: 'João',
    placeholderLastName: 'Silva',
    placeholderEmail: 'joao@empresa.pt',
    placeholderRole: 'CEO, Diretor de Operações…',
    placeholderCompany: 'A Minha Empresa',
    placeholderSize: 'Selecionar…',
    placeholderUseCase: 'Descreva os papéis de negócio ou fluxos de trabalho que gostaria de automatizar…',
    size1: '1–10 colaboradores',
    size2: '11–50 colaboradores',
    size3: '51–200 colaboradores',
    size4: '201–500 colaboradores',
    size5: '500+ colaboradores',
    submitBtn: 'Juntar-me à lista de espera',
    emailSubject: 'Nova lista de espera — AI Employee as a Service',
  },
  ar: {
    eyebrow: 'موظف الذكاء الاصطناعي كخدمة',
    heroTitle: 'انضم إلى',
    heroTitleItalic: 'قائمة الانتظار.',
    heroSubtitle: 'كن من أوائل الشركات التي تصل إلى منصة موظفي الذكاء الاصطناعي من Mindzy عند إطلاقها.',
    successEyebrow: 'أنت في القائمة',
    successTitle: 'شكراً على',
    successTitleItalic: 'اهتمامك.',
    successBody: 'سنتواصل معك بمجرد أن تصبح المنصة جاهزة للوصول المبكر. سنتواصل معك على البريد الإلكتروني الذي أدخلته.',
    backToHome: '← العودة إلى الرئيسية',
    labelFirstName: 'الاسم الأول',
    labelLastName: 'اسم العائلة',
    labelEmail: 'البريد الإلكتروني المهني',
    labelRole: 'المسمى الوظيفي',
    labelCompany: 'الشركة',
    labelSize: 'حجم الشركة',
    labelUseCase: 'لماذا ستستخدم موظفي الذكاء الاصطناعي؟',
    placeholderFirstName: 'أحمد',
    placeholderLastName: 'المحمد',
    placeholderEmail: 'ahmed@company.com',
    placeholderRole: 'المدير التنفيذي، مدير العمليات…',
    placeholderCompany: 'شركتي',
    placeholderSize: 'اختر…',
    placeholderUseCase: 'صف الأدوار الوظيفية أو سير العمل التي ترغب في أتمتتها…',
    size1: '1–10 موظفين',
    size2: '11–50 موظفاً',
    size3: '51–200 موظف',
    size4: '201–500 موظف',
    size5: '500+ موظف',
    submitBtn: 'انضم إلى قائمة الانتظار',
    emailSubject: 'قائمة انتظار جديدة — AI Employee as a Service',
  },
  zh: {
    eyebrow: 'AI 员工即服务',
    heroTitle: '加入',
    heroTitleItalic: '等待名单。',
    heroSubtitle: '成为首批访问 Mindzy AI 员工平台的企业之一。',
    successEyebrow: '您已加入名单',
    successTitle: '感谢您的',
    successTitleItalic: '关注。',
    successBody: '平台准备好提前访问后，我们将立即与您联系。我们将通过您提供的电子邮件与您保持联系。',
    backToHome: '← 返回首页',
    labelFirstName: '名字',
    labelLastName: '姓氏',
    labelEmail: '工作邮箱',
    labelRole: '职位',
    labelCompany: '公司',
    labelSize: '公司规模',
    labelUseCase: '您将如何使用 AI 员工？',
    placeholderFirstName: '张',
    placeholderLastName: '三',
    placeholderEmail: 'zhang@company.com',
    placeholderRole: 'CEO、运营总监……',
    placeholderCompany: '我的公司',
    placeholderSize: '请选择…',
    placeholderUseCase: '请描述您希望自动化的业务岗位或工作流程……',
    size1: '1–10 名员工',
    size2: '11–50 名员工',
    size3: '51–200 名员工',
    size4: '201–500 名员工',
    size5: '500+ 名员工',
    submitBtn: '加入等待名单',
    emailSubject: '新等待名单 — AI Employee as a Service',
  },
  ja: {
    eyebrow: 'AI Employee as a Service',
    heroTitle: 'ウェイティングリストに',
    heroTitleItalic: '参加する。',
    heroSubtitle: 'Mindzy の AI 従業員プラットフォームがローンチされた際に、最初にアクセスできる企業の一つになりましょう。',
    successEyebrow: 'リストに登録されました',
    successTitle: 'ご関心を',
    successTitleItalic: 'ありがとうございます。',
    successBody: 'プラットフォームがアーリーアクセスの準備が整い次第、ご連絡いたします。ご提供いただいたメールアドレスにご連絡します。',
    backToHome: '← ホームに戻る',
    labelFirstName: '名前',
    labelLastName: '苗字',
    labelEmail: '業務用メールアドレス',
    labelRole: '役職',
    labelCompany: '会社名',
    labelSize: '従業員数',
    labelUseCase: 'AI 従業員をどのように活用したいですか？',
    placeholderFirstName: '太郎',
    placeholderLastName: '山田',
    placeholderEmail: 'taro@company.co.jp',
    placeholderRole: 'CEO、オペレーション責任者…',
    placeholderCompany: '株式会社〇〇',
    placeholderSize: '選択してください…',
    placeholderUseCase: '自動化したい業務の役割やワークフローを記述してください…',
    size1: '1〜10名',
    size2: '11〜50名',
    size3: '51〜200名',
    size4: '201〜500名',
    size5: '500名以上',
    submitBtn: 'ウェイティングリストに参加する',
    emailSubject: '新規ウェイティングリスト — AI Employee as a Service',
  },
  ru: {
    eyebrow: 'AI-сотрудник как услуга',
    heroTitle: 'Присоединитесь к',
    heroTitleItalic: 'списку ожидания.',
    heroSubtitle: 'Будьте среди первых компаний, которые получат доступ к платформе AI Employee от Mindzy при запуске.',
    successEyebrow: 'Вы в списке',
    successTitle: 'Спасибо за',
    successTitleItalic: 'ваш интерес.',
    successBody: 'Мы свяжемся с вами, как только платформа будет готова к раннему доступу. Мы напишем на указанный вами адрес электронной почты.',
    backToHome: '← Вернуться на главную',
    labelFirstName: 'Имя',
    labelLastName: 'Фамилия',
    labelEmail: 'Рабочий e-mail',
    labelRole: 'Должность',
    labelCompany: 'Компания',
    labelSize: 'Размер компании',
    labelUseCase: 'Для чего вы бы использовали AI-сотрудников?',
    placeholderFirstName: 'Иван',
    placeholderLastName: 'Иванов',
    placeholderEmail: 'ivan@company.ru',
    placeholderRole: 'CEO, Руководитель операций…',
    placeholderCompany: 'Моя компания',
    placeholderSize: 'Выбрать…',
    placeholderUseCase: 'Опишите бизнес-роли или процессы, которые вы хотели бы автоматизировать…',
    size1: '1–10 сотрудников',
    size2: '11–50 сотрудников',
    size3: '51–200 сотрудников',
    size4: '201–500 сотрудников',
    size5: '500+ сотрудников',
    submitBtn: 'Присоединиться к списку ожидания',
    emailSubject: 'Новый список ожидания — AI Employee as a Service',
  },
}

const CSS = `
.wl-hero { padding: 140px 0 24px; text-align: center; }
.wl-hero .eyebrow {
  margin: 0 auto;
  color: var(--ai-accent);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.wl-hero h1 {
  font-family: var(--font-instrument-serif), serif;
  font-weight: 400;
  font-size: clamp(32px, 4.4vw, 56px);
  line-height: 1.22;
  letter-spacing: -0.015em;
  max-width: 20ch;
  margin: 16px auto 0;
  padding-bottom: 0.06em;
  color: var(--ai-fg);
}
.wl-hero h1 .it {
  font-style: italic;
  color: var(--ai-accent);
}
.wl-hero p {
  margin: 20px auto 0;
  color: var(--ai-fg-muted);
  font-size: 17px;
  line-height: 1.65;
  max-width: 480px;
}

.wl-container { max-width: 720px; margin: 0 auto; padding: 0 24px; }

.wl-form-wrap {
  max-width: 620px;
  margin: 40px auto 100px;
  background: var(--ai-surface);
  border: 1px solid var(--ai-border);
  border-radius: 24px;
  padding: 48px 48px 52px;
}
@media (max-width: 680px) {
  .wl-form-wrap { padding: 32px 24px 36px; margin: 32px 16px 64px; }
}

.wl-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 520px) { .wl-row { grid-template-columns: 1fr; } }

.wl-field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 20px; }
.wl-field:last-child { margin-bottom: 0; }

.wl-field label {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--ai-fg-soft);
}
.wl-field label .req { color: var(--ai-accent); margin-left: 2px; }

.wl-field input,
.wl-field select,
.wl-field textarea {
  width: 100%;
  padding: 13px 16px;
  border: 1px solid var(--ai-border);
  border-radius: 12px;
  background: var(--ai-bg);
  color: var(--ai-fg);
  font: inherit;
  font-size: 14.5px;
  outline: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
  -webkit-appearance: none;
  appearance: none;
  box-sizing: border-box;
  font-family: var(--font-instrument-sans), sans-serif;
}
.wl-field input::placeholder,
.wl-field textarea::placeholder { color: var(--ai-fg-soft); }
.wl-field input:focus,
.wl-field select:focus,
.wl-field textarea:focus {
  border-color: var(--ai-accent);
  box-shadow: 0 0 0 3px rgba(124,58,237,.12);
}
.wl-field select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}
.wl-field textarea { resize: vertical; min-height: 100px; }

.wl-divider { height: 1px; background: var(--ai-border); margin: 28px 0; }

.wl-submit { margin-top: 32px; display: flex; justify-content: center; }

.wl-glass-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 26px;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: rgba(20,20,40,0.88);
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(14px) saturate(180%);
  -webkit-backdrop-filter: blur(14px) saturate(180%);
  border: 1px solid rgba(20,20,40,0.12);
  box-shadow: inset 0 1.5px 0 rgba(255,255,255,0.90), inset 0 -1px 0 rgba(0,0,0,0.05), 0 10px 30px rgba(0,0,0,0.10), 0 3px 8px rgba(0,0,0,0.06);
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s ease, box-shadow 0.18s ease, transform 0.18s ease;
}
.wl-glass-btn:hover { background: rgba(255,255,255,0.75); transform: translateY(-1px); }
html[data-ai-theme="black"] .wl-glass-btn {
  color: #fff;
  background: rgba(124, 58, 237, 0.75);
  border: 1px solid rgba(167, 139, 250, 0.45);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 20px rgba(124,58,237,0.4), 0 1px 3px rgba(0,0,0,0.3);
}
html[data-ai-theme="black"] .wl-glass-btn:hover {
  background: rgba(124, 58, 237, 0.92);
}

/* Success */
.wl-success { padding: 160px 0 160px; text-align: center; }
.wl-success h1 {
  font-family: var(--font-instrument-serif), serif;
  font-weight: 400;
  font-size: clamp(36px, 5vw, 60px);
  margin: 16px auto 0;
  max-width: 18ch;
  color: var(--ai-fg);
}
.wl-success h1 .it { font-style: italic; color: var(--ai-accent); }
.wl-success p {
  color: var(--ai-fg-muted);
  font-size: 17px;
  margin: 20px auto 0;
  max-width: 420px;
  line-height: 1.65;
}
.wl-success__back {
  margin-top: 40px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--ai-accent);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: gap 0.18s ease;
}
.wl-success__back:hover { gap: 10px; }
`

const SUBMITTING_LABEL: Record<string, string> = {
  en: 'Submitting…', fr: 'Envoi…', es: 'Enviando…', de: 'Senden…',
  it: 'Invio…', pt: 'A enviar…', ar: 'جارٍ الإرسال…', zh: '提交中…',
  ja: '送信中…', ru: 'Отправка…',
}
const ERROR_LABEL: Record<string, string> = {
  en: 'Something went wrong. Please try again.',
  fr: 'Une erreur est survenue. Veuillez réessayer.',
  es: 'Algo salió mal. Inténtalo de nuevo.',
  de: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
  it: 'Qualcosa è andato storto. Riprova.',
  pt: 'Algo correu mal. Tente novamente.',
  ar: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
  zh: '发生错误，请重试。',
  ja: 'エラーが発生しました。再度お試しください。',
  ru: 'Что-то пошло не так. Попробуйте ещё раз.',
}

function WaitingListContent() {
  const params = useParams<{ locale: string }>()
  const locale = (params?.locale as string) || 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en
  const searchParams = useSearchParams()
  const router = useRouter()
  const success = searchParams?.get('success') === '1'
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg(null)
    setSubmitting(true)
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          email: data.get('email'),
          role: data.get('role'),
          company: data.get('company'),
          companySize: data.get('companySize'),
          useCase: data.get('useCase'),
          locale,
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Submission failed')
      }
      router.push(`/${locale}/waiting-list?success=1`)
    } catch {
      setErrorMsg(ERROR_LABEL[locale] ?? ERROR_LABEL.en)
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <section className="wl-success">
        <div className="wl-container">
          <div className="eyebrow" style={{ color: 'var(--ai-accent)', fontSize: 13, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
            {t.successEyebrow}
          </div>
          <h1>{t.successTitle} <span className="it">{t.successTitleItalic}</span></h1>
          <p>{t.successBody}</p>
          <Link className="wl-success__back" href={`/${locale}`}>{t.backToHome}</Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="wl-hero">
        <div className="wl-container">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1>{t.heroTitle} <span className="it">{t.heroTitleItalic}</span></h1>
          <p>{t.heroSubtitle}</p>
        </div>
      </section>

      <div className="wl-container">
        <div className="wl-form-wrap">
          <form onSubmit={handleSubmit} noValidate>
            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <div className="wl-row">
              <div className="wl-field">
                <label htmlFor="wl-firstname">{t.labelFirstName} <span className="req">*</span></label>
                <input type="text" id="wl-firstname" name="firstName" placeholder={t.placeholderFirstName} required autoComplete="given-name" />
              </div>
              <div className="wl-field">
                <label htmlFor="wl-lastname">{t.labelLastName} <span className="req">*</span></label>
                <input type="text" id="wl-lastname" name="lastName" placeholder={t.placeholderLastName} required autoComplete="family-name" />
              </div>
            </div>

            <div className="wl-row">
              <div className="wl-field">
                <label htmlFor="wl-email">{t.labelEmail} <span className="req">*</span></label>
                <input type="email" id="wl-email" name="email" placeholder={t.placeholderEmail} required autoComplete="email" />
              </div>
              <div className="wl-field">
                <label htmlFor="wl-role">{t.labelRole} <span className="req">*</span></label>
                <input type="text" id="wl-role" name="role" placeholder={t.placeholderRole} required />
              </div>
            </div>

            <div className="wl-row">
              <div className="wl-field">
                <label htmlFor="wl-company">{t.labelCompany} <span className="req">*</span></label>
                <input type="text" id="wl-company" name="company" placeholder={t.placeholderCompany} required autoComplete="organization" />
              </div>
              <div className="wl-field">
                <label htmlFor="wl-size">{t.labelSize}</label>
                <select id="wl-size" name="companySize" defaultValue="">
                  <option value="" disabled>{t.placeholderSize}</option>
                  <option>{t.size1}</option>
                  <option>{t.size2}</option>
                  <option>{t.size3}</option>
                  <option>{t.size4}</option>
                  <option>{t.size5}</option>
                </select>
              </div>
            </div>

            <div className="wl-divider"></div>

            <div className="wl-field">
              <label htmlFor="wl-usecase">{t.labelUseCase}</label>
              <textarea id="wl-usecase" name="useCase" placeholder={t.placeholderUseCase}></textarea>
            </div>

            {errorMsg && (
              <div style={{ marginTop: 20, color: '#dc2626', fontSize: 14, textAlign: 'center' }}>
                {errorMsg}
              </div>
            )}

            <div className="wl-submit">
              <button type="submit" className="wl-glass-btn" disabled={submitting} style={{ opacity: submitting ? 0.7 : 1 }}>
                {submitting ? (SUBMITTING_LABEL[locale] ?? SUBMITTING_LABEL.en) : t.submitBtn}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default function WaitingListPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Suspense fallback={null}>
        <WaitingListContent />
      </Suspense>
    </>
  )
}
