<template>
  <div class="text-xl h-full col mx-7">
    <div class="col items-center justify-center flex-1">
      <img src="/logo.png" alt="MUSCLE">
    </div>
    <div class="flex-1">
      <slot />
    </div>
    <div class="mt-auto py-4 text-lg text-center">
      <slot name="footer" />
    </div>
  </div>
</template>
