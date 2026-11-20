import type { ReactNode } from 'react'

export function SectionTitle({ kicker, title, as: Tag = 'h2' }: { kicker?: string; title: ReactNode; as?: 'h2' | 'h3' }) {
  return (
    <div className="flex flex-col gap-2">
      {kicker && <span className="kicker">{kicker}</span>}
      <Tag className="h2">{title}</Tag>
    </div>
  )
}
