<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <p>{{ $t("footer.copyright") }}</p>
        </div>
        <div class="footer-links">
          <RouterLink to="/privacy" class="footer-link">{{ $t("footer.privacy_policy") }}</RouterLink>
          <span class="separator">•</span>
          <RouterLink to="/terms" class="footer-link">{{ $t("footer.terms_of_service") }}</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--muted-color);
  border-top: 1px solid var(--form-element-border-color);
  margin-top: 3rem;
  padding: 2rem 0;
  font-size: 0.875rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-section p {
  margin: 0;
  color: var(--muted-color-text);
}

.footer-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--link-visited-color);
  text-decoration: underline;
}

.separator {
  color: var(--muted-color-text);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }
}
</style>
