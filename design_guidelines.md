# NuEra Cognitive Assessment Platform - Design Guidelines

## Design Approach
**Selected Approach:** Design System + Reference (Educational Tech Aesthetic)
- Modern educational technology platform with inspiring, professional interface
- Glassmorphism and gradient accents for contemporary feel
- Real-time data visualization with clear cognitive state indicators
- Accessibility-first approach with WCAG AA compliance (>4.5:1 contrast)

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Primary: #6366F1 (Indigo) - Main brand color for CTAs and primary actions
- Secondary: #10B981 (Emerald) - Success states and positive indicators
- Accent: #8B5CF6 (Violet) - Highlight elements and special features

**Backgrounds:**
- Background: #F8FAFC (Light Slate) - Main page background
- Text: #1E293B (Slate) - Primary text color

**Semantic Colors:**
- Success: #22C55E (Green) - Positive cognitive states, successful actions
- Warning: #F59E0B (Amber) - Medium cognitive load, caution states
- Error: #EF4444 (Red) - High cognitive stress, critical alerts

**Cognitive State Mapping:**
- Green (#22C55E): Optimal cognitive state
- Yellow (#F59E0B): Moderate cognitive load
- Red (#EF4444): High cognitive stress requiring attention

### B. Typography

**Font Families:**
- Headings & Body: Inter (fallback: system-ui, -apple-system)
- Monospace/Code: JetBrains Mono for technical data and device metrics

**Type Scale:**
- Hero Headlines: 3xl to 5xl (48-60px)
- Section Titles: 2xl to 3xl (30-36px)
- Card Titles: xl to 2xl (24-30px)
- Body Text: base to lg (16-18px)
- Captions/Meta: sm to base (14-16px)

### C. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 8, 12, 16, 20
- Micro spacing: p-2, gap-2 (8px) for tight elements
- Component spacing: p-4, m-4 (16px) for cards and buttons
- Section spacing: py-8, py-12 (32-48px) for page sections
- Container spacing: p-16, py-20 (64-80px) for major divisions

**Grid System:**
- 12pt baseline grid for vertical rhythm
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Container max-width: 7xl (1280px) for main content
- Card grids: 1 column mobile, 2-3 columns tablet, 3-4 columns desktop

### D. Component Library

**Navigation:**
- Top navigation bar with glassmorphism effect
- Clear role-based menu items (Teacher/Student/Admin views)
- Notifications bell with real-time badge counter
- Search bar with debounced input and autocomplete

**Cards & Containers:**
- Glassmorphism cards: subtle background blur, border, and shadow
- FixItAllCard: Multi-purpose card with live status indicator, mini progress bar, numeric counter, action buttons, settings dropdown, and sparkline chart
- StatsCards: Animated counter transitions, delta indicators with arrows and color coding
- DeviceCard: Battery indicator, signal strength (RSSI), firmware version, last seen timestamp

**Data Visualization:**
- Heatmap: Grid layout with color-coded cells (green/yellow/red cognitive states)
- Interactive tooltips on hover with student metrics
- Pulse animation for high cognitive load states
- RadarChart: Multi-axis cognitive profile display
- ProgressLine: Trend lines with smooth transitions
- Sparkline charts: Mini line graphs for quick insights

**Interactive Elements:**
- Primary buttons: Indigo (#6366F1) with hover lift and subtle shadow
- Secondary buttons: Outline style with emerald accent
- Icon buttons: Circular with glassmorphism background
- Focus states: Visible ring with indigo color for keyboard navigation

**Forms & Inputs:**
- Clean input fields with subtle borders
- Focus state with indigo ring
- Validation states using semantic colors
- Auto-save indicators for assessments

**Real-time Indicators:**
- Live status badges (online/offline) with pulse animation
- Cognitive state pills with color coding
- Progress bars with smooth animated transitions
- WebSocket connection status indicator

### E. Visual Effects & Animations

**Glassmorphism Treatment:**
- Background: rgba(255, 255, 255, 0.1) with backdrop-blur
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Shadow: subtle drop shadow for depth

**Gradient Accents:**
- Hero backgrounds: Indigo to violet gradient overlays
- Card highlights: Subtle gradient borders on hover
- Button gradients: Primary to accent color transitions

**Micro-interactions (Framer Motion):**
- Card entrance: Fade-up with stagger delay
- Counter animations: Spring animation from 0 to value
- Heatmap updates: Smooth color transitions (<200ms)
- Chart updates: Animated data point transitions
- Hover effects: Subtle lift (translateY: -2px) with shadow increase

**Performance Constraints:**
- Keep animations subtle and purposeful
- Limit to entrance/exit and state change animations
- No decorative animations that distract from data
- Ensure 60fps on mid-range devices

## Page-Specific Guidelines

### Landing Page (Home)
- Hero section with gradient background and primary CTA
- Product benefits showcased with icon cards
- Separate CTAs for Teachers and Institutions
- Social proof section with metrics or testimonials
- Feature highlights with visual demonstrations

### Teacher Dashboard
- Welcome header with personalized greeting
- Top row: Animated stats cards (3-4 metrics)
- Classroom/Subject grid with student count and avatars
- Quick action buttons for creating assessments and scheduling
- Search students with debounced filtering
- Real-time notifications panel

### Cognitive Labs / Live Heatmap
- Full-width heatmap grid displaying all students
- Color-coded cells with cognitive state indicators
- Hover tooltips showing real-time metrics
- Click to open student details drawer
- Drill-down navigation: Classroom → Units → Live Heatmap

### Student Dashboard
- Two-column layout: Profile (left) and Metrics (right)
- Interactive radar charts for cognitive profile
- Historical trend lines with zoom capability
- Assessment history timeline
- Downloadable report button

### Device Integration Hub
- Device status grid with connection indicators
- Real-time battery and signal strength displays
- Connection wizard with step-by-step guidance
- WebSocket activity log for debugging
- Firmware update panel with progress tracking

## Accessibility Requirements
- Maintain >4.5:1 contrast ratio for all text
- Keyboard navigation for all interactive elements
- Focus visible states with indigo ring indicators
- ARIA labels for icon-only buttons
- Screen reader announcements for real-time updates
- Color-blind friendly cognitive state indicators (include icons)

## Images
- **Hero Section:** Feature an inspiring educational technology image showing students engaged with modern learning tools or a conceptual visualization of cognitive tracking overlaid on a classroom scene
- **Product Benefits:** Icon-based illustrations rather than photos (custom icons or illustration library)
- **Device Integration:** Product photography of IoT devices if available, otherwise use 3D rendered device mockups
- **Student Avatars:** Placeholder avatars with initials on colored backgrounds using primary/secondary colors