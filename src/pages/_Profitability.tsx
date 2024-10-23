import { createSignal, For } from 'solid-js'
import { Tabs } from '@kobalte/core/tabs'
import { FormControl, InputLabel, MenuItem, Select } from '@suid/material'
import { orderBy } from 'es-toolkit'

import profitabilityDb from '~/db/profitability.db'
import typeFoundDb from '~/db/type-found.db'

export default function Profitability() {
  const [typeFound, setTypeFound] = createSignal('')
  const [sort, setSort] = createSignal<any[]>([])

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
        <FormControl fullWidth>
          <InputLabel>Fondo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={typeFound()}
            label="Age"
            onChange={(e) => {
              setSort([])
              const typeFound = e.target.value
              const list: any[] = []

              profitabilityDb[0].profitability.month.forEach((item: any) => {
                list.push({
                  afp: item.afp,
                  value: item[typeFound],
                })
              })
              setSort(orderBy(list, ['value'], ['desc']))
              console.log(sort())
            }}
          >
            <For each={typeFoundDb}>
              {(item) => <MenuItem value={item.value}>{item.title}</MenuItem>}
            </For>
          </Select>
        </FormControl>
        <p class="pt-4">Resultados ordenados de rentabilidad de mayor a menor:</p>
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
