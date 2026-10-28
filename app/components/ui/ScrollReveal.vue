<template>
  <div
    data-reveal="visible"
    class="reveal transition-[opacity,transform] duration-600 ease-[ease] data-[reveal=pending]:transition-none data-[reveal=instant]:transition-none motion-safe:data-[reveal=pending]:[transform:translateY(20px)] motion-safe:data-[reveal=pending]:opacity-0 motion-reduce:transition-none print:transform-none! print:opacity-100! print:transition-none"
  >
    <slot />
  </div>
</template>
