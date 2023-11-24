<template>
  <div class="h-full overflow-hidden flex flex-col">
    <muscle-menu />
    <muscle-header class="h-1/10 border-b flex items-center justify-center" />
    <div class="overflow-y-auto">
      <slot />
    </div>
  </div>
</template>
