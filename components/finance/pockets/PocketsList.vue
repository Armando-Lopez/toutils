<script setup lang="ts">
import { useFinanceStore } from '~/stores/finance'
import PocketInfo from '~/components/finance/pockets/PocketInfo.vue'

const financeStore = useFinanceStore()
</script>

<template>
  <section class="px-4">
    <div class="flex items-center gap-5 mb-4">
      <p class="text-2xl font-semibold">
        Cuentas
      </p>
    </div>
    <AppLoader v-if="financeStore.pockets.isLoading" class="mx-auto" />
    <div v-else-if="financeStore.pockets.data.length" class="flex flex-wrap gap-5">
      <PocketInfo
        v-for="pocket in financeStore.pockets.data"
        :key="pocket.id"
        :pocket="pocket"
      />
    </div>
    <div v-else>
      <p>¡UPS! Tus pantalones están vacíos</p>
      <p class="mb-2">
        Usa el botón para crear un bosillo y comienza el seguimiento de tus finanzas
      </p>
    </div>
  </section>
</template>
