export interface FilterOptions {
  orderBy: 'high-to-low' | 'low-to-high' | null;
  tags: string[];
  dateFrom: string | null;
  dateTo: string | null;
}

export interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  availableTags: string[];
  currentFilters?: FilterOptions;
}

export interface FilterState {
  orderBy: 'high-to-low' | 'low-to-high' | null;
  selectedTags: {[key: string]: boolean};
  dateFrom: Date | null;
  dateTo: Date | null;
}

export interface FilterUtils {
  hasActiveFilters: (filters: FilterOptions) => boolean;
  getActiveFiltersCount: (filters: FilterOptions) => number;
  clearAllFilters: () => FilterOptions;
}

export const createEmptyFilter = (): FilterOptions => ({
  orderBy: null,
  tags: [],
  dateFrom: null,
  dateTo: null,
});

export const hasActiveFilters = (filters: FilterOptions): boolean => {
  return (
    filters.orderBy !== null ||
    filters.tags.length > 0 ||
    filters.dateFrom !== null ||
    filters.dateTo !== null
  );
};

export const getActiveFiltersCount = (filters: FilterOptions): number => {
  return (
    (filters.orderBy ? 1 : 0) +
    filters.tags.length +
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0)
  );
};
