'use strict';

console.log('🐾 Example of how to use objects in js')

const productionSlots = {
  ProductionLine1: {
    "product1": {
      AMER: 100,
      APAC: 100,
      EMEA: 100
    },
    "product2": {
      AMER: 50,
      APAC: 100,
      EMEA: 100
    },
    "product3": {
      AMER: 50,
      APAC: 100,
      EMEA: 100
    }
  },
  "ProductionLine2": {
    "product1": {
      AMER: 50,
      APAC: 100,
      EMEA: 100
    },
    "product2": {
      AMER: 50,
      APAC: 100,
      EMEA: 100
    },
    "product3": {
      AMER: 10,
      APAC: 100,
      EMEA: 100
    },
    "product4": {
      AMER: 10,
      APAC: 100,
      EMEA: 100
    },
    "product5": {
      AMER: 2,
      APAC: 100,
      EMEA: 100
    },
    "product6": {
      AMER: 10,
      APAC: 100,
      EMEA: 100
    },
    "product7": {
      AMER: 0,
      APAC: 100,
      EMEA: 100
    }
  },
  ProductionLine3: {
    "product1": {
      AMER: 20,
      APAC: 100,
      EMEA: 100
    },
    "product2": {
      AMER: 20,
      APAC: 50,
      EMEA: 100
    }
  }
}

const productionSlotsWithTotals = {}

Object.entries(productionSlots).forEach(([productLine, productsObj]) => {
  productionSlotsWithTotals[productLine] = { ...productsObj, total: {} }
  Object.values(productsObj).map((numsPerArea) => {
    Object.entries(numsPerArea).forEach(([area, value]) => {
      let sum = productionSlotsWithTotals[productLine].total[area] || 0
      productionSlotsWithTotals[productLine].total[area] = sum + value
    })
  })
})

console.log('🧮 Slots per product line / product / area', productionSlotsWithTotals)