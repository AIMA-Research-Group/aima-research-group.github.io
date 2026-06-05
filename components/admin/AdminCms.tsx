"use client";

import { useEffect, useState } from "react";
import YAML from "yaml";
import { withBasePath } from "@/lib/utils/paths";

declare global {
  interface Window {
    CMS?: {
      init: (options: { config: unknown }) => void;
    };
    AIMA_CMS_INIT_STARTED?: boolean;
    CMS_MANUAL_INIT?: boolean;
  }
}

const DECAP_SCRIPT_SRC = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (window.CMS) resolve();
      else existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load Decap CMS."));
    document.body.appendChild(script);
  });
}

export function AdminCms() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function initializeCms() {
      try {
        if (window.AIMA_CMS_INIT_STARTED) return;
        window.AIMA_CMS_INIT_STARTED = true;
        window.CMS_MANUAL_INIT = true;

        const configUrl = `${withBasePath("/admin/config.yml")}?v=${Date.now()}`;
        const [configResponse] = await Promise.all([fetch(configUrl, { cache: "no-store" }), loadScript(DECAP_SCRIPT_SRC)]);

        if (!configResponse.ok) {
          throw new Error(`Unable to load CMS config: ${configResponse.status}`);
        }

        const config = YAML.parse(await configResponse.text());
        window.CMS?.init({ config });
      } catch (event) {
        if (!active) return;
        setError(event instanceof Error ? event.message : "Unable to initialize CMS.");
      }
    }

    initializeCms();

    return () => {
      active = false;
    };
  }, []);

  if (!error) return null;

  return (
    <div className="container-page py-10">
      <div className="surface-card p-6">
        <h1 className="text-xl font-black">CMS failed to load</h1>
        <p className="mt-3 text-[var(--text-secondary)]">{error}</p>
      </div>
    </div>
  );
}
