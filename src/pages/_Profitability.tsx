import { createSignal, For, Show } from 'solid-js'
import { Tabs } from '@kobalte/core/tabs'
import { FormControl, InputLabel, MenuItem, Select } from '@suid/material'
import { orderBy } from 'es-toolkit'

import profitabilityDb from '~/db/profitability.db'
import { Afp, FoundType } from '~/enums'
import LogoCuprum from '~/components/svg/LogoCuprum'
import LogoModelo from '~/components/svg/LogoModelo'
import LogoHabitat from '~/components/svg/LogoHabitat'
import LogoProVida from '~/components/svg/LogoProVida'
import LogoUno from '~/components/svg/LogoUno'
import LogoPlanVital from '~/components/svg/LogoPlanVital'
import LogoCapital from '~/components/svg/LogoCapital'
import MyIcon from '~/assets/svg/logo-capital.svg?component-solid'

export default function Profitability() {
  const [typeFound, setTypeFound] = createSignal('')
  const [sort, setSort] = createSignal<any[]>([])

  const monthA = () => {
    const list: any[] = []
    const aux = profitabilityDb[0].profitability.month.map((item: any) => ({
      afp: item.afp,
      value: item[FoundType.A],
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
        <div class="grid grid-cols-10 gap-x-4">
          <div class="col-span-2">
            <h3 class="font-semibold text-lg">Fondo A</h3>
            <For each={monthA()}>
              {(item, index) => (
                <div class="flex flex-row items-center gap-3 mb-2">
                  <div class="font-bold text-gray-400 text-xl">{index() + 1}°</div>
                  <Show when={item.afp === Afp.CAPITAL}>
                    <LogoCapital />
                  </Show>
                  <Show when={item.afp === Afp.CUPRUM}>
                    <LogoCuprum />
                  </Show>
                  <Show when={item.afp === Afp.HABITAT}>
                    <LogoHabitat />
                  </Show>
                  <Show when={item.afp === Afp.MODELO}>
                    <LogoModelo />
                  </Show>
                  <Show when={item.afp === Afp.PLANVITAL}>
                    <LogoPlanVital />
                  </Show>
                  <Show when={item.afp === Afp.PROVIDA}>
                    <LogoProVida />
                  </Show>
                  <Show when={item.afp === Afp.UNO}>
                    <LogoUno />
                  </Show>
                  <div>{item.value}%</div>
                </div>
              )}
            </For>
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg">Fondo B</h3>
            <MyIcon />
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg">Fondo C</h3>
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg">Fondo D</h3>
          </div>
          <div class="col-span-2">
            <h3 class="font-semibold text-lg">Fondo E</h3>
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content class="tabs__content" value="dashboard">
        <p>Resultados ordenados de rentabilidad de mayor a menor:</p>
      </Tabs.Content>
      <Tabs.Content class="tabs__content" value="settings">
        <p>Resultados ordenados de rentabilidad de mayor a menor:</p>
      </Tabs.Content>
    </Tabs>
  )
}
