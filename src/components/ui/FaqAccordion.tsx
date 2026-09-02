import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import clsx from 'clsx'
import { RevealItem } from './Reveal'

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-larimar-100 rounded-2xl border border-larimar-100 bg-white shadow-sm">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <RevealItem key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display text-base font-semibold text-larimar-950 sm:text-lg">{item.q}</span>
              <ChevronDown
                size={20}
                className={clsx('shrink-0 text-amber-500 transition-transform duration-300', isOpen && 'rotate-180')}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-larimar-700/80 sm:text-base">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </RevealItem>
        )
      })}
    </div>
  )
}
