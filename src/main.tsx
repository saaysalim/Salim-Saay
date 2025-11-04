
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { Provider } from 'react-redux';
  import { store } from './store/store';
  import { setPosts as setPostsAction } from './store/postsSlice';

  // Hydrate posts from localStorage if present
  try {
    const raw = localStorage.getItem('postfeed.posts');
    if (raw) {
      const parsed = JSON.parse(raw);
      store.dispatch(setPostsAction(parsed));
    }
  } catch (e) {
    console.warn('Failed to hydrate posts from localStorage', e);
  }

  // Persist posts slice to localStorage on changes
  let prev = store.getState().posts;
  store.subscribe(() => {
    const cur = store.getState().posts;
    if (cur !== prev) {
      try { localStorage.setItem('postfeed.posts', JSON.stringify(cur.items || [])); } catch (e) { /* ignore */ }
      prev = cur;
    }
  });

  createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  