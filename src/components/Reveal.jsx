import { useInView } from '../hooks/useInView'

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, visible] = useInView()
  return (
    <Tag
      ref={ref}
      className={`fade-up ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function SectionHead({ label, title, subtitle, center = false, children }) {
  return (
    <Reveal className={`section-head ${center ? 'center' : ''}`}>
      {label && <div className="label">{label}</div>}
      <h2 className="title">{title}</h2>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {children}
    </Reveal>
  )
}
