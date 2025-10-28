# System Patterns

## Architecture Overview

### High-Level Structure
```
Vue.js 2 SPA
├── Vue Router (client-side routing)
├── Vuex Store (state management)
├── Component Library (driveagent-ui + custom)
├── Netlify Functions (serverless backend)
└── External APIs (Stripe, Google, Facebook, YouTube)
```

### Key Technical Decisions

#### 1. Vue.js 2.x (Not Vue 3)
- **Why**: Project started on Vue 2, migration not yet undertaken
- **Impact**: Using Options API, Vue 2.7 (final Vue 2 version)
- **Dependencies**: vue-router@3.x, vuex@3.x compatible

#### 2. Serverless Architecture (Netlify Functions)
- **Why**: Scalable, cost-effective, no server management
- **Implementation**: Backend logic in `/src/functions/`
- **Use Cases**: 
  - Payment processing (Stripe)
  - API proxying (Google, Facebook, YouTube)
  - Data feeds (CarSales)
  - Review fetching

#### 3. Static Site Generation + SPA
- **Why**: Best of both worlds - SEO + dynamic behavior
- **Build**: Pre-renders public HTML, hydrates to SPA
- **Routing**: History mode with Netlify redirects

#### 4. State Management Pattern
- **Vuex Modules**: Separated by feature (search, pricing, reviews)
- **Persistence**: Key state persisted to localStorage
- **Actions**: Async operations (API calls)
- **Mutations**: Synchronous state changes
- **Getters**: Computed state derivations

## Component Architecture

### Component Hierarchy
```
App.vue
└── Default.vue (layout)
    ├── PrimaryNav.vue / PrimaryNavDefault.vue
    ├── <router-view> (page components)
    │   ├── Home.vue
    │   ├── Vehicle.vue
    │   ├── vehicles.vue (search)
    │   └── ...
    └── Footer components
```

### Component Patterns

#### 1. Smart vs. Presentational Components
- **Smart**: Connect to Vuex, handle business logic (e.g., `template.vue` in search)
- **Presentational**: Receive props, emit events (e.g., filter components)

#### 2. Builder Pattern
- **Location**: `/src/builder/`
- **Purpose**: Vehicle configuration/customization
- **Pattern**: Step-by-step wizard with state preservation

#### 3. Search System
- **Location**: `/src/components/search/`
- **Architecture**:
  ```
  template.vue (container)
  ├── Filters/ (filter components)
  │   ├── FilterText.vue
  │   ├── FilterCheckbox.vue
  │   ├── FilterSlider.vue
  │   └── ...
  ├── CarSales/ (results display)
  └── utils/ (search logic)
  ```

#### 4. Form Elements
- **Location**: `/src/components/form-elements/`
- **Pattern**: Reusable form inputs with validation (Vuelidate)
- **Components**: TextField, SelectField, CheckboxField, DatePicker, etc.

## Data Flow Patterns

### 1. Search/Filter Flow
```
User Input → FilterComponent 
  → dispatch('select', {name, value})
    → Vuex Mutation (UPDATE_SELECTED)
      → matchItems(items, selected, filters)
        → Filtered Results → UI Update
```

**Key Files**:
- `/src/utils/matchItems.js` - Core filtering logic
- `/src/store/modules/searchData.js` - Search state management
- Filter components in `/src/components/search/Filters/`

### 2. Filter Matching Logic

#### Filter Types & Handlers
```javascript
{
  text: OR logic for numeric (stock IDs), AND logic for text
  slider: Range matching (min/max)
  date: DateTime range matching
  radio: Value inclusion check
  select: Value inclusion check
  checkbox: Array intersection (any match)
  multiselect: Array intersection
  multiple: Array intersection
}
```

#### Text Search Intelligence
- Splits by spaces, commas, hyphens: `/[\s,\-]+/`
- **Stock ID mode**: All numeric → OR logic (match ANY)
- **Text mode**: Mixed content → AND logic (match ALL)
- Searches: title, make, model, body, fuel, stockid, badge, year, condition, keywords

### 3. Route-Store Synchronization
```
URL Query Params ↔ Vuex Store ↔ Components
```
- URL changes update store (`$route.query` watcher)
- Store changes update URL (`router.push({ query })`)
- Maintains shareable/bookmarkable state

### 4. API Service Pattern
**Location**: `/src/services/`

```javascript
// Centralized API services
import { vehicle } from '@/services';

// Usage
const data = await vehicle.getById(id);
```

**Services**:
- `vehicle.js` - Vehicle inventory
- `model.js` - Vehicle models
- `variant.js` - Vehicle variants
- `accessories.js` - Vehicle accessories
- `stripe.js` - Payment processing
- `page.js` - CMS content
- `brand.js` - Brand information

## Design Patterns

### 1. Lazy Loading
**Implementation**: `/src/utils/lazyLoad.js`
```javascript
// Route-level code splitting
component: () => import(/* webpackChunkName */ '@/views/Vehicle')

// Image lazy loading
<img v-lazy="imageUrl">
```

### 2. Debouncing
**Usage**: Text search, form inputs
```javascript
import { debounce } from 'lodash';

debounceInput: debounce(function() {
  this.handleSearch();
}, 300)
```

### 3. Event Bus
**Location**: `/src/utils/eventBus.js`
**Purpose**: Cross-component communication
```javascript
import { EventBus } from '@/utils/eventBus';

// Emit
EventBus.$emit('event-name', data);

// Listen
EventBus.$on('event-name', handler);
```

### 4. Meta Tag Management
**Pattern**: Dynamic SEO using `vue-meta`
```javascript
metaInfo() {
  return {
    title: this.pageTitle,
    meta: [
      { name: 'description', content: this.description },
      { property: 'og:title', content: this.pageTitle }
    ]
  }
}
```

### 5. Mixins
**Location**: `/src/mixins/`
- `meta.js` - SEO meta tag helpers
- `persistMixin.js` - State persistence to localStorage

## State Management Structure

### Store Modules
```
store/
├── index.js (root store)
├── actions.js (root actions)
├── mutations.js (root mutations)
├── getters.js (root getters)
└── modules/
    ├── searchData.js (vehicle search)
    ├── price-builder.js (vehicle builder)
    ├── GoogleReviews.js
    └── fetchReviews.js
```

### Root State Pattern
```javascript
// Initial state from config
import initialState from '@/config/initialState';

// Store initialization
const store = (initialState) => new Vuex.Store({...});
```

## Routing Patterns

### 1. Dynamic Routes
```javascript
// Vehicle details
'/vehicle/:slug/'

// Variant
'/variant/:slug/'

// Taxonomy (SEO-friendly)
'/cars-for-sale/:condition?/:make?/:model?'
```

### 2. Scroll Behavior
- Saved position on back navigation
- Hash scrolling support
- Configurable per-route (smooth, instant, offset)

### 3. Meta Tags per Route
```javascript
meta: {
  title: "Page Title",
  scrollToTop: true,
  // or custom scroll
  scrollToTop: { behavior: 'smooth', offset: 100 }
}
```

## Integration Patterns

### 1. Stripe Payments
**Flow**: Client → Netlify Function → Stripe API
```
create-checkout-session.js → Stripe Session → redirect to Stripe
payment-success → retrieve-stripe-session.js → verify payment
```

### 2. Google APIs
- **Reviews**: Netlify function proxies Google Places API
- **Analytics**: vue-gtag + GTM integration
- **Tag Manager**: GTM container for tracking

### 3. Social Media
- **Facebook**: vue-fb-customer-chat plugin
- **YouTube**: Custom integration for video embeds

### 4. External UI Library
- **driveagent-ui**: Private GitHub package
- **Element UI**: Component library (el-input, el-select, etc.)
- **UIKit 3**: CSS framework for layout/utilities

## Build & Deployment

### Build Configuration
**File**: `vue.config.js`
- Webpack customization
- Image optimization
- Compression
- Bundle splitting

### Netlify Configuration
**File**: `netlify.toml`
- Build commands
- Redirects
- Headers
- Function settings

### Environment
- **Development**: `npm run serve` (port 8888)
- **Production**: `npm run build` (with legacy OpenSSL provider)

## Error Handling

### Patterns
1. **Try-catch blocks** in async operations
2. **Console errors** with context
3. **Fallback values** (empty arrays, default objects)
4. **404 handling** via router wildcard
5. **Error layout** (`layouts/error.vue`)

### Example
```javascript
try {
  const results = matchItems(items, selected, filters);
  return results;
} catch (error) {
  console.error('Error in matchItems:', error);
  return items; // fallback
}
```



