(() => {
  // Set this at deploy time by editing this file on Cloudflare Pages (or replace it in your pipeline):
  // window.__TT_BACKEND_BASE_URL = "https://YOUR-BACKEND-HOST";
  //
  // You can also override per-request via query param:
  // ?backend_base_url=https://YOUR-BACKEND-HOST

  let qsBackend = "";
  try {
    qsBackend = new URL(window.location.href).searchParams.get("backend_base_url") || "";
    if (qsBackend) {
      window.__TT_BACKEND_BASE_URL = qsBackend;
    }
  } catch {}

  const meta = document.querySelector('meta[name="backend-base-url"]');
  const configured =
    (window.__TT_BACKEND_BASE_URL && String(window.__TT_BACKEND_BASE_URL).trim()) ||
    (meta && meta.content ? meta.content.trim() : "");

  if (!meta) return;

  const isLocalHost = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
  if (isLocalHost && !qsBackend) {
    // Default to same-origin during local dev unless a backend override was provided.
    meta.setAttribute("content", window.location.origin);
  } else if (configured && !configured.includes("example")) {
    meta.setAttribute("content", configured);
  } else {
    // Default: same-origin (useful for local dev or when proxying through a single host).
    meta.setAttribute("content", window.location.origin);
  }

  // Keep Base44 login redirects on this host by default (including /frontend deployments).
  try {
    const path = window.location.pathname || "/";
    const appBasePath = path.indexOf("/frontend/") === 0 ? "/frontend" : "";
    const appBaseUrl = window.location.origin + appBasePath;
    const url = new URL(window.location.href);
    const currentAppBase = url.searchParams.get("app_base_url") || "";
    const shouldOverride = !currentAppBase || /base44\.app/i.test(currentAppBase);

    if (shouldOverride) {
      url.searchParams.set("app_base_url", appBaseUrl);
      window.history.replaceState({}, document.title, url.toString());
    }

    if (window.localStorage) {
      window.localStorage.setItem("base44_app_base_url", appBaseUrl);
    }
  } catch {}
})();

