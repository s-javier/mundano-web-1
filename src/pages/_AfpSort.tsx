import { For, Show } from 'solid-js'

import { Afp } from '~/enums'
// @ts-ignore
import LogoCapital from '~/assets/svg/logo-capital.svg?component-solid'
// @ts-ignore
import LogoCuprum from '~/assets/svg/logo-cuprum.svg?component-solid'
// @ts-ignore
import LogoModelo from '~/assets/svg/logo-modelo.svg?component-solid'
// @ts-ignore
import LogoHabitat from '~/assets/svg/logo-habitat.svg?component-solid'
// @ts-ignore
import LogoPlanVital from '~/assets/svg/logo-planvital.svg?component-solid'
// @ts-ignore
import LogoProVida from '~/assets/svg/logo-provida.svg?component-solid'
// @ts-ignore
import LogoUno from '~/assets/svg/logo-uno.svg?component-solid'

export default function AfpSort(props: { list: { afp: Afp; value: number }[] }) {
  return (
    <For each={props.list}>
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
            <LogoPlanVital class="bg-red-600" />
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
  )
}
