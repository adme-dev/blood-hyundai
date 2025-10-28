# Product Context

## Why This Project Exists
The Waverley Nissan dealership website serves as the primary digital storefront for the dealership, bridging the gap between traditional car buying and modern e-commerce. It enables customers to research, compare, and begin the purchasing process entirely online before visiting the dealership.

## Problems It Solves

### For Customers
- **Vehicle Discovery**: Eliminates the need to visit the dealership just to browse inventory
- **Informed Decisions**: Provides comprehensive vehicle information, specifications, and pricing upfront
- **Time Savings**: Allows comparison of multiple vehicles, filtering by specific criteria
- **Convenience**: Book test drives, service appointments, and enquire about vehicles 24/7
- **Transparency**: See real-time pricing, available stock, and special offers
- **Secure Payments**: Make vehicle deposits or payments securely online

### For the Dealership
- **Lead Generation**: Captures customer interest through multiple contact forms
- **Reduced Phone Load**: Handles common enquiries digitally
- **Inventory Showcase**: Displays entire inventory with rich media
- **Sales Efficiency**: Qualified leads arrive with specific vehicle interests
- **Marketing Platform**: Promotes special offers and new models
- **Analytics**: Track customer behavior and popular vehicles

## How It Works

### Customer Journey
1. **Discovery**: 
   - Browse vehicles via search/filter interface
   - View taxonomy pages (e.g., "Used Toyota SUVs")
   - Explore special offers

2. **Research**:
   - View detailed vehicle pages with specs, photos, pricing
   - Compare multiple vehicles side-by-side
   - Read Google reviews about the dealership
   - Configure custom builds with the vehicle builder

3. **Engagement**:
   - Book test drives
   - Submit vehicle enquiries
   - Request finance quotes
   - Secure a vehicle with online payment

4. **Conversion**:
   - Complete online deposit/payment via Stripe
   - Schedule showroom visit
   - Contact sales team directly

### Technical Flow
```
User → Vue Router → Page Component → Vuex Store → API Service → Netlify Functions → External APIs/Data
```

## User Experience Goals

### Performance
- **Sub-second search results**: Filters should update instantly
- **Lazy loading**: Images and components load as needed
- **Optimized bundles**: Code-split routes for faster initial load

### Usability
- **Intuitive search**: Natural language search supports stock IDs, makes, models, keywords
- **Smart filtering**: Multiple filter types (checkboxes, sliders, date ranges) work together seamlessly
- **Clear navigation**: Breadcrumbs and logical menu structure
- **Mobile-first**: Touch-friendly interface, responsive design

### Trust & Credibility
- **Professional design**: Aligned with Nissan brand guidelines
- **Real reviews**: Google reviews displayed prominently
- **Secure payments**: Stripe integration with clear security indicators
- **Contact options**: Multiple ways to reach the dealership

### Accessibility
- **Keyboard navigation**: All interactive elements keyboard-accessible
- **Screen reader support**: Semantic HTML and ARIA labels
- **Clear typography**: Hyundai Sans font family with readable sizing
- **Color contrast**: Meets WCAG guidelines

## Key Features

### Search & Discovery
- Advanced multi-criteria filtering
- Text search supporting stock IDs (comma-separated), makes, models, keywords
- Real-time search suggestions
- Taxonomy-based browsing (condition/make/model)
- Save and compare vehicles

### Vehicle Information
- Detailed specifications
- Image galleries
- Pricing (with finance calculators)
- Availability status
- Related vehicles

### Customer Engagement
- Test drive booking
- Vehicle enquiry forms
- Service booking
- Parts enquiry
- Finance applications
- Sell my car form

### E-commerce
- Secure vehicle deposits via Stripe
- Payment success tracking
- OpenPay integration

### Content
- Dynamic special offers
- Model showcases
- Google reviews integration
- YouTube video integration
- Facebook chat integration

## Success Metrics
- **Engagement**: Time on site, pages per session, vehicle comparisons
- **Conversion**: Test drive bookings, enquiries submitted, deposits made
- **Performance**: Page load times, search response times
- **SEO**: Organic traffic, search rankings for key terms



