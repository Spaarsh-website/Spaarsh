// -> impact_stats table. Empty until verified figures exist; the section renders nothing.

export interface ImpactStat {
  /** Display value, e.g. "120" or "1,200+". Verified figures only. */
  value: string;
  label: string;
}

export const impactStats: ImpactStat[] = [];
