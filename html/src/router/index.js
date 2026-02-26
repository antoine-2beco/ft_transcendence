import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import * as Views from '@/views';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Views.HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Views.LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: Views.RegisterView
    },
    {
      path: '/game',
      name: 'game',
      component: Views.GameView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Views.UserProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Views.LeaderboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/history',
      name: 'history',
      component: Views.HistoryView,
      meta: { requiresAuth: true }
    },
    {
      path: '/friends',
      name: 'friends',
      component: Views.FriendsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Views.Article,
      meta: { article: 'PrivacyPolicy' }
    },
    {
      path: '/terms',
      name: 'terms',
      component: Views.Article,
      meta: { article: 'TermsofService' }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.user.username) {
    await userStore.checkAuth();
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
