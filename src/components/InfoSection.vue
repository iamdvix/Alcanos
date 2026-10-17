<script setup>
import { ref } from 'vue'
import StructureView from './StructureView.vue'
import PixelBar from './PixelBar.vue'

const tabs = [
  { id: 'que', label: 'Qué son', on: 'btn-mana' },
  { id: 'nomenclatura', label: 'Nomenclatura', on: 'btn-slime' },
  { id: 'tabla', label: 'Tabla de alcanos', on: 'btn-aqua' },
  { id: 'usos', label: 'Propiedades y usos', on: 'btn-blossom' },
]
const tab = ref('que')

const names = ['Metano', 'Etano', 'Propano', 'Butano', 'Pentano', 'Hexano', 'Heptano', 'Octano', 'Nonano', 'Decano']
const boiling = [-161.5, -88.6, -42.1, -0.5, 36.1, 68.7, 98.4, 125.7, 150.8, 174.1]
const isomers = [1, 1, 1, 2, 3, 5, 9, 18, 35, 75]
const rows = names.map((name, i) => ({
  name,
  formula: `C${i + 1}H${2 * (i + 1) + 2}`,
  gas: i < 4,
  bp: boiling[i],
  iso: isomers[i],
}))

const steps = [
  'Identifica la cadena continua de carbonos más larga: es la cadena principal.',
  'Numera la cadena desde el extremo que dé los números más bajos a las ramificaciones.',
  'Nombra cada ramificación (metil, etil) y anota el número del carbono donde se une.',
  'Si una ramificación se repite, usa los prefijos di, tri o tetra.',
  'Ordena las ramificaciones alfabéticamente. Los prefijos di y tri no cuentan para ordenar.',
  'Escribe: localizadores, nombres de ramificaciones y al final el nombre de la cadena principal.',
]
const stepColors = ['bg-mana', 'bg-slime', 'bg-aqua', 'bg-blossom', 'bg-gold', 'bg-mana']
const example = { n: 5, subs: [{ p: 2, t: 'm' }, { p: 3, t: 'e' }] }
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold sm:text-4xl">Grimorio de los alcanos</h1>
    <div class="mt-3"><PixelBar /></div>

    <div class="mt-5 flex flex-wrap gap-3">
      <button v-for="t in tabs" :key="t.id" class="btn" :class="tab === t.id && t.on" @click="tab = t.id">{{ t.label }}</button>
    </div>

    <div class="card card-mana mt-6">
      <div class="strip bg-mana"><span>{{ tabs.find((t) => t.id === tab).label }}</span></div>
      <div class="p-4 sm:p-8">
        <div v-if="tab === 'que'" class="space-y-5">
          <p class="text-lg">
            Los alcanos son hidrocarburos saturados: están formados solo por carbono e hidrógeno y todos sus enlaces son
            simples. También se les llama parafinas y son la base de la química orgánica.
          </p>
          <div class="border-4 border-ink bg-mana p-4 text-center text-2xl font-bold text-white shadow-[4px_4px_0_0_#1f1b2e]">
            Fórmula general: C<sub>n</sub>H<sub>2n+2</sub>
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            <div class="border-4 border-mana bg-mana/10 p-4">
              <h3 class="font-bold">Enlaces simples</h3>
              <p class="mt-1 text-ink/80">Cada carbono forma cuatro enlaces sencillos, por eso se dice que están saturados.</p>
            </div>
            <div class="border-4 border-slime bg-slime/10 p-4">
              <h3 class="font-bold">Geometría tetraédrica</h3>
              <p class="mt-1 text-ink/80">Los carbonos tienen hibridación sp3 y ángulos de enlace cercanos a 109,5 grados.</p>
            </div>
            <div class="border-4 border-aqua bg-aqua/10 p-4">
              <h3 class="font-bold">Isomería</h3>
              <p class="mt-1 text-ink/80">Desde el butano existen isómeros: misma fórmula, distinta disposición de los carbonos.</p>
            </div>
          </div>
        </div>

        <div v-else-if="tab === 'nomenclatura'" class="space-y-5">
          <p class="text-lg">Sigue estos pasos del sistema IUPAC para nombrar cualquier alcano ramificado.</p>
          <ol class="space-y-3">
            <li v-for="(st, i) in steps" :key="i" class="flex gap-3">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center border-4 border-ink font-bold text-white" :class="stepColors[i]">{{ i + 1 }}</span>
              <span class="pt-1">{{ st }}</span>
            </li>
          </ol>
          <div class="border-4 border-blossom bg-blossom/10 p-4">
            <h3 class="font-bold">Ejemplo: 3-etil-2-metilpentano</h3>
            <StructureView :spec="example" show-numbers />
            <p class="text-ink/80">Cadena principal de 5 carbonos. El metilo está en C2 y el etilo en C3. Se ordena etil antes que metil.</p>
          </div>
        </div>

        <div v-else-if="tab === 'tabla'" class="overflow-x-auto">
          <table class="w-full min-w-[540px] text-left">
            <thead>
              <tr class="bg-ink text-white">
                <th class="py-2 pr-4 pl-3">Nombre</th>
                <th class="py-2 pr-4">Fórmula</th>
                <th class="py-2 pr-4">Estado a 25 C</th>
                <th class="py-2 pr-4">Ebullición (C)</th>
                <th class="py-2 pr-3">Isómeros</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in rows" :key="r.name" :class="i % 2 ? 'bg-mana/10' : 'bg-aqua/10'">
                <td class="py-2 pr-4 pl-3 font-bold">{{ r.name }}</td>
                <td class="py-2 pr-4">{{ r.formula }}</td>
                <td class="py-2 pr-4">
                  <span class="tag" :class="r.gas ? '!bg-aqua !text-white' : '!bg-slime !text-white'">{{ r.gas ? 'Gas' : 'Líquido' }}</span>
                </td>
                <td class="py-2 pr-4">{{ r.bp }}</td>
                <td class="py-2 pr-3">{{ r.iso }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="space-y-5">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="border-4 border-gold bg-gold/10 p-4">
              <h3 class="font-bold">Propiedades físicas</h3>
              <ul class="mt-2 list-disc space-y-1 pl-5 text-ink/80">
                <li>Son apolares y casi insolubles en agua.</li>
                <li>Son menos densos que el agua.</li>
                <li>El punto de ebullición aumenta con el tamaño de la cadena.</li>
                <li>Las ramificaciones bajan el punto de ebullición.</li>
              </ul>
            </div>
            <div class="border-4 border-mana bg-mana/10 p-4">
              <h3 class="font-bold">Reactividad</h3>
              <p class="mt-2 text-ink/80">Son poco reactivos. Su reacción más importante es la combustión, que libera energía:</p>
              <p class="mt-2 font-bold">CH<sub>4</sub> + 2 O<sub>2</sub> &rarr; CO<sub>2</sub> + 2 H<sub>2</sub>O</p>
            </div>
          </div>
          <div class="border-4 border-slime bg-slime/10 p-4">
            <h3 class="font-bold">Usos</h3>
            <ul class="mt-2 list-disc space-y-1 pl-5 text-ink/80">
              <li>Metano: principal componente del gas natural.</li>
              <li>Propano y butano: gas licuado para cocinar y calefacción.</li>
              <li>Pentano a octano: componentes de la gasolina.</li>
              <li>Cadenas largas: parafinas, ceras y lubricantes.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
