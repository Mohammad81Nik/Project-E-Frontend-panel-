const keyGenerators = {
  bulkActions: (index: number) => `bulk-action-${index}`,
  searchbarMenuItems: (index: number) => `searchbar-filter-type-${index}`,
  searchbarChip: (index: number) => `searchbar-active-filter-chip-${index}`,
  attributeValues: (index: number) => `attribute-value-${index}`,
}

export default keyGenerators
