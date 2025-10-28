# Technical Context

## Technology Stack

### Frontend Framework
- **Vue.js 2.7.16** - Progressive JavaScript framework
- **Vue Router 3.6.5** - Official router for Vue.js
- **Vuex 3.6.2** - State management pattern + library

### UI Libraries
- **Element UI 2.15.14** - Vue 2.0 based component library
- **UIKit 3.23.0** - Lightweight modular front-end framework
- **driveagent-ui** - Custom private component library (GitHub package)

### Build Tools
- **Vue CLI 4.5.0** - Standard tooling for Vue.js development
- **Webpack** (via Vue CLI) - Module bundler
- **Babel** - JavaScript compiler

### Styling
- **Sass 1.63.6** - CSS preprocessor
- **sass-loader 8.0.2** - Webpack loader for Sass

### Utilities
- **Lodash 4.17.21** - Utility library (debounce, etc.)
- **Luxon 3.1.0** - DateTime library
- **Axios 1.4.0** - HTTP client
- **Fuse.js 7.0.0** - Fuzzy search library
- **UUID 8.3.2** - UUID generation

### Payment Processing
- **Stripe 8.169.0** - Payment platform
- **Square 13.1.0** - Payment processing

### Analytics & Tracking
- **vue-gtag 1.16.1** - Google Analytics
- **vue-gtm 3.0.0-vue2** - Google Tag Manager

### Social Integration
- **vue-fb-customer-chat 0.2.0** - Facebook customer chat

### Form Validation
- **Vuelidate 0.7.7** - Simple, lightweight model-based validation

### SEO
- **vue-meta 2.4.0** - Manage page meta information

### Data Processing
- **csv-parser 3.0.0** - Streaming CSV parser
- **pako 2.0.4** - Gzip/deflate compression
- **node-cache 5.1.2** - Simple caching module

### Build Optimization
- **compression-webpack-plugin 6.1.1** - Prepare compressed assets
- **hard-source-webpack-plugin 0.13.1** - Webpack caching
- **image-minimizer-webpack-plugin 1.0.0** - Image optimization
- **imagemin-mozjpeg 10.0.0** - JPEG optimizer

### Utilities
- **xmlbuilder 15.1.1** - XML builder for sitemaps
- **sitemap 7.1.1** - Sitemap generation

## Development Setup

### Prerequisites
```bash
Node.js (with legacy OpenSSL support)
npm or yarn
Git
```

### Installation
```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run serve
# Runs on http://localhost:8888
```

### Environment Configuration
- **Development**: Uses `vue-cli-service serve`
- **Production**: Uses `NODE_OPTIONS=--openssl-legacy-provider` for build

### Special Requirements
⚠️ **Legacy OpenSSL Provider Required**
```json
"build": "NODE_OPTIONS=--openssl-legacy-provider vue-cli-service build"
```
This is needed due to Node.js version compatibility with older dependencies.

## Project Structure

### Core Directories
```
blood-hyundai/
├── public/              # Static assets (not processed by Webpack)
│   ├── assets/         # Images, CSS, JS
│   ├── fonts/          # Hyundai Sans font family
│   ├── static/         # JSON data, HTML snippets
│   └── vehicles/       # Vehicle data (makes, models, variants)
├── src/
│   ├── assets/         # Build-time assets (fonts, styles)
│   ├── builder/        # Vehicle build & price configurator
│   ├── components/     # Vue components
│   ├── config/         # Configuration files
│   ├── functions/      # Netlify serverless functions
│   ├── layouts/        # Page layouts
│   ├── mixins/         # Reusable component logic
│   ├── router/         # Vue Router configuration
│   ├── services/       # API service layer
│   ├── store/          # Vuex store
│   ├── utils/          # Utility functions
│   └── views/          # Page-level components
├── babel.config.js     # Babel configuration
├── vue.config.js       # Vue CLI configuration
└── netlify.toml        # Netlify deployment config
```

### Key Configuration Files

#### `vue.config.js`
- Webpack customization
- Public path configuration
- Plugin configuration (compression, caching)
- Dev server settings

#### `netlify.toml`
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects for SPA routing
- Headers for security/caching
- Function configuration

#### `babel.config.js`
- Preset: `@vue/cli-plugin-babel/preset`
- Element UI component plugin
- Core-js polyfills

## Technical Constraints

### Browser Compatibility
- **Target**: Modern browsers + IE11 (via polyfills)
- **Polyfills**: core-js for ES6+ features
- **Autoprefixer**: Automatic vendor prefixes

### Performance Budget
- **Initial Load**: < 3 seconds on 3G
- **Code Splitting**: Route-based chunks
- **Image Optimization**: WebP where supported, JPEG/PNG fallbacks
- **Asset Compression**: Gzip for all text assets

### SEO Requirements
- **Server-side rendering**: Pre-rendered HTML in `public/`
- **Meta tags**: Dynamic via vue-meta
- **Structured data**: JSON-LD where applicable
- **Sitemap**: Generated dynamically
- **Robots.txt**: Configured for search engines

### Security
- **HTTPS**: Required (enforced by Netlify)
- **Content Security Policy**: Headers configured
- **Payment Security**: PCI compliance via Stripe
- **API Keys**: Environment variables (not in repo)

## Dependencies Deep Dive

### Critical Dependencies

#### driveagent-ui
```json
"driveagent-ui": "git+https://ghp_...:x-oauth-basic@github.com/adme-dev/driveagent-ui.git"
```
- **Purpose**: Shared component library
- **Type**: Private GitHub repository
- **Contains**: Common components, utilities, styles
- **Authentication**: GitHub personal access token required

#### Element UI
```javascript
import { Input, Select, Button, DatePicker, ... } from 'element-ui';
```
- **Usage**: Form inputs, date pickers, dialogs
- **Import**: Component-level (tree-shaking enabled)
- **Theme**: Customizable via SCSS variables

#### UIKit
```html
<div class="uk-container uk-margin-top">
  <div class="uk-grid" uk-grid>...</div>
</div>
```
- **Usage**: Grid system, utilities, icons
- **Load**: Global CSS + JS
- **Icons**: Custom icon font (icomoon)

### Data Flow Libraries

#### Axios
```javascript
import axios from 'axios';

const response = await axios.get('/api/endpoint');
```
- **Base URL**: Configured per environment
- **Interceptors**: Error handling, loading states
- **Timeout**: Configured per request type

#### Vuex
```javascript
// Action
dispatch('select', { name, value });

// Mutation
commit('UPDATE_SELECTED', { name, value });

// Getter
computed: {
  ...mapGetters(['filteredItems'])
}
```

## Build Process

### Development Build
```bash
npm run serve
```
1. Compiles Vue components
2. Processes Sass/SCSS
3. Transpiles JavaScript (Babel)
4. Hot module replacement (HMR)
5. Serves on http://localhost:8888

### Production Build
```bash
npm run build
```
1. **Compile**: All Vue components to JavaScript
2. **Transpile**: ES6+ to ES5 (for compatibility)
3. **Bundle**: Webpack creates optimized bundles
4. **Split**: Code-split by routes (webpackChunkName)
5. **Optimize**: 
   - Minify JavaScript (Terser)
   - Minify CSS (cssnano)
   - Optimize images (imagemin)
   - Generate gzipped versions
6. **Output**: `dist/` directory ready for deployment

### Build Optimization Features
- **Tree Shaking**: Remove unused code
- **Code Splitting**: Separate chunks per route
- **Lazy Loading**: Components loaded on demand
- **Asset Hashing**: Cache busting via filename hashes
- **Source Maps**: For debugging (production = false)

## Deployment Pipeline

### Netlify Continuous Deployment
```
Git Push → GitHub → Webhook → Netlify Build → Deploy
```

### Build Settings (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "src/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables
Set in Netlify dashboard:
- `STRIPE_SECRET_KEY`
- `GOOGLE_API_KEY`
- `FACEBOOK_APP_ID`
- Other API credentials

### Deploy Contexts
- **Production**: `main` branch
- **Deploy Previews**: Pull requests
- **Branch Deploys**: Feature branches

## API Integration

### Netlify Functions
**Location**: `/src/functions/`

Each function is a serverless endpoint:
```javascript
// Example: /src/functions/vehicle-api.js
exports.handler = async (event, context) => {
  // Function logic
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
```

**Available Functions**:
- `carsales-feed.js` - Vehicle inventory feed
- `create-checkout-session.js` - Stripe checkout
- `create-payment-intent.js` - Stripe payment intent
- `facebook-api.js` - Facebook API proxy
- `google-api.js` - Google APIs proxy
- `fetchReviews.js` - Google reviews
- `youtube.js` - YouTube data
- `sitemap.js` - Dynamic sitemap generation

### External APIs

#### Stripe
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
```
- **Purpose**: Payment processing
- **Integration**: Server-side via Netlify functions
- **Endpoints**: Checkout sessions, payment intents

#### Google APIs
- **Google Places**: Fetch dealership reviews
- **Google Analytics**: Track user behavior
- **Google Tag Manager**: Manage tracking scripts

#### Facebook
- **Graph API**: Social integration
- **Customer Chat**: Live chat widget

#### YouTube
- **Data API**: Fetch video data
- **Embed**: Video players in content

## Development Tools

### Recommended IDE Setup
- **VS Code** or **Cursor**
- **Extensions**:
  - Vetur (Vue tooling)
  - ESLint
  - Prettier
  - SCSS IntelliSense

### Debugging
```javascript
// Vue Devtools
// Install browser extension

// Console debugging
console.log('Debug:', this.$store.state);

// Vuex debug mode (development only)
strict: process.env.NODE_ENV !== 'production'
```

### Code Quality
- **Linting**: ESLint (Vue recommended config)
- **Formatting**: Prettier (optional)
- **Type Checking**: None (plain JavaScript, not TypeScript)

## Performance Monitoring

### Metrics to Track
- **First Contentful Paint (FCP)**
- **Time to Interactive (TTI)**
- **Largest Contentful Paint (LCP)**
- **Cumulative Layout Shift (CLS)**

### Tools
- Google Analytics
- Google Tag Manager
- Netlify Analytics
- Chrome DevTools Performance tab

## Known Technical Debt

### Legacy Dependencies
- **Vue 2.x**: Should migrate to Vue 3 eventually
- **Vue CLI**: Could move to Vite for faster builds
- **Element UI**: Limited Vue 3 support

### Build Issues
- **OpenSSL Legacy**: Workaround needed, indicates outdated dependencies
- **Webpack**: Slower than modern alternatives (Vite, Rollup)

### Code Organization
- Some components could be refactored for better reusability
- Service layer could use more consistent error handling
- Type safety would benefit from TypeScript migration

## Upgrade Path

### Short Term
1. Update minor dependencies
2. Address security vulnerabilities
3. Optimize bundle sizes

### Medium Term
1. Plan Vue 3 migration
2. Evaluate Vite migration
3. Consider TypeScript adoption

### Long Term
1. Complete Vue 3 migration
2. Modernize build tooling
3. Implement end-to-end testing



