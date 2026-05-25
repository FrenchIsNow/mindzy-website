"use client"

import React, { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Plane, Sphere } from "@react-three/drei"
import { Download, Heart, X } from "lucide-react"

/* =========================
   Translations
   ========================= */

const TRANSLATIONS = {
  en: {
    eyebrow: "AI Employee as a Service",
    title: "Our AI employee platform is",
    titleItalic: "in development.",
    description:
      "Mindzy is building a dedicated platform to help companies create and deploy custom AI employees for real business roles. Designed around your tools, your workflows, and your governance rules.",
    joinWaitingList: "Join the Waiting List",
    hint: "Drag to explore · Scroll to zoom · Click cards to preview",
    download: "Download",
  },
  fr: {
    eyebrow: "AI Employee as a Service",
    title: "Notre plateforme d'employés IA est",
    titleItalic: "en développement.",
    description:
      "Mindzy développe une plateforme dédiée pour aider les entreprises à créer et déployer des employés IA personnalisés pour de véritables rôles métier. Conçue autour de vos outils, vos workflows et vos règles de gouvernance.",
    joinWaitingList: "Rejoindre la liste d'attente",
    hint: "Glisser pour explorer · Scroll pour zoomer · Cliquer pour prévisualiser",
    download: "Télécharger",
  },
  es: {
    eyebrow: "AI Employee as a Service",
    title: "Nuestra plataforma de empleados IA está",
    titleItalic: "en desarrollo.",
    description:
      "Mindzy está construyendo una plataforma dedicada para ayudar a las empresas a crear e implementar empleados de IA personalizados para roles empresariales reales. Diseñada en torno a tus herramientas, flujos de trabajo y reglas de gobernanza.",
    joinWaitingList: "Unirse a la lista de espera",
    hint: "Arrastra para explorar · Scroll para hacer zoom · Clic en las tarjetas para previsualizar",
    download: "Descargar",
  },
  de: {
    eyebrow: "AI Employee as a Service",
    title: "Unsere KI-Mitarbeiter-Plattform ist",
    titleItalic: "in Entwicklung.",
    description:
      "Mindzy entwickelt eine dedizierte Plattform, die Unternehmen dabei hilft, maßgeschneiderte KI-Mitarbeiter für echte Geschäftsrollen zu erstellen und einzusetzen. Entwickelt rund um Ihre Tools, Workflows und Governance-Regeln.",
    joinWaitingList: "Warteliste beitreten",
    hint: "Ziehen zum Erkunden · Scrollen zum Zoomen · Karten klicken zum Vorschauen",
    download: "Herunterladen",
  },
  it: {
    eyebrow: "AI Employee as a Service",
    title: "La nostra piattaforma di dipendenti IA è",
    titleItalic: "in sviluppo.",
    description:
      "Mindzy sta costruendo una piattaforma dedicata per aiutare le aziende a creare e distribuire dipendenti IA personalizzati per ruoli aziendali reali. Progettata attorno ai tuoi strumenti, flussi di lavoro e regole di governance.",
    joinWaitingList: "Iscriviti alla lista d'attesa",
    hint: "Trascina per esplorare · Scorri per zoomare · Clicca le schede per l'anteprima",
    download: "Scarica",
  },
  pt: {
    eyebrow: "AI Employee as a Service",
    title: "A nossa plataforma de funcionários IA está",
    titleItalic: "em desenvolvimento.",
    description:
      "A Mindzy está a construir uma plataforma dedicada para ajudar as empresas a criar e implementar funcionários de IA personalizados para funções empresariais reais. Desenhada em torno das suas ferramentas, fluxos de trabalho e regras de governação.",
    joinWaitingList: "Juntar-se à lista de espera",
    hint: "Arraste para explorar · Role para aproximar · Clique nos cartões para pré-visualizar",
    download: "Descarregar",
  },
  ar: {
    eyebrow: "موظف الذكاء الاصطناعي كخدمة",
    title: "منصة موظفي الذكاء الاصطناعي لدينا",
    titleItalic: "قيد التطوير.",
    description:
      "تبني Mindzy منصة مخصصة لمساعدة الشركات على إنشاء ونشر موظفي ذكاء اصطناعي مخصصين لأدوار الأعمال الحقيقية. مُصمَّمة حول أدواتك وسير عملك وقواعد الحوكمة الخاصة بك.",
    joinWaitingList: "انضم إلى قائمة الانتظار",
    hint: "اسحب للاستكشاف · مرر للتكبير · انقر على البطاقات للمعاينة",
    download: "تحميل",
  },
  zh: {
    eyebrow: "AI 员工即服务",
    title: "我们的 AI 员工平台",
    titleItalic: "正在开发中。",
    description:
      "Mindzy 正在构建一个专用平台，帮助企业为真实业务岗位创建和部署定制化 AI 员工。平台围绕您的工具、工作流程和治理规则进行设计。",
    joinWaitingList: "加入等待名单",
    hint: "拖动探索 · 滚动缩放 · 点击卡片预览",
    download: "下载",
  },
  ja: {
    eyebrow: "AI Employee as a Service",
    title: "私たちの AI 従業員プラットフォームは",
    titleItalic: "開発中です。",
    description:
      "Mindzy は、企業が実際のビジネスロール向けにカスタム AI 従業員を作成・展開できる専用プラットフォームを構築しています。あなたのツール、ワークフロー、ガバナンスルールを中心に設計されています。",
    joinWaitingList: "ウェイティングリストに参加する",
    hint: "ドラッグして探索 · スクロールでズーム · カードをクリックしてプレビュー",
    download: "ダウンロード",
  },
  ru: {
    eyebrow: "AI-сотрудник как услуга",
    title: "Наша платформа AI-сотрудников",
    titleItalic: "находится в разработке.",
    description:
      "Mindzy создаёт специализированную платформу, которая поможет компаниям создавать и развёртывать кастомных AI-сотрудников для реальных бизнес-ролей. Разработана вокруг ваших инструментов, рабочих процессов и правил управления.",
    joinWaitingList: "Присоединиться к списку ожидания",
    hint: "Перетащите для просмотра · Прокрутите для масштабирования · Кликните карточки для предпросмотра",
    download: "Скачать",
  },
}

/* =========================
   Card data (matches static site galaxy-gallery.js)
   ========================= */

type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
}

const CARDS: Card[] = [
  { id: "1",  imageUrl: "/ai-employee/01.png", alt: "AI Strategy",      title: "AI Strategy" },
  { id: "2",  imageUrl: "/ai-employee/02.png", alt: "Intelligence",     title: "Intelligence" },
  { id: "3",  imageUrl: "/ai-employee/03.png", alt: "Machine Learning", title: "Machine Learning" },
  { id: "4",  imageUrl: "/ai-employee/04.png", alt: "Automation",       title: "Automation" },
  { id: "5",  imageUrl: "/ai-employee/05.png", alt: "Neural Networks",  title: "Neural Networks" },
  { id: "6",  imageUrl: "/ai-employee/06.png", alt: "Security",         title: "Security" },
  { id: "7",  imageUrl: "/ai-employee/07.png", alt: "Cloud",            title: "Cloud" },
  { id: "8",  imageUrl: "/ai-employee/08.png", alt: "Digital World",    title: "Digital World" },
  { id: "9",  imageUrl: "/ai-employee/09.png", alt: "Data Streams",     title: "Data Streams" },
  { id: "10", imageUrl: "/ai-employee/10.png", alt: "Leadership",       title: "Leadership" },
  { id: "11", imageUrl: "/ai-employee/11.png", alt: "Business Roles",   title: "Business Roles" },
  { id: "12", imageUrl: "/ai-employee/12.png", alt: "Productivity",     title: "Productivity" },
  { id: "13", imageUrl: "/ai-employee/13.png", alt: "Analytics",        title: "Analytics" },
  { id: "14", imageUrl: "/ai-employee/14.png", alt: "Workflow",         title: "Workflow" },
  { id: "15", imageUrl: "/ai-employee/15.png", alt: "Collaboration",    title: "Collaboration" },
  { id: "16", imageUrl: "/ai-employee/16.png", alt: "Performance",      title: "Performance" },
  { id: "17", imageUrl: "/ai-employee/17.png", alt: "Development",      title: "Development" },
  { id: "18", imageUrl: "/ai-employee/18.png", alt: "Innovation",       title: "Innovation" },
  { id: "19", imageUrl: "/ai-employee/19.png", alt: "Operations",       title: "Operations" },
  { id: "20", imageUrl: "/ai-employee/20.png", alt: "Deployment",       title: "Deployment" },
]

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

function CardProvider({ children }: { children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards: CARDS }}>
      {children}
    </CardContext.Provider>
  )
}

/* =========================
   Starfield background
   ========================= */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 1)
    mount.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 10000
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0 bg-black" />
}

/* =========================
   Floating card
   ========================= */

function FloatingCard({
  card,
  position,
}: {
  card: Card
  position: { x: number; y: number; z: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)
    }
  })

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[4.5, 6]}
        onClick={(e) => { e.stopPropagation(); setSelectedCard(card) }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer" }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = "auto" }}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.22s ease",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="select-none"
          style={{
            width: "160px",
            height: "210px",
            borderRadius: "14px",
            overflow: "hidden",
            background: "#0e0e18",
            border: hovered ? "1px solid rgba(167,139,250,0.65)" : "1px solid rgba(124,58,237,0.22)",
            boxShadow: hovered
              ? "0 0 28px rgba(124,58,237,0.55), 0 12px 40px rgba(0,0,0,0.85)"
              : "0 8px 32px rgba(0,0,0,0.75)",
            padding: "7px 7px 10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.imageUrl}
            alt={card.alt}
            style={{
              width: "100%",
              flex: 1,
              minHeight: 0,
              objectFit: "cover",
              borderRadius: "9px",
              display: "block",
            }}
            loading="lazy"
            draggable={false}
          />
          <p
            style={{
              margin: 0,
              color: "#ddd8f5",
              fontSize: "10px",
              fontWeight: 500,
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "var(--font-instrument-sans), sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            {card.title}
          </p>
        </div>
      </Html>
    </group>
  )
}

/* =========================
   Card modal — matches static site styling
   ========================= */

function CardModal({ downloadLabel }: { downloadLabel: string }) {
  const { selectedCard, setSelectedCard } = useCard()
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    if (!selectedCard) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedCard(null) }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [selectedCard, setSelectedCard])

  if (!selectedCard) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) setSelectedCard(null) }}
    >
      <div
        className="relative w-full"
        style={{
          maxWidth: "360px",
          background: "#0e0e18",
          border: "1px solid rgba(124, 58, 237, 0.3)",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "0 40px 100px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <button
          aria-label="Close"
          onClick={() => setSelectedCard(null)}
          style={{
            position: "absolute",
            top: "-44px",
            right: 0,
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            padding: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X className="w-5 h-5" />
        </button>

        <div
          style={{
            width: "100%",
            aspectRatio: "3 / 4",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "16px",
            background: "#1a1a2e",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedCard.imageUrl}
            alt={selectedCard.alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-instrument-serif), serif",
            fontSize: "20px",
            color: "#fff",
            textAlign: "center",
            margin: "0 0 16px",
            letterSpacing: "-0.01em",
          }}
        >
          {selectedCard.title}
        </h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              height: "40px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "var(--font-instrument-sans), sans-serif",
              cursor: "pointer",
              border: "none",
              background: "#7c3aed",
              color: "#fff",
              transition: "background 0.18s ease, transform 0.14s ease",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "#6d28d9" }}
            onMouseOut={(e) => { e.currentTarget.style.background = "#7c3aed" }}
          >
            <Download className="w-[15px] h-[15px]" strokeWidth={1.8} />
            {downloadLabel}
          </button>
          <button
            type="button"
            aria-label="Favourite"
            onClick={() => setIsFavorited((v) => !v)}
            style={{
              flex: "0 0 40px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
              borderRadius: "10px",
              cursor: "pointer",
              border: "none",
              background: "#7c3aed",
              color: "#fff",
              transition: "background 0.18s ease",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "#6d28d9" }}
            onMouseOut={(e) => { e.currentTarget.style.background = "#7c3aed" }}
          >
            <Heart className="w-[15px] h-[15px]" strokeWidth={1.8} fill={isFavorited ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Card galaxy — Fibonacci sphere
   ========================= */

function CardGalaxy() {
  const { cards } = useCard()

  const cardPositions = useMemo(() => {
    const positions: { x: number; y: number; z: number }[] = []
    const numCards = cards.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      const layerRadius = 12 + (i % 3) * 4

      positions.push({ x: x * layerRadius, y: y * layerRadius, z: z * layerRadius })
    }
    return positions
  }, [cards.length])

  return (
    <>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#7c3aed" transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#7c3aed" transparent opacity={0.03} wireframe />
      </Sphere>
      <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#7c3aed" transparent opacity={0.02} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  )
}

/* =========================
   Page
   ========================= */

export default function AIEmployeePage() {
  const params = useParams<{ locale: string }>()
  const locale = (params?.locale as string) || "en"
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en
  const waitingListHref = `/${locale}/waiting-list`

  return (
    <CardProvider>
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "100vh", minHeight: "600px", background: "#000" }}
      >
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
          onCreated={({ gl }) => { gl.domElement.style.pointerEvents = "auto" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <CardGalaxy />
            <OrbitControls
              enablePan={false}
              enableZoom
              enableRotate
              minDistance={5}
              maxDistance={40}
              autoRotate
              autoRotateSpeed={0.45}
              rotateSpeed={0.4}
              zoomSpeed={1.0}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        {/* Centred glass overlay — title + button */}
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
          style={{ padding: "24px", pointerEvents: "none" }}
        >
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              padding: "40px 52px 44px",
              borderRadius: "24px",
              background: "rgba(0, 0, 0, 0.45)",
              backdropFilter: "saturate(1.2) blur(18px)",
              WebkitBackdropFilter: "saturate(1.2) blur(18px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 8px 40px rgba(0, 0, 0, 0.5)",
              maxWidth: "580px",
              width: "100%",
            }}
          >
            <div
              style={{
                color: "#a78bfa",
                letterSpacing: "0.13em",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {t.eyebrow}
            </div>
            <h1
              style={{
                fontFamily: "var(--font-instrument-serif), serif",
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
                color: "#fff",
                margin: 0,
                maxWidth: "16ch",
              }}
            >
              {t.title}{" "}
              <em style={{ fontStyle: "italic", color: "#c4b5fd" }}>{t.titleItalic}</em>
            </h1>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(255, 255, 255, 0.62)",
                maxWidth: "44ch",
                margin: 0,
              }}
            >
              {t.description}
            </p>

            <div style={{ pointerEvents: "auto", marginTop: "4px", position: "relative", display: "inline-block" }}>
              <Link
                href={waitingListHref}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 26px",
                  borderRadius: "9999px",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  background: "rgba(124, 58, 237, 0.75)",
                  border: "1px solid rgba(167, 139, 250, 0.45)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 20px rgba(124,58,237,0.4), 0 1px 3px rgba(0,0,0,0.3)",
                  textDecoration: "none",
                  transition: "background 0.2s ease, box-shadow 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(124, 58, 237, 0.92)"
                  e.currentTarget.style.boxShadow =
                    "inset 0 1px 0 rgba(255,255,255,0.28), 0 6px 28px rgba(124,58,237,0.6), 0 1px 4px rgba(0,0,0,0.3)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(124, 58, 237, 0.75)"
                  e.currentTarget.style.boxShadow =
                    "inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 20px rgba(124,58,237,0.4), 0 1px 3px rgba(0,0,0,0.3)"
                }}
              >
                {t.joinWaitingList}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </Link>
            </div>

            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.06em",
                color: "rgba(255, 255, 255, 0.3)",
                textTransform: "uppercase",
                marginTop: "8px",
              }}
            >
              {t.hint}
            </p>
          </div>
        </div>

        <CardModal downloadLabel={t.download} />
      </section>
    </CardProvider>
  )
}
