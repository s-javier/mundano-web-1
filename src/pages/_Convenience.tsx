import { Tabs } from '@kobalte/core/tabs'
import { orderBy } from 'es-toolkit'
import { add, chain, divide, multiply, pow, round, subtract } from 'mathjs'

import profitabilityDb from '~/db/profitability.db'
import { Afp, AfpCommission, FoundType } from '~/enums'
import AfpSort from './_AfpSort'

export default function Profitability() {
  const sortWithCommission = (period: string, type: string): { afp: Afp; value: number }[] => {
    // @ts-ignore
    const aux = profitabilityDb[0].profitability[period].map((item: any) => {
      const months =
        period === 'month'
          ? 1
          : period === 'twelveMonths'
            ? 12
            : profitabilityDb[0].monthsOfTheCurrentYear
      let c: number = 0
      switch (item.afp) {
        case Afp.CAPITAL:
          c = AfpCommission.CAPITAL
          break
        case Afp.CUPRUM:
          c = AfpCommission.CUPRUM
          break
        case Afp.HABITAT:
          c = AfpCommission.HABITAT
          break
        case Afp.MODELO:
          c = AfpCommission.MODELO
          break
        case Afp.PLANVITAL:
          c = AfpCommission.PLANVITAL
          break
        case Afp.PROVIDA:
          c = AfpCommission.PROVIDA
          break
        case Afp.UNO:
          c = AfpCommission.UNO
          break
        default:
          break
      }
      c = divide(c, 100)
      const r = divide(item[type], 100)
      // const value = chain(3).add(4).multiply(2).done()
      // const value = subtract(
      //   multiply(0.1, pow(subtract(pow(add(1, r), divide(1, months)), 1), months)),
      //   multiply(months, add(0.1, c)),
      // )
      const j = subtract(pow(add(1, r), divide(1, months)), 1)
      const value = subtract(multiply(0.1, months, r), multiply(months, add(0.1, c)))
      // console.log(item.afp, period, item[type])
      // console.log('months', months)
      // console.log('comisión', c)
      // console.log('rentabilidad', r)
      // console.log('beneficio', value)
      return {
        afp: item.afp,
        // @ts-ignore
        value: round(multiply(value, 100), 2),
      }
    })
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
        <div class="grid grid-cols-10 gap-x-12">
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo A</h3>
            <AfpSort list={sortWithCommission('month', FoundType.A)} />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo B</h3>
            <AfpSort list={sortWithCommission('month', FoundType.B)} />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo C</h3>
            <AfpSort list={sortWithCommission('month', FoundType.C)} />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo D</h3>
            <AfpSort list={sortWithCommission('month', FoundType.D)} />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo E</h3>
            <AfpSort list={sortWithCommission('month', FoundType.E)} />
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content class="tabs__content" value="dashboard">
        <p class="mb-6">Resultados ordenados de mayor a menor rentabilidad.</p>
        <div class="grid grid-cols-10 gap-x-12">
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo A</h3>
            <AfpSort list={sortWithCommission('currentYear', FoundType.A)} />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo B</h3>
            <AfpSort list={sortWithCommission('currentYear', FoundType.B)} />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo C</h3>
            <AfpSort list={sortWithCommission('currentYear', FoundType.C)} />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo D</h3>
            <AfpSort list={sortWithCommission('currentYear', FoundType.D)} />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo E</h3>
            <AfpSort list={sortWithCommission('currentYear', FoundType.E)} />
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content class="tabs__content" value="settings">
        <p class="mb-6">Resultados ordenados de mayor a menor rentabilidad.</p>
        <div class="grid grid-cols-10 gap-x-12">
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo A</h3>
            <AfpSort list={sortWithCommission('twelveMonths', FoundType.A)} />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo B</h3>
            <AfpSort list={sortWithCommission('twelveMonths', FoundType.B)} />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo C</h3>
            <AfpSort list={sortWithCommission('twelveMonths', FoundType.C)} />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo D</h3>
            <AfpSort list={sortWithCommission('twelveMonths', FoundType.D)} />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg mb-4">Fondo E</h3>
            <AfpSort list={sortWithCommission('twelveMonths', FoundType.E)} />
          </div>
        </div>
      </Tabs.Content>
    </Tabs>
  )
}
