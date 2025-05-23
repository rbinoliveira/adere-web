import { Plus } from 'lucide-react'

import { UI } from '@/application/shared/components'

export default function Medicines() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-[1.9375rem] font-bold leading-[1.19]">Medicines</h1>
      <div className="flex items-center gap-6">
        <UI.Button variant="secondary">View Etalage</UI.Button>
        <UI.Button variant="secondary">Set at once</UI.Button>
        <UI.Button>
          Products
          <Plus />
        </UI.Button>
      </div>
    </div>
  )
}
