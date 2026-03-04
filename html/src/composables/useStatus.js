import { onMounted, onUnmounted, watch } from 'vue';
import { useUserStore } from '@/stores/user';

export function useStatus() {
  const userStore = useUserStore();

  function handleVisibility() {
    if (document.visibilityState === 'visible') userStore.setStatus(true);
    else userStore.setStatus(false);
  };

  function handleBeforeUnload() {
    userStore.setStatus(false);
  };

  const unwatch = watch(
    () => userStore.isAuthenticated,
    (isAuth) => {
      if (isAuth) {
        userStore.setStatus(true);
        unwatch();
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    userStore.setStatus(true);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('beforeunload', handleBeforeUnload);
  });

  onUnmounted(() => {
    userStore.setStatus(false);
    document.removeEventListener('visibilitychange', handleVisibility);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  });
}