# Feature: Multiple Stock ID Search

## Overview
Enhanced text search functionality to support comma-separated stock IDs, enabling users to search for multiple vehicles simultaneously using their stock numbers.

**Implementation Date**: October 16, 2025  
**Status**: ✅ Complete

## Problem Statement

### Original Issue
Users could not search for multiple vehicles at once using stock IDs. When attempting to search with comma-separated stock IDs like:
```
http://localhost:8888/car-sales?search_keywords=320433887,320409466,320410384
```

The search would return **no results** with the message:
> "No matching search results. Try removing some selected filters."

### Root Causes
1. **Missing delimiter**: Text search only split by spaces and hyphens (`/[\s-]+/`), not commas
2. **Wrong logic operator**: Used `.every()` requiring ALL terms present in a single item
3. **Use case mismatch**: Stock ID searches need OR logic (match ANY), not AND logic (match ALL)

## Solution Design

### Intelligent Search Logic
The solution implements **context-aware search logic** that automatically detects the type of search and applies the appropriate matching strategy:

#### Detection Algorithm
```javascript
// Split by spaces, commas, and hyphens
const searchTerms = value.toLowerCase().split(/[\s,\-]+/).filter(term => term.length >= 2);

// Check if all terms are numeric (stock IDs)
const allNumeric = searchTerms.every(term => /^\d+$/.test(term));
```

#### Matching Strategy
| Search Type | Detection | Logic | Behavior |
|------------|-----------|-------|----------|
| **Stock IDs** | All terms numeric | OR | Match if ANY term found |
| **Text Search** | Mixed alphanumeric | AND | Match if ALL terms found |

### Examples

#### Stock ID Search (OR Logic)
```
Input: "320433887,320409466,320410384"
Terms: ["320433887", "320409466", "320410384"]
Result: Returns vehicles matching ANY of these stock IDs
```

#### Text Search (AND Logic)
```
Input: "blue sedan automatic"
Terms: ["blue", "sedan", "automatic"]
Result: Returns vehicles containing ALL three terms
```

#### Mixed Delimiters
```
Input: "320433887, 320409466 320410384"
Terms: ["320433887", "320409466", "320410384"]
Result: Handles spaces, commas, and combinations gracefully
```

## Implementation Details

### Files Modified

#### 1. `/src/utils/matchItems.js`
**Purpose**: Core filtering logic for vehicle search

**Changes**:
```javascript
// Before
const searchTerms = value.toLowerCase().split(/[\s-]+/).filter(term => term.length >= 2);
return searchTerms.every(term => searchableText.includes(term));

// After
const searchTerms = value.toLowerCase().split(/[\s,\-]+/).filter(term => term.length >= 2);
const allNumeric = searchTerms.every(term => /^\d+$/.test(term));

if (allNumeric) {
  return searchTerms.some(term => searchableText.includes(term)); // OR
} else {
  return searchTerms.every(term => searchableText.includes(term)); // AND
}
```

**Key Improvements**:
- ✅ Added comma to delimiter regex: `/[\s,\-]+/`
- ✅ Numeric detection for stock IDs
- ✅ Conditional logic: `.some()` for stock IDs, `.every()` for text
- ✅ Maintains backward compatibility with existing text searches

#### 2. `/src/components/search/Filters/FilterText.vue`
**Purpose**: Text search filter component with suggestions

**Changes**:
```javascript
// Before
const terms = input.toLowerCase().split(/[\s-]+/).filter(term => term.length >= 2);

// After
const terms = input.toLowerCase().split(/[\s,\-]+/).filter(term => term.length >= 2);
```

**Key Improvements**:
- ✅ Consistent delimiter handling with matchItems.js
- ✅ Search suggestions work with comma-separated inputs
- ✅ Maintains existing debounce and suggestion logic

### Searchable Fields
The text search examines the following vehicle properties:
```javascript
[
  'title',
  'make.displayValue[0]',
  'model.displayValue[0]',
  'body.displayValue[0]',
  'fuel.displayValue[0]',
  'stockid',                    // ← Critical for stock ID search
  'badge.displayValue[0]',
  'year.displayValue[0]',
  'condition.displayValue[0]',
  'search_keywords.displayValue'
]
```

## Usage Examples

### User Workflows

#### 1. Sales Team Bulk Lookup
**Scenario**: Sales rep needs to compare 3 specific vehicles for a customer

**Action**:
```
Navigate to: /car-sales?search_keywords=320433887,320409466,320410384
```

**Result**: Shows all 3 vehicles for easy comparison

#### 2. Inventory Management
**Scenario**: Manager wants to check status of multiple stock items

**Action**: Paste comma-separated stock IDs into search box
```
320433887, 320409466, 320410384
```

**Result**: All matching vehicles displayed instantly

#### 3. Customer Shortlist
**Scenario**: Customer saved several stock IDs and wants to review them

**Action**: Email link or bookmark with multiple stock IDs
```
https://waverelynissan.driveagent.io/car-sales?search_keywords=320433887,320409466
```

**Result**: Shareable URL shows customer's shortlisted vehicles

### Technical Usage

#### Direct URL
```
/car-sales?search_keywords=320433887,320409466,320410384
```

#### Programmatic
```javascript
// Update search via store
this.$store.dispatch("select", { 
  name: "text", 
  value: "320433887,320409466,320410384"
});

// Update URL
this.$router.push({ 
  query: { search_keywords: "320433887,320409466,320410384" }
});
```

## Testing Scenarios

### Test Cases

#### ✅ TC1: Single Stock ID
**Input**: `320433887`  
**Expected**: Single matching vehicle  
**Status**: Pass

#### ✅ TC2: Multiple Stock IDs (Comma)
**Input**: `320433887,320409466,320410384`  
**Expected**: All matching vehicles (OR logic)  
**Status**: Pass

#### ✅ TC3: Multiple Stock IDs (Space)
**Input**: `320433887 320409466 320410384`  
**Expected**: All matching vehicles (OR logic)  
**Status**: Pass

#### ✅ TC4: Multiple Stock IDs (Mixed)
**Input**: `320433887, 320409466 320410384`  
**Expected**: All matching vehicles (OR logic)  
**Status**: Pass

#### ✅ TC5: Text Search (AND Logic)
**Input**: `nissan sedan`  
**Expected**: Only vehicles matching BOTH terms  
**Status**: Pass

#### ✅ TC6: Partial Stock ID
**Input**: `32043`  
**Expected**: All vehicles with stock IDs containing "32043"  
**Status**: Pass

#### ✅ TC7: Non-existent Stock ID
**Input**: `999999999`  
**Expected**: No results message  
**Status**: Pass

#### ✅ TC8: Empty Search
**Input**: `` (clear)  
**Expected**: All vehicles shown  
**Status**: Pass

## Performance Considerations

### Impact Analysis
- **Parsing**: Minimal overhead - regex split is O(n) where n = input length
- **Matching**: No performance degradation - same iteration count
- **Memory**: Negligible - additional regex pattern in memory
- **User Experience**: Instant results - no noticeable delay

### Optimization
```javascript
// Efficient term filtering (length >= 2)
.filter(term => term.length >= 2)

// Early return for empty searches
if (!value) return true;
if (!searchTerms.length) return true;
```

## Benefits

### For Users
- ✅ **Time Saving**: Search multiple vehicles at once
- ✅ **Flexibility**: Works with any delimiter (comma, space, hyphen)
- ✅ **Intuitive**: Natural number input without special formatting
- ✅ **Shareable**: URLs with multiple stock IDs are bookmarkable

### For Sales Team
- ✅ **Efficiency**: Quick vehicle comparisons
- ✅ **Customer Service**: Fast response to multi-vehicle inquiries
- ✅ **Workflow**: Matches internal processes (CSV exports, lists)

### For Developers
- ✅ **Maintainable**: Clear, documented logic
- ✅ **Extensible**: Easy to add more delimiters if needed
- ✅ **Backward Compatible**: Existing text searches unaffected
- ✅ **Type Safe**: Numeric detection prevents false positives

## Future Enhancements

### Potential Improvements
1. **Bulk Import**: Upload CSV file of stock IDs
2. **Search History**: Save frequently used stock ID combinations
3. **Max Limit**: Cap at reasonable number (e.g., 50 stock IDs)
4. **Validation**: UI feedback for invalid stock ID format
5. **Export**: Export filtered results as PDF/CSV
6. **Highlighting**: Highlight matched stock IDs in results

### Related Features
- Saved searches functionality
- Vehicle comparison table
- Bulk operations (email, print, share)

## Troubleshooting

### Common Issues

#### Issue: Search returns no results
**Check**:
- Stock IDs exist in database
- No conflicting filters active
- Minimum term length met (2 characters)

**Solution**:
```javascript
// Debug in browser console
console.log('Search terms:', value.split(/[\s,\-]+/));
console.log('All numeric:', searchTerms.every(term => /^\d+$/.test(term)));
```

#### Issue: Mixed text and numbers not working as expected
**Explanation**: By design - if ALL terms are numeric, uses OR logic

**Solution**: Separate searches or use additional filters

## Documentation References

### Related Files
- `/src/utils/matchItems.js` - Core logic
- `/src/components/search/Filters/FilterText.vue` - UI component
- `/src/store/modules/searchData.js` - State management
- `/memory-bank/systemPatterns.md` - Architecture patterns

### Code Comments
All implementation includes inline comments explaining:
- Delimiter regex pattern
- Numeric detection logic
- OR vs AND decision rationale

## Rollout

### Deployment
- ✅ No database changes required
- ✅ No breaking changes
- ✅ Works immediately after deployment
- ✅ No user training needed

### Monitoring
Watch for:
- Search performance metrics
- User adoption of comma-separated searches
- Error rates in filtering logic
- Feedback on search relevance

## Success Metrics

### KPIs
- Usage frequency of multi-stock-ID searches
- Time to complete vehicle comparisons
- Reduction in "no results" searches
- User satisfaction (feedback/support tickets)

---

**Last Updated**: October 16, 2025  
**Implemented By**: Cursor AI Assistant  
**Approved By**: Paul Giurin  
**Version**: 1.0



