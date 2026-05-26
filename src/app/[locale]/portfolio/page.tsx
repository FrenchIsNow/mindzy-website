'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { GlassButton } from '@/components/ui/GlassButton'
import { JsonLd, jsonLdBreadcrumb } from '@/lib/seo'

const TRANSLATIONS = {
  en: {
    eyebrow: 'Our work',
    title: 'Created by Mindzy.',
    subtitle: 'Every project below was scoped, designed, and delivered by our team with one objective: building digital experiences that are clear, elegant, and built for performance.',
    statProjects: 'Projects delivered',
    statIndustries: 'Industries',
    bookCall: 'Book a Call',
    exploreWork: 'Explore work',
    featuredLabel: 'Featured projects',
    visitSite: 'Visit site',
    filterAll: 'All',
    filterSport: 'Sport & Coaching',
    closingTitle: 'Want this',
    closingTitleItalic: 'infrastructure',
    closingTitleEnd: 'inside your company?',
    closingBody: '30 minutes. We listen, we map, we tell you whether AI can move the needle for your operations.',
    bookCallBottom: 'Book a call',
    catLabels: {
      investment: 'Investment',
      media: 'Media',
      legal: 'Legal',
      wellness: 'Wellness',
      commerce: 'Commerce',
      sport: 'Sport',
      creative: 'Creative',
      photography: 'Photography',
      consulting: 'Consulting',
      freelance: 'Freelance',
      design: 'Design',
    },
  },
  fr: {
    eyebrow: 'Nos réalisations',
    title: 'Créé par Mindzy.',
    subtitle: 'Chaque projet ci-dessous a été cadré, conçu et livré par notre équipe avec un seul objectif : construire des expériences digitales claires, élégantes et performantes.',
    statProjects: 'Projets livrés',
    statIndustries: 'Secteurs',
    bookCall: 'Réserver un appel',
    exploreWork: 'Voir les projets',
    featuredLabel: 'Projets phares',
    visitSite: 'Visiter le site',
    filterAll: 'Tous',
    filterSport: 'Sport & Coaching',
    closingTitle: 'Vous voulez cette',
    closingTitleItalic: 'infrastructure',
    closingTitleEnd: 'dans votre entreprise ?',
    closingBody: "30 minutes. On écoute, on cartographie, on vous dit si l'IA peut faire la différence dans vos opérations.",
    bookCallBottom: 'Réserver un appel',
    catLabels: {
      investment: 'Investissement',
      media: 'Médias',
      legal: 'Juridique',
      wellness: 'Bien-être',
      commerce: 'Commerce',
      sport: 'Sport',
      creative: 'Créatif',
      photography: 'Photographie',
      consulting: 'Conseil',
      freelance: 'Freelance',
      design: 'Design',
    },
  },
  es: {
    eyebrow: 'Nuestro trabajo',
    title: 'Creado por Mindzy.',
    subtitle: 'Cada proyecto fue definido, diseñado y entregado por nuestro equipo con un único objetivo: construir experiencias digitales claras, elegantes y orientadas al rendimiento.',
    statProjects: 'Proyectos entregados',
    statIndustries: 'Sectores',
    bookCall: 'Reservar una llamada',
    exploreWork: 'Ver proyectos',
    featuredLabel: 'Proyectos destacados',
    visitSite: 'Visitar el sitio',
    filterAll: 'Todos',
    filterSport: 'Deporte & Coaching',
    closingTitle: '¿Quieres esta',
    closingTitleItalic: 'infraestructura',
    closingTitleEnd: 'en tu empresa?',
    closingBody: '30 minutos. Escuchamos, mapeamos y te decimos si la IA puede marcar la diferencia en tus operaciones.',
    bookCallBottom: 'Reservar una llamada',
    catLabels: {
      investment: 'Inversión',
      media: 'Medios',
      legal: 'Legal',
      wellness: 'Bienestar',
      commerce: 'Comercio',
      sport: 'Deporte',
      creative: 'Creativo',
      photography: 'Fotografía',
      consulting: 'Consultoría',
      freelance: 'Freelance',
      design: 'Diseño',
    },
  },
  de: {
    eyebrow: 'Unsere Arbeit',
    title: 'Erstellt von Mindzy.',
    subtitle: 'Jedes Projekt wurde von unserem Team geplant, gestaltet und umgesetzt – mit einem Ziel: digitale Erlebnisse zu schaffen, die klar, elegant und leistungsstark sind.',
    statProjects: 'Abgeschlossene Projekte',
    statIndustries: 'Branchen',
    bookCall: 'Gespräch buchen',
    exploreWork: 'Projekte ansehen',
    featuredLabel: 'Ausgewählte Projekte',
    visitSite: 'Website besuchen',
    filterAll: 'Alle',
    filterSport: 'Sport & Coaching',
    closingTitle: 'Möchten Sie diese',
    closingTitleItalic: 'Infrastruktur',
    closingTitleEnd: 'in Ihrem Unternehmen?',
    closingBody: '30 Minuten. Wir hören zu, analysieren und sagen Ihnen, ob KI Ihre Abläufe verbessern kann.',
    bookCallBottom: 'Gespräch buchen',
    catLabels: {
      investment: 'Investment',
      media: 'Medien',
      legal: 'Recht',
      wellness: 'Wellness',
      commerce: 'Handel',
      sport: 'Sport',
      creative: 'Kreativ',
      photography: 'Fotografie',
      consulting: 'Beratung',
      freelance: 'Freelance',
      design: 'Design',
    },
  },
  it: {
    eyebrow: 'Il nostro lavoro',
    title: 'Creato da Mindzy.',
    subtitle: 'Ogni progetto è stato definito, progettato e consegnato dal nostro team con un unico obiettivo: creare esperienze digitali chiare, eleganti e performanti.',
    statProjects: 'Progetti consegnati',
    statIndustries: 'Settori',
    bookCall: 'Prenota una chiamata',
    exploreWork: 'Esplora i progetti',
    featuredLabel: 'Progetti in evidenza',
    visitSite: 'Visita il sito',
    filterAll: 'Tutti',
    filterSport: 'Sport & Coaching',
    closingTitle: 'Vuoi questa',
    closingTitleItalic: 'infrastruttura',
    closingTitleEnd: 'nella tua azienda?',
    closingBody: "30 minuti. Ascoltiamo, mappiamo e ti diciamo se l'AI può fare la differenza nelle tue operazioni.",
    bookCallBottom: 'Prenota una chiamata',
    catLabels: {
      investment: 'Investimento',
      media: 'Media',
      legal: 'Legale',
      wellness: 'Benessere',
      commerce: 'Commercio',
      sport: 'Sport',
      creative: 'Creativo',
      photography: 'Fotografia',
      consulting: 'Consulenza',
      freelance: 'Freelance',
      design: 'Design',
    },
  },
  pt: {
    eyebrow: 'Nosso trabalho',
    title: 'Criado pela Mindzy.',
    subtitle: 'Cada projeto foi definido, desenhado e entregue pela nossa equipa com um único objetivo: criar experiências digitais claras, elegantes e orientadas para a performance.',
    statProjects: 'Projetos entregues',
    statIndustries: 'Setores',
    bookCall: 'Agendar uma chamada',
    exploreWork: 'Ver projetos',
    featuredLabel: 'Projetos em destaque',
    visitSite: 'Visitar o site',
    filterAll: 'Todos',
    filterSport: 'Desporto & Coaching',
    closingTitle: 'Quer esta',
    closingTitleItalic: 'infraestrutura',
    closingTitleEnd: 'na sua empresa?',
    closingBody: '30 minutos. Ouvimos, mapeamos e dizemos se a IA pode fazer a diferença nas suas operações.',
    bookCallBottom: 'Agendar uma chamada',
    catLabels: {
      investment: 'Investimento',
      media: 'Media',
      legal: 'Jurídico',
      wellness: 'Bem-estar',
      commerce: 'Comércio',
      sport: 'Desporto',
      creative: 'Criativo',
      photography: 'Fotografia',
      consulting: 'Consultoria',
      freelance: 'Freelance',
      design: 'Design',
    },
  },
  ar: {
    eyebrow: 'أعمالنا',
    title: 'من تصميم Mindzy.',
    subtitle: 'كل مشروع أدناه تم تحديد نطاقه وتصميمه وتسليمه من قِبَل فريقنا بهدف واحد: بناء تجارب رقمية واضحة وأنيقة ومُحسَّنة للأداء.',
    statProjects: 'مشروع مُنجَز',
    statIndustries: 'قطاع',
    bookCall: 'احجز مكالمة',
    exploreWork: 'استعرض الأعمال',
    featuredLabel: 'مشاريع مميزة',
    visitSite: 'زيارة الموقع',
    filterAll: 'الكل',
    filterSport: 'الرياضة والتدريب',
    closingTitle: 'هل تريد هذه',
    closingTitleItalic: 'البنية التحتية',
    closingTitleEnd: 'داخل شركتك؟',
    closingBody: '30 دقيقة. نستمع، نرسم الخريطة، ونخبرك إذا كان الذكاء الاصطناعي قادراً على إحداث فارق في عملياتك.',
    bookCallBottom: 'احجز مكالمة',
    catLabels: {
      investment: 'استثمار',
      media: 'إعلام',
      legal: 'قانوني',
      wellness: 'صحة وعافية',
      commerce: 'تجارة',
      sport: 'رياضة',
      creative: 'إبداعي',
      photography: 'تصوير',
      consulting: 'استشارات',
      freelance: 'مستقل',
      design: 'تصميم',
    },
  },
  zh: {
    eyebrow: '我们的作品',
    title: '由 Mindzy 打造。',
    subtitle: '以下每个项目均由我们的团队规划、设计并交付，目标只有一个：打造清晰、优雅且以性能为导向的数字体验。',
    statProjects: '交付项目',
    statIndustries: '行业',
    bookCall: '预约通话',
    exploreWork: '浏览作品',
    featuredLabel: '精选项目',
    visitSite: '访问网站',
    filterAll: '全部',
    filterSport: '运动与教练',
    closingTitle: '想将这套',
    closingTitleItalic: '基础设施',
    closingTitleEnd: '引入您的公司？',
    closingBody: '30 分钟。我们倾听、梳理，告诉您 AI 能否为您的运营带来突破。',
    bookCallBottom: '预约通话',
    catLabels: {
      investment: '投资',
      media: '媒体',
      legal: '法律',
      wellness: '健康',
      commerce: '商业',
      sport: '运动',
      creative: '创意',
      photography: '摄影',
      consulting: '咨询',
      freelance: '自由职业',
      design: '设计',
    },
  },
  ja: {
    eyebrow: '私たちの実績',
    title: 'Mindzy が手がけた作品。',
    subtitle: '以下のすべてのプロジェクトは、明確でエレガントかつパフォーマンスに優れたデジタル体験を構築するという一つの目標のもと、私たちのチームが設計・納品しました。',
    statProjects: '納品済みプロジェクト',
    statIndustries: '業界',
    bookCall: '通話を予約する',
    exploreWork: '作品を見る',
    featuredLabel: '注目プロジェクト',
    visitSite: 'サイトを見る',
    filterAll: 'すべて',
    filterSport: 'スポーツ＆コーチング',
    closingTitle: 'この',
    closingTitleItalic: 'インフラ',
    closingTitleEnd: 'を自社に導入しませんか？',
    closingBody: '30 分間。お話を伺い、マッピングし、AI が貴社の業務にどう貢献できるかをお伝えします。',
    bookCallBottom: '通話を予約する',
    catLabels: {
      investment: '投資',
      media: 'メディア',
      legal: '法律',
      wellness: 'ウェルネス',
      commerce: '商業',
      sport: 'スポーツ',
      creative: 'クリエイティブ',
      photography: '写真',
      consulting: 'コンサルティング',
      freelance: 'フリーランス',
      design: 'デザイン',
    },
  },
  ru: {
    eyebrow: 'Наши работы',
    title: 'Создано Mindzy.',
    subtitle: 'Каждый проект был спроектирован, разработан и сдан нашей командой с единственной целью: создавать цифровые продукты, которые чёткие, элегантные и ориентированные на результат.',
    statProjects: 'Реализованных проектов',
    statIndustries: 'Отраслей',
    bookCall: 'Записаться на звонок',
    exploreWork: 'Смотреть работы',
    featuredLabel: 'Избранные проекты',
    visitSite: 'Посетить сайт',
    filterAll: 'Все',
    filterSport: 'Спорт и тренинг',
    closingTitle: 'Хотите эту',
    closingTitleItalic: 'инфраструктуру',
    closingTitleEnd: 'в своей компании?',
    closingBody: '30 минут. Мы слушаем, составляем карту и говорим вам, может ли ИИ изменить ситуацию в вашей деятельности.',
    bookCallBottom: 'Записаться на звонок',
    catLabels: {
      investment: 'Инвестиции',
      media: 'Медиа',
      legal: 'Юриспруденция',
      wellness: 'Велнес',
      commerce: 'Торговля',
      sport: 'Спорт',
      creative: 'Креатив',
      photography: 'Фотография',
      consulting: 'Консалтинг',
      freelance: 'Фриланс',
      design: 'Дизайн',
    },
  },
}

const CSS = `
.pf-hero { position:relative; min-height:calc(100vh - 72px); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; overflow:hidden; padding:48px 0 80px; }
.pf-hero__grid { position:absolute; inset:0; background-image:linear-gradient(to right,rgba(128,128,128,0.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(128,128,128,0.08) 1px,transparent 1px); background-size:24px 24px; pointer-events:none; }

@keyframes pf-fadein { from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)} }
@keyframes pf-bounce { 0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)} }

.pf-hero__eyebrow { animation:pf-fadein .6s ease both; animation-delay:.1s; }
.pf-hero__title   { animation:pf-fadein .6s ease both; animation-delay:.3s; font-family:var(--font-serif-ai); font-size:clamp(44px,6.5vw,84px); line-height:1.18; padding-bottom:.08em; max-width:14ch; margin:18px auto 0; font-weight:400; letter-spacing:-0.02em; }
.pf-hero__sub     { animation:pf-fadein .6s ease both; animation-delay:.45s; color:var(--ai-fg-muted); font-size:18px; line-height:1.6; max-width:520px; margin:22px auto 0; }
.pf-hero__stats   { animation:pf-fadein .6s ease both; animation-delay:.6s; display:flex; justify-content:center; gap:40px; margin-top:36px; flex-wrap:wrap; }
.pf-hero__ctas    { animation:pf-fadein .6s ease both; animation-delay:.55s; display:flex; justify-content:center; gap:12px; margin-top:36px; flex-wrap:wrap; }
.pf-hero__scroll  { animation:pf-fadein .6s ease both,pf-bounce 1.6s ease-in-out 1.6s infinite; position:absolute; bottom:32px; left:50%; transform:translateX(-50%); color:var(--ai-fg-soft); display:flex; flex-direction:column; align-items:center; gap:6px; font-size:11px; letter-spacing:.08em; text-transform:uppercase; }
.pf-hero__scroll svg { opacity:.5; }
.pf-hero__stat-val { font-family:var(--font-serif-ai); font-size:36px; line-height:1; }
.pf-hero__stat-lbl { font-size:12px; letter-spacing:.07em; text-transform:uppercase; color:var(--ai-fg-soft); margin-top:4px; }

.pf-featured { padding:80px 0 40px; }
.pf-featured__label { font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--ai-accent); font-weight:500; margin-bottom:22px; }
.pf-featured__grid { display:grid; grid-template-columns:1fr 1fr; gap:22px; }
@media(max-width:720px){.pf-featured__grid{grid-template-columns:1fr;}}

.pf-card { position:relative; border:1px solid var(--ai-border); border-radius:20px; background:var(--ai-surface); overflow:hidden; display:flex; flex-direction:column; cursor:pointer; text-decoration:none; color:inherit; transition:transform 500ms ease,box-shadow 500ms ease,border-color 280ms cubic-bezier(.2,.7,.2,1); box-shadow:0 1px 0 rgba(10,14,26,0.04),0 14px 40px -20px rgba(10,14,26,0.12); }
.pf-card:hover { transform:translateY(-8px); box-shadow:0 24px 64px -16px rgba(0,0,0,0.14); border-color:color-mix(in srgb,var(--ai-accent) 30%,var(--ai-border)); }
.pf-card__img-wrap { aspect-ratio:16/10; overflow:hidden; background:var(--ai-bg-3); position:relative; }
.pf-card--featured .pf-card__img-wrap { aspect-ratio:16/9; }
.pf-card__img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 700ms ease; }
.pf-card:hover .pf-card__img { transform:scale(1.08); }
.pf-card__cat-badge { position:absolute; top:14px; left:14px; font-size:10px; letter-spacing:.1em; text-transform:uppercase; font-weight:500; padding:5px 10px; border-radius:999px; background:var(--ai-surface); color:var(--ai-accent); border:1px solid var(--ai-border); backdrop-filter:blur(8px); }
.pf-card__body { padding:22px 24px 26px; flex:1; display:flex; flex-direction:column; }
.pf-card__cat { font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--ai-fg-soft); margin-bottom:6px; }
.pf-card__title { font-family:var(--font-serif-ai); font-size:22px; line-height:1.28; font-weight:400; transition:color 160ms cubic-bezier(.2,.7,.2,1); }
.pf-card--featured .pf-card__title { font-size:28px; }
.pf-card:hover .pf-card__title { color:var(--ai-accent); }
.pf-card__desc { color:var(--ai-fg-muted); font-size:14px; line-height:1.58; margin-top:8px; flex:1; }
.pf-card__link { display:inline-flex; align-items:center; gap:6px; margin-top:18px; font-size:13px; font-weight:500; color:var(--ai-accent); text-decoration:none; transition:gap 160ms cubic-bezier(.2,.7,.2,1); }
.pf-card__link:hover { gap:10px; }
.pf-card__link svg { transition:transform 300ms ease; flex-shrink:0; }
.pf-card:hover .pf-card__link svg { transform:translateX(4px); }

.pf-section { padding:40px 0 80px; }
.pf-filters { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:28px; }
.pf-filter { padding:8px 16px; border:1px solid var(--ai-border); border-radius:999px; font-size:13px; color:var(--ai-fg-muted); background:var(--ai-bg-2); cursor:pointer; transition:background 160ms,color 160ms,border-color 160ms; font-family:inherit; }
.pf-filter:hover { border-color:var(--ai-accent); color:var(--ai-accent); }
.pf-filter.is-active { background:var(--ai-fg); color:var(--ai-bg); border-color:var(--ai-fg); }
.pf-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
@media(max-width:1000px){.pf-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:600px){.pf-grid{grid-template-columns:1fr;}}
@keyframes pf-card-in { from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)} }
.pf-card.is-visible { animation:pf-card-in .5s ease both; }

.pf-close { padding:80px 0; border-top:1px solid var(--ai-border); text-align:center; }
.pf-close h2 { font-family:var(--font-serif-ai); font-size:clamp(32px,5vw,56px); line-height:1.2; max-width:16ch; margin:0 auto; font-weight:400; letter-spacing:-0.02em; }
.pf-close p { margin:20px auto 0; color:var(--ai-fg-muted); font-size:17px; line-height:1.7; max-width:500px; }

.eyebrow-pf { font-size:11px; font-weight:500; letter-spacing:.12em; text-transform:uppercase; color:var(--ai-accent); }
`

const FEATURED = [
  { title: 'Overlord Fund', cat: 'investment', desc: 'Investment vehicle management platform. Creation and management of Holdings, Club deals and Funds. Legal, tax and accounting management.', href: 'https://www.overlord.fund/fr', img: '/portfolio/overlord-fund.jpg' },
  { title: 'Le Revenu', cat: 'media', desc: 'French financial magazine specialized in financial investment advice, life insurance, stock market, taxation, real estate.', href: 'https://www.lerevenu.com/', img: '/portfolio/le-revenu.jpg' },
]

const PROJECTS = [
  { title: 'Isla Wedding', desc: 'Wedding photography and planning service.', cat: 'creative', catKey: 'photography', href: 'https://isla-wedding.mindzy.me/', img: '/portfolio/isla-wedding.jpg' },
  { title: 'B2B Consulting', desc: 'Business consulting firm in French Guiana. Accounting support, business creation, strategic management.', cat: 'investment', catKey: 'consulting', href: 'https://b2bconsulting.pro/', img: '/portfolio/b2b-consulting.jpg' },
  { title: 'Equityz', desc: 'Investment club for Antillean-Guyanese entrepreneurs.', cat: 'investment', catKey: 'investment', href: 'https://equityz.fr/', img: '/portfolio/equityz.jpg' },
  { title: 'Ory Avocats', desc: 'Law firm specialized in criminal law, business criminal law and fundamental freedoms.', cat: 'legal', catKey: 'legal', href: 'https://www.ory-avocats.com/', img: '/portfolio/ory-avocats.jpg' },
  { title: 'Ligny Avocat', desc: 'Law office specialized in criminal law and litigation.', cat: 'legal', catKey: 'legal', href: 'https://www.ligny-avocat.com/', img: '/portfolio/ligny-avocat.jpg' },
  { title: 'Pharaonique Official', desc: 'Streetwear clothing brand. Sweatshirts, T-shirts, Sets, Caps. Over 50,000 customers worldwide.', cat: 'commerce', catKey: 'commerce', href: 'https://pharaoniqueofficial.com/', img: '/portfolio/pharaonique-official.jpg' },
  { title: 'Ligaphone Paris', desc: 'Specialized audio and music e-commerce store in Paris.', cat: 'commerce', catKey: 'commerce', href: 'https://ligaphone-paris.myshopify.com/fr', img: '/portfolio/ligaphone-paris.jpg' },
  { title: 'French Is Now', desc: 'Web developer portfolio and Mindzy site creator.', cat: 'creative', catKey: 'freelance', href: 'https://www.frenchisnow.com/', img: '/portfolio/french-is-now.jpg' },
  { title: 'Joplin Designer', desc: 'Graphic designer and art director.', cat: 'creative', catKey: 'design', href: 'https://joplin-designer.mindzy.me/', img: '/portfolio/joplin-designer.jpg' },
  { title: 'Byur Surfing', desc: 'Surf school and surfing lessons by the sea.', cat: 'sport', catKey: 'sport', href: 'https://byur-surfing.mindzy.me/', img: '/portfolio/byur-surfing.jpg' },
  { title: 'Bangla Boxing Stadium', desc: 'Thai boxing and martial arts gym.', cat: 'sport', catKey: 'sport', href: 'http://banglaboxingstadium.com/', img: '/portfolio/banglaboxingstadium.jpg' },
  { title: 'Coach Marchand', desc: 'Sports coach and physical trainer. Personalized programs, individual and group coaching.', cat: 'sport', catKey: 'sport', href: 'https://coach-marchand.mindzy.me/', img: '/portfolio/coach-marchand.jpg' },
  { title: 'Acupuncture Mei', desc: 'Traditional Chinese acupuncture practice. Personalized care and alternative medicine.', cat: 'wellness', catKey: 'wellness', href: 'https://acupuncture-mei.mindzy.me/', img: '/portfolio/acupuncture-mei.jpg' },
  { title: 'Aromatherapist Hélène', desc: 'Certified aromatherapist. Aromatherapy and essential oils consultations.', cat: 'wellness', catKey: 'wellness', href: 'https://aromatherapeute-helene.mindzy.me/', img: '/portfolio/aromatherapie-helene.jpg' },
  { title: 'Art Therapy Camille', desc: 'Art therapist specialized in support through creativity.', cat: 'wellness', catKey: 'wellness', href: 'https://arttherapie-camille.mindzy.me/', img: '/portfolio/art-therapie-camille.jpg' },
  { title: 'Ayurveda Priya', desc: 'Ayurveda practitioner. Consultations, ayurvedic massages and personalized wellness programs.', cat: 'wellness', catKey: 'wellness', href: 'https://ayurveda-priya.mindzy.me/', img: '/portfolio/ayurveda-priya.jpg' },
  { title: 'Chiropractor Thomas', desc: 'Chiropractic office. Back and joint care through spinal adjustments.', cat: 'wellness', catKey: 'wellness', href: 'https://chiropracteur-thomas.mindzy.me/', img: '/portfolio/chiropracteur-thomas.jpg' },
  { title: 'Dietitian Aurélie', desc: 'Registered dietitian-nutritionist. Personalized consultations and nutritional follow-up.', cat: 'wellness', catKey: 'wellness', href: 'https://dieteticienne-aurelie.mindzy.me/', img: '/portfolio/dieteticienne-aurelie.jpg' },
  { title: 'Energy Healer Bresom', desc: 'Energy healing practitioner. Chakra rebalancing and energetic harmonization.', cat: 'wellness', catKey: 'wellness', href: 'https://energeticien-bresom.mindzy.me/', img: '/portfolio/energeticien-bresom.jpg' },
  { title: 'Hypnotherapist Duverne', desc: 'Certified hypnotherapist. Hypnosis for phobias, addictions and self-confidence.', cat: 'wellness', catKey: 'wellness', href: 'https://hypno-duverne.mindzy.me/', img: '/portfolio/hypno-duverne.jpg' },
  { title: 'Hypnosis Nathalie', desc: 'Therapeutic hypnosis practitioner. Specialized in stress management, sleep and well-being.', cat: 'wellness', catKey: 'wellness', href: 'https://hypno-nathalie.mindzy.me/', img: '/portfolio/hypno-nathalie.jpg' },
  { title: 'Kinesiologist Sophie', desc: 'Certified kinesiologist. Body rebalancing, emotional management and holistic support.', cat: 'wellness', catKey: 'wellness', href: 'https://kinesiologue-sophie.mindzy.me/', img: '/portfolio/kine-sophie.jpg' },
  { title: 'Lithotherapist Duval', desc: 'Lithotherapist and crystal specialist. Crystal healing, workshops and training.', cat: 'wellness', catKey: 'wellness', href: 'https://lithotherapeute-duval.mindzy.me/', img: '/portfolio/lithotherapeute-duval.jpg' },
  { title: 'Magnetizer Delacroix', desc: 'Healing magnetizer. Energy healing through magnetism for pain and blockage relief.', cat: 'wellness', catKey: 'wellness', href: 'https://magnetiseur-delacroix.mindzy.me/', img: '/portfolio/magnetiseur-delacroix.jpg' },
  { title: 'Medium Moreau', desc: 'Medium and clairvoyant. Mediumship consultations, spiritual guidance and life coaching.', cat: 'wellness', catKey: 'wellness', href: 'https://medium-moreau.mindzy.me/', img: '/portfolio/medium-moreau.jpg' },
  { title: 'Osteopath Lefebvre', desc: 'Licensed osteopath D.O. Consultations for adults, athletes and infants.', cat: 'wellness', catKey: 'wellness', href: 'https://osteo-lefebvre.mindzy.me/', img: '/portfolio/osteo-lefebvre.jpg' },
  { title: 'Reflexology Manie', desc: 'Certified reflexologist. Foot and hand reflexology for relaxation and tension relief.', cat: 'wellness', catKey: 'wellness', href: 'https://reflexo-manie.mindzy.me/', img: '/portfolio/reflexo-manie.jpg' },
  { title: 'Shiatsu Kenji', desc: 'Traditional Japanese shiatsu practitioner. Digital pressure on meridians.', cat: 'wellness', catKey: 'wellness', href: 'https://shiatsu-kenji.mindzy.me/', img: '/portfolio/shiatsu-kenji.jpg' },
  { title: 'Sophrology Rabiovic', desc: 'Certified sophrologist. Sessions for stress management, mental preparation and relaxation.', cat: 'wellness', catKey: 'wellness', href: 'https://sophro-rabiovic.mindzy.me/', img: '/portfolio/sophro-rabiovic.jpg' },
]

const FILTERS = ['all', 'investment', 'legal', 'wellness', 'media', 'commerce', 'sport', 'creative']

export default function PortfolioPage() {
  const params = useParams()
  const locale = (params?.locale as string) ?? 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  const [activeFilter, setActiveFilter] = useState('all')

  const visible = activeFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === activeFilter)

  // IntersectionObserver for card entrance animations
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          ;(e.target as HTMLElement).style.animationDelay = (i * 0.06) + 's'
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.pf-card').forEach(c => io.observe(c))
    return () => io.disconnect()
  }, [visible]) // re-run when filter changes

  const getCatLabel = (catKey: string) => {
    const labels = t.catLabels as Record<string, string>
    return labels[catKey] ?? catKey
  }

  const getFilterLabel = (f: string) => {
    if (f === 'all') return t.filterAll
    if (f === 'sport') return t.filterSport
    return getCatLabel(f)
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Mindzy — ${t.featuredLabel ?? 'Portfolio'}`,
    url: `https://mindzy.me/${locale}/portfolio`,
    description: 'Selected projects designed and delivered by Mindzy across legal, wellness, commerce, sport, creative, and investment verticals.',
    numberOfItems: PROJECTS.length,
    hasPart: {
      '@type': 'ItemList',
      itemListElement: PROJECTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.title,
          description: p.desc,
          url: p.href,
          image: `https://mindzy.me${p.img}`,
          genre: p.catKey,
        },
      })),
    },
  }

  return (
    <div style={{ background: 'var(--ai-bg)', paddingTop: '72px' }}>
      <JsonLd data={itemListSchema} />
      <JsonLd
        data={jsonLdBreadcrumb([
          { name: 'Mindzy', url: `https://mindzy.me/${locale}` },
          { name: 'Portfolio', url: `https://mindzy.me/${locale}/portfolio` },
        ])}
      />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Hero */}
      <section className="pf-hero">
        <div className="pf-hero__grid" aria-hidden="true" />
        <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8" style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow-pf pf-hero__eyebrow">{t.eyebrow}</div>
          <h1 className="pf-hero__title">{t.title}</h1>
          <p className="pf-hero__sub">{t.subtitle}</p>
          <div className="pf-hero__stats">
            <div>
              <div className="pf-hero__stat-val">34</div>
              <div className="pf-hero__stat-lbl">{t.statProjects}</div>
            </div>
            <div style={{ width: '1px', background: 'var(--ai-border)', flexShrink: 0 }} />
            <div>
              <div className="pf-hero__stat-val">12</div>
              <div className="pf-hero__stat-lbl">{t.statIndustries}</div>
            </div>
          </div>
          <div className="pf-hero__ctas">
            <GlassButton href="https://calendar.app.google/ghE79tSFxmea4Scd9" external>{t.bookCall}</GlassButton>
            <GlassButton href="#projects">
              {t.exploreWork}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
            </GlassButton>
          </div>
        </div>
        <div className="pf-hero__scroll" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* Featured */}
      <section className="pf-featured" id="projects">
        <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="pf-featured__label">{t.featuredLabel}</div>
          <div className="pf-featured__grid">
            {FEATURED.map(p => {
              const catLabel = getCatLabel(p.cat)
              return (
                <a key={p.title} className="pf-card pf-card--featured is-visible" href={p.href} target="_blank" rel="noopener" data-cat={p.cat}>
                  <div className="pf-card__img-wrap">
                    <Image className="pf-card__img" src={p.img} alt={p.title} fill sizes="(max-width:768px) 100vw, 50vw" priority />
                    <span className="pf-card__cat-badge">{catLabel}</span>
                  </div>
                  <div className="pf-card__body">
                    <div className="pf-card__cat">{catLabel}</div>
                    <div className="pf-card__title">{p.title}</div>
                    <p className="pf-card__desc">{p.desc}</p>
                    <span className="pf-card__link">
                      {t.visitSite}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* All projects */}
      <section className="pf-section">
        <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="pf-filters">
            {FILTERS.map(f => (
              <button key={f} className={`pf-filter${activeFilter === f ? ' is-active' : ''}`} onClick={() => setActiveFilter(f)}>
                {getFilterLabel(f)}
              </button>
            ))}
          </div>
          <div className="pf-grid">
            {visible.map(p => {
              const catLabel = getCatLabel(p.catKey)
              return (
                <a key={p.title} className="pf-card" href={p.href} target="_blank" rel="noopener" data-cat={p.cat}>
                  <div className="pf-card__img-wrap">
                    <Image className="pf-card__img" src={p.img} alt={p.title} fill sizes="(max-width:600px) 100vw, (max-width:1000px) 50vw, 33vw" loading="lazy" />
                    <span className="pf-card__cat-badge">{catLabel}</span>
                  </div>
                  <div className="pf-card__body">
                    <div className="pf-card__cat">{catLabel}</div>
                    <div className="pf-card__title">{p.title}</div>
                    <p className="pf-card__desc">{p.desc}</p>
                    <span className="pf-card__link">
                      {t.visitSite}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pf-close">
        <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8">
          <h2>{t.closingTitle} <em style={{ fontStyle: 'italic' }}>{t.closingTitleItalic}</em> {t.closingTitleEnd}</h2>
          <p>{t.closingBody}</p>
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
            <GlassButton href="https://calendar.app.google/ghE79tSFxmea4Scd9" external>{t.bookCallBottom}</GlassButton>
          </div>
        </div>
      </section>
    </div>
  )
}
