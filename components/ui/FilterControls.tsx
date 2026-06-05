"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

export function FilterControls<T>({
  items,
  searchFields,
  filters,
  render,
  empty,
}: {
  items: T[];
  searchFields: (item: T) => string[];
  filters: { label: string; getValue: (item: T) => string; values: string[] }[];
  render: (items: T[]) => React.ReactNode;
  empty: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery = !q || searchFields(item).join(" ").toLowerCase().includes(q);
      const matchesFilters = filters.every((filter) => !active[filter.label] || filter.getValue(item) === active[filter.label]);
      return matchesQuery && matchesFilters;
    });
  }, [active, filters, items, query, searchFields]);

  return (
    <div>
      <div className="surface-card mb-8 grid gap-4 p-4 md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden="true" />
          <input
            className="min-h-12 w-full rounded-full border border-[var(--border)] bg-white py-2 pl-11 pr-4"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
          />
        </label>
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <label key={filter.label} className="text-sm font-bold text-[var(--text-secondary)]">
              <span className="sr-only">{filter.label}</span>
              <select
                className="min-h-12 rounded-full border border-[var(--border)] bg-white px-4"
                value={active[filter.label] || ""}
                onChange={(event) => setActive((state) => ({ ...state, [filter.label]: event.target.value }))}
              >
                <option value="">{filter.label}</option>
                {filter.values.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
          ))}
          <button className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--border)] px-4 text-sm font-bold" type="button" onClick={() => { setQuery(""); setActive({}); }}>
            <X className="h-4 w-4" aria-hidden="true" /> Clear
          </button>
        </div>
      </div>
      <p className="mb-5 text-sm font-bold text-[var(--text-secondary)]">{filtered.length} result{filtered.length === 1 ? "" : "s"}</p>
      {filtered.length ? render(filtered) : empty}
    </div>
  );
}
