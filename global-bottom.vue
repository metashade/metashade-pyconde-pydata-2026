<template>
  <div
    v-if="$slidev.nav.currentLayout !== 'cover' && $slidev.nav.currentLayout !== 'center'"
    class="footer"
  >
    <img
      src="/media-kit/Logo/PyConDE PyData 2026 Logo green_06.png"
      class="footer-logo"
    />
    <span class="footer-page">
      {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    </span>
  </div>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  z-index: 100;
  pointer-events: none;
}

.footer-logo {
  height: 86px;
  width: auto;
  opacity: 0.85;
}

.footer-page {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #96dc00;
  opacity: 0.85;
}
</style>
