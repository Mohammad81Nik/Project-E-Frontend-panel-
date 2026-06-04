const keyGenerators = {
  bulkActions: (index: number) => `bulk-action-${index}`,
  searchbarMenuItems: (index: number) => `searchbar-filter-type-${index}`,
  searchbarChip: (index: number) => `searchbar-active-filter-chip-${index}`,

  // create product form
  attributeValues: (index: number) => `attribute-value-${index}`,
  productDetailsRow: (index: number) => `product-details-row-${index}`,
  productAttributeSelect: (index: number, attrId: string) =>
    `product-attribute-select-${index}-${attrId}`,
  productAttributeValuesImage: (index: number, val: string) => `product-attribute-values-image-${index}-${val}`
}

export default keyGenerators
