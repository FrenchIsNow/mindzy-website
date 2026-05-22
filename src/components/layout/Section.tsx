interface SectionProps {
  children: React.ReactNode
  className?: string
  tight?: boolean
  id?: string
  as?: React.ElementType
}

export function Section({ children, className, tight = false, id, as: Tag = 'section' }: SectionProps) {
  const paddingClass = tight ? 'py-12 sm:py-16 lg:py-24' : 'py-16 sm:py-24 lg:py-[120px]'
  const allClasses = [paddingClass, 'relative', className].filter(Boolean).join(' ')

  return (
    <Tag id={id} className={allClasses}>
      {children}
    </Tag>
  )
}

export default Section
