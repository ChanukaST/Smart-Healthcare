const { performance } = require('perf_hooks');

// Generate mock data
const NUM_ADMISSIONS = 10000;
const NUM_LOOKUPS = 100000;

const admissions = Array.from({ length: NUM_ADMISSIONS }, (_, i) => ({
  id: i,
  bed: { id: i } // Each admission has a bed with matching ID for simplicity
}));

const bedIdsToLookup = Array.from({ length: NUM_LOOKUPS }, () => Math.floor(Math.random() * NUM_ADMISSIONS));

console.log(`Benchmarking ${NUM_LOOKUPS} lookups with ${NUM_ADMISSIONS} admissions...`);

// 1. Baseline: Array.find()
const startBaseline = performance.now();
let baselineFound = 0;
for (let i = 0; i < NUM_LOOKUPS; i++) {
  const bedId = bedIdsToLookup[i];
  const adm = admissions.find(a => a.bed?.id === bedId);
  if (adm) baselineFound++;
}
const endBaseline = performance.now();
const baselineTime = endBaseline - startBaseline;

// 2. Optimized: Map building + Map lookup
const startOptimized = performance.now();
let optimizedFound = 0;

// Build Map
const bedToAdmissionMap = new Map();
for (const adm of admissions) {
  if (adm.bed?.id != null) {
    bedToAdmissionMap.set(adm.bed.id, adm);
  }
}

// Lookup using Map
for (let i = 0; i < NUM_LOOKUPS; i++) {
  const bedId = bedIdsToLookup[i];
  const adm = bedToAdmissionMap.get(bedId);
  if (adm) optimizedFound++;
}
const endOptimized = performance.now();
const optimizedTime = endOptimized - startOptimized;

console.log(`\nResults:`);
console.log(`Baseline (.find()): ${baselineTime.toFixed(2)} ms`);
console.log(`Optimized (Map): ${optimizedTime.toFixed(2)} ms`);
console.log(`Improvement: ${((baselineTime / optimizedTime)).toFixed(2)}x faster`);

if (baselineFound !== optimizedFound) {
  console.error("Mismatch in found items!");
}
