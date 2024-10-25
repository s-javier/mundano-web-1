import { Tabs } from '@kobalte/core/tabs'
import { orderBy } from 'es-toolkit'

import profitabilityDb from '~/db/profitability.db'
import { Afp, FoundType } from '~/enums'
import AfpSort from './_AfpSort'

export default function Profitability() {
  const sort = (period: string, type: string): { afp: Afp; value: number }[] => {
    // @ts-ignore
    const aux = profitabilityDb[0].profitability[period].map((item: any) => ({
      afp: item.afp,
      value: item[type],
    }))
    return orderBy(aux, ['value'], ['desc'])
  }

  return (
    <Tabs aria-label="Main navigation" class="tabs">
      <Tabs.List class="tabs__list">
        <Tabs.Trigger class="tabs__trigger" value="profile">
          Mes: {profitabilityDb[0].titles.month}
        </Tabs.Trigger>
        <Tabs.Trigger class="tabs__trigger" value="dashboard">
          Año: {profitabilityDb[0].titles.currentYear}
        </Tabs.Trigger>
        <Tabs.Trigger class="tabs__trigger" value="settings">
          12 meses: {profitabilityDb[0].titles.twelveMonths}
        </Tabs.Trigger>
        <Tabs.Indicator class="tabs__indicator" />
      </Tabs.List>

      <Tabs.Content class="tabs__content" value="profile">
        <p class="mb-6">Resultados ordenados de mayor a menor rentabilidad.</p>
        <div class="grid grid-cols-10 gap-x-12 gap-y-6">
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo A</h3>
            <AfpSort list={sort('month', FoundType.A)} />
          </div>
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo B</h3>
            <AfpSort list={sort('month', FoundType.B)} />
          </div>
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo C</h3>
            <AfpSort list={sort('month', FoundType.C)} />
          </div>
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo D</h3>
            <AfpSort list={sort('month', FoundType.D)} />
          </div>
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo E</h3>
            <AfpSort list={sort('month', FoundType.E)} />
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content class="tabs__content" value="dashboard">
        <p class="mb-6">Resultados ordenados de mayor a menor rentabilidad.</p>
        <div class="grid grid-cols-10 gap-x-12 gap-y-6">
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo A</h3>
            <AfpSort list={sort('currentYear', FoundType.A)} />
          </div>
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo B</h3>
            <AfpSort list={sort('currentYear', FoundType.B)} />
          </div>
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo C</h3>
            <AfpSort list={sort('currentYear', FoundType.C)} />
          </div>
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo D</h3>
            <AfpSort list={sort('currentYear', FoundType.D)} />
          </div>
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo E</h3>
            <AfpSort list={sort('currentYear', FoundType.E)} />
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content class="tabs__content" value="settings">
        <p class="mb-6">Resultados ordenados de mayor a menor rentabilidad.</p>
        <div class="grid grid-cols-10 gap-x-12 gap-y-6">
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo A</h3>
            <AfpSort list={sort('twelveMonths', FoundType.A)} />
          </div>
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo B</h3>
            <AfpSort list={sort('twelveMonths', FoundType.B)} />
          </div>
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo C</h3>
            <AfpSort list={sort('twelveMonths', FoundType.C)} />
          </div>
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo D</h3>
            <AfpSort list={sort('twelveMonths', FoundType.D)} />
          </div>
          <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo E</h3>
            <AfpSort list={sort('twelveMonths', FoundType.E)} />
          </div>
        </div>
      </Tabs.Content>
    </Tabs>
  )
}
