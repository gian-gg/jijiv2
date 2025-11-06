# jiji Design System

**Version 1.0** | Last Updated: November 2025

---

## 🎨 Brand Identity

**jiji** embraces a modern brutalist aesthetic that prioritizes **clarity over decoration** and **function over form**. Our design language combines the stark beauty of matte black surfaces with the gentle warmth of pastel purple accents, creating an interface that is both commanding and approachable.

### Mission Statement

Every pixel serves a purpose; every interaction is intentional. We celebrate geometric purity, raw materials, and purposeful minimalism while ensuring our interface remains accessible and user-friendly.

---

## 🎯 Design Principles

### 1. Brutalist Minimalism

- **Zero border radius** on all UI components (except avatars)
- Sharp corners and clean edges
- Purposeful use of negative space
- No decorative elements without function

### 2. WCAG AA Compliance

- All text/background pairings meet or exceed **WCAG AA standards**
- Minimum contrast ratio of **4.5:1** for body text
- Minimum contrast ratio of **3:1** for large text and UI components
- Enhanced focus indicators for keyboard navigation

### 3. Monospace Typography

- **JetBrains Mono** as primary font family
- Fallback to Fira Code and system monospace
- Technical, precise feel throughout the interface
- Equal character spacing for improved readability

### 4. Progressive Elevation

- Background layers create clear visual hierarchy
- Three-tier elevation system (background → card → popover)
- Subtle shadows for depth without distraction

---

## 🎨 Color Palette

### Brand Colors

#### Primary - Pastel Purple

```css
--primary: oklch(0.78 0.14 285);
```

- **Usage**: Primary CTA buttons, links, focus states, brand elements
- **Foreground**: `oklch(0.12 0 0)` (dark text on purple)
- **Contrast Ratio**: 7.8:1 (AAA compliant)

#### Accent - Pink-Purple

```css
--accent: oklch(0.73 0.12 310);
```

- **Usage**: Secondary highlights, special badges, complementary actions
- **Foreground**: `oklch(0.12 0 0)`
- **Contrast Ratio**: 6.5:1 (AAA compliant)

### Background Layers

Progressive elevation system for visual hierarchy:

| Layer      | Color             | Usage                           |
| ---------- | ----------------- | ------------------------------- |
| Background | `oklch(0.16 0 0)` | Base page background            |
| Card       | `oklch(0.19 0 0)` | Elevated containers, panels     |
| Popover    | `oklch(0.20 0 0)` | Floating UI elements, dropdowns |

**Foreground Colors:**

- Primary foreground: `oklch(0.98 0.01 270)` - High contrast white text
- Card foreground: `oklch(0.96 0.01 270)` - Slightly softer for elevated surfaces
- Muted foreground: `oklch(0.72 0.01 270)` - Secondary text, captions

### Semantic Colors

#### Success

```css
--success: oklch(0.68 0.14 160);
```

- **Usage**: Positive actions, confirmations, success states
- **Examples**: Completed transactions, successful saves

#### Warning

```css
--warning: oklch(0.75 0.16 80);
```

- **Usage**: Cautions, important notices, alerts
- **Examples**: Account limits, pending approvals

#### Destructive

```css
--destructive: oklch(0.62 0.22 27);
```

- **Usage**: Errors, delete actions, critical warnings
- **Foreground**: `oklch(0.98 0.01 270)` (white text on red)
- **Contrast Ratio**: 5.2:1 (AA compliant)

### Neutral Scale

11-step neutral scale for complex UI needs:

```css
--neutral-50: oklch(0.98 0 0) /* Near white */ --neutral-100: oklch(0.92 0 0)
  --neutral-200: oklch(0.82 0 0) --neutral-300: oklch(0.68 0 0)
  --neutral-400: oklch(0.52 0 0) --neutral-500: oklch(0.42 0 0)
  --neutral-600: oklch(0.32 0 0) --neutral-700: oklch(0.26 0 0)
  --neutral-800: oklch(0.19 0 0) --neutral-900: oklch(0.14 0 0)
  --neutral-950: oklch(0.1 0 0) /* Near black */;
```

### Chart Colors

Pastel palette for data visualization:

1. **Purple** - `oklch(0.78 0.14 285)` - Primary data series
2. **Cyan** - `oklch(0.72 0.12 210)` - Secondary series
3. **Mint** - `oklch(0.70 0.12 150)` - Tertiary series
4. **Yellow** - `oklch(0.75 0.12 65)` - Quaternary series
5. **Pink** - `oklch(0.73 0.14 340)` - Quinary series

---

## 📐 Typography

### Font Stack

```css
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Name      | Size | Weight         | Tailwind Class           | Usage              |
| --------- | ---- | -------------- | ------------------------ | ------------------ |
| Heading 1 | 36px | Bold (700)     | `text-4xl font-bold`     | Page titles        |
| Heading 2 | 30px | Semibold (600) | `text-3xl font-semibold` | Section headers    |
| Heading 3 | 24px | Semibold (600) | `text-2xl font-semibold` | Subsection headers |
| Heading 4 | 20px | Medium (500)   | `text-xl font-medium`    | Card titles        |
| Body      | 16px | Regular (400)  | `text-base`              | Body text          |
| Small     | 14px | Regular (400)  | `text-sm`                | Secondary text     |
| Caption   | 12px | Regular (400)  | `text-xs`                | Captions, labels   |

### Line Height

- Headings: `1.2` (tight)
- Body text: `1.5` (relaxed)
- Captions: `1.4` (comfortable)

---

## 📏 Spacing System

**Base unit**: 4px (0.25rem)

All spacing follows a consistent scale:

| Name | Value   | Pixels | Tailwind Class   | Common Usage      |
| ---- | ------- | ------ | ---------------- | ----------------- |
| XS   | 0.5rem  | 8px    | `gap-2`, `p-2`   | Tight spacing     |
| SM   | 0.75rem | 12px   | `gap-3`, `p-3`   | Compact elements  |
| MD   | 1rem    | 16px   | `gap-4`, `p-4`   | Default spacing   |
| LG   | 1.5rem  | 24px   | `gap-6`, `p-6`   | Section spacing   |
| XL   | 2rem    | 32px   | `gap-8`, `p-8`   | Major sections    |
| 2XL  | 3rem    | 48px   | `gap-12`, `p-12` | Page sections     |
| 3XL  | 4rem    | 64px   | `gap-16`, `p-16` | Hero sections     |
| 4XL  | 6rem    | 96px   | `gap-24`, `p-24` | Large separations |

### Spacing Guidelines

1. **Between major sections**: Use XL (32px) or 2XL (48px)
2. **Within components**: Use MD (16px) or LG (24px)
3. **Between related elements**: Use SM (12px) or MD (16px)
4. **Tight groupings**: Use XS (8px)

---

## 🧩 Core Components

### Buttons

#### Variants

**Default** - Primary CTA

```tsx
<Button>Click me</Button>
```

- Background: `primary`
- Text: `primary-foreground`
- Hover: 90% opacity
- Active: 80% opacity

**Secondary** - Secondary actions

```tsx
<Button variant="secondary">Secondary</Button>
```

- Background: `secondary`
- Hover: 80% opacity

**Outline** - Tertiary actions

```tsx
<Button variant="outline">Outline</Button>
```

- Border: `border`
- Hover: `secondary` background

**Ghost** - Minimal actions

```tsx
<Button variant="ghost">Ghost</Button>
```

- Transparent background
- Hover: `secondary` background

**Destructive** - Dangerous actions

```tsx
<Button variant="destructive">Delete</Button>
```

- Background: `destructive`
- Text: `destructive-foreground`

**Link** - Text link style

```tsx
<Button variant="link">Link</Button>
```

- Text: `primary`
- Underline on hover

#### Sizes

```tsx
<Button size="sm">Small</Button>      // h-9, text-xs
<Button size="default">Default</Button> // h-10, text-sm
<Button size="lg">Large</Button>      // h-11, text-base
<Button size="icon">🔥</Button>       // size-10 (square)
```

### Inputs

```tsx
<Input placeholder="Email address" type="email" />
```

**Features:**

- Height: 40px (h-10)
- Border: `border` color
- Background: `input` (semi-transparent dark)
- Focus: Purple ring with 3px width
- Error: Red border with red ring

### Cards

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>{/* Content */}</CardContent>
</Card>
```

**Features:**

- Background: `card`
- Border: `border`
- Sharp corners (no radius)
- 6-unit internal spacing
- Hover: Enhanced shadow

### Badges

```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>
```

**Features:**

- Height: Auto (py-0.5)
- Padding: px-2.5
- Font size: text-xs
- Sharp corners

---

## ♿ Accessibility

### Contrast Compliance

All color combinations tested and meet WCAG AA standards:

| Background  | Foreground             | Ratio  | Standard |
| ----------- | ---------------------- | ------ | -------- |
| Primary     | Primary-foreground     | 7.8:1  | AAA ✓    |
| Background  | Foreground             | 12.1:1 | AAA ✓    |
| Card        | Card-foreground        | 10.5:1 | AAA ✓    |
| Destructive | Destructive-foreground | 5.2:1  | AA ✓     |
| Secondary   | Secondary-foreground   | 8.5:1  | AAA ✓    |
| Muted       | Muted-foreground       | 4.8:1  | AA ✓     |

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Clear focus indicators (3px purple ring)
- Logical tab order
- Skip links for main content

### Screen Reader Support

- Semantic HTML elements
- ARIA labels where needed
- Clear heading hierarchy
- Alt text for images
- Screen reader only text for icons

---

## 📋 Usage Guidelines

### DO's ✅

1. **Maintain sharp edges** - Zero border radius except for avatars
2. **Use primary purple** for all CTAs and interactive elements
3. **Ensure minimum 24px spacing** between major sections
4. **Test color combinations** for WCAG AA compliance
5. **Use monospace typography** consistently
6. **Follow the elevation system** (background → card → popover)
7. **Provide clear focus states** for all interactive elements
8. **Use semantic color meanings** (destructive for errors, success for confirmations)

### DON'Ts ❌

1. **Don't add rounded corners** to UI components (brutalist principle)
2. **Don't use colors outside** the defined palette
3. **Don't create text-background pairs** below 4.5:1 contrast
4. **Don't mix different font families** (maintain monospace throughout)
5. **Don't use decorative elements** without functional purpose
6. **Don't override the spacing scale** with arbitrary values
7. **Don't use primary color** for non-interactive elements
8. **Don't stack more than 3 elevation levels**

---

## 🚀 Implementation Examples

### Page Layout

```tsx
<div className="bg-background min-h-screen">
  <header className="border-border bg-background/95 border-b px-6 py-3">
    {/* Header content */}
  </header>

  <main className="mx-auto max-w-7xl px-6 py-8">
    <div className="space-y-8">{/* Page sections with 32px spacing */}</div>
  </main>

  <footer className="border-border bg-background/95 border-t px-6 py-6">
    {/* Footer content */}
  </footer>
</div>
```

### Form Layout

```tsx
<form className="space-y-6">
  <div className="space-y-3">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>

  <div className="space-y-3">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" />
  </div>

  <Button type="submit" className="w-full">
    Sign In
  </Button>
</form>
```

### Dashboard Card

```tsx
<Card>
  <CardHeader>
    <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold">$12,345.67</div>
    <p className="text-muted-foreground mt-2 text-xs">+20% from last month</p>
  </CardContent>
</Card>
```

---

## 🎨 Gradients & Background Patterns

### Gradient System

Subtle gradients add depth and visual interest while maintaining accessibility and the brutalist aesthetic.

#### Gradient Variants

**Mesh Gradient** - Multi-point radial gradients

```css
.gradient-purple-mesh
```

- **Usage**: Hero sections, page backgrounds
- **Characteristics**: Complex, multi-layered radial gradients
- **Best with**: Low opacity (30-40%) for subtlety

**Radial Gradient** - Single centered gradient

```css
.gradient-purple-radial
```

- **Usage**: Card backgrounds, focal elements
- **Characteristics**: Simple radial from center
- **Best with**: Medium opacity (40-60%)

**Linear Gradient** - Diagonal gradient

```css
.gradient-purple-linear
```

- **Usage**: Section backgrounds, dividers
- **Characteristics**: 135° diagonal gradient
- **Best with**: Low to medium opacity (30-50%)

**Accent Glow** - Top-down glow effect

```css
.gradient-accent-glow
```

- **Usage**: Header backgrounds, hero sections
- **Characteristics**: Radial gradient from top center
- **Best with**: Any opacity, creates depth

**Animated Gradient** - Shifting gradient

```css
.gradient-animated
```

- **Usage**: Premium CTAs, loading states
- **Characteristics**: Continuously animating gradient
- **Best with**: Medium opacity (50-75%), use sparingly

### Background Patterns

Geometric patterns provide texture without overwhelming content.

#### Pattern Variants

**Dot Pattern (Regular)**

```css
.bg-dot-pattern
```

- 20px spacing
- 1px dots
- 15% opacity
- Best for: Large sections, hero backgrounds

**Dot Pattern (Small)**

```css
.bg-dot-pattern-sm
```

- 12px spacing
- 0.5px dots
- 10% opacity
- Best for: Subtle backgrounds, cards

**Grid Pattern (Regular)**

```css
.bg-grid-pattern
```

- 24px spacing
- 1px lines
- 8% opacity
- Best for: Technical/data-heavy sections

**Grid Pattern (Small)**

```css
.bg-grid-pattern-sm
```

- 16px spacing
- 1px lines
- 5% opacity
- Best for: Compact layouts, sidebars

### Glassmorphism Effects

Modern glass-like effects with backdrop blur.

```css
/* Normal glass */
.glass-effect
/* Strong glass */
.glass-effect-strong
```

**Usage Guidelines:**

- Use over gradients or patterns
- Limit to modals, floating cards, overlays
- Ensure text contrast remains WCAG AA compliant
- Test on various backgrounds

### Glow Effects

Purple glow effects for emphasis and CTAs.

```css
/* Subtle glow */
.glow-purple

/* Strong glow */
.glow-purple-strong
```

**Usage Guidelines:**

- Apply to primary CTAs for emphasis
- Use on hover states for interactive elements
- Combine with primary color for brand consistency
- Don't overuse - reserve for key actions

### Component Examples

#### Hero Section with Gradient

```tsx
import { HeroGradient } from '@/components/ui/backgrounds';

<section className="relative min-h-screen">
  <HeroGradient />
  <div className="relative z-10">{/* Your content */}</div>
</section>;
```

#### Card with Background Pattern

```tsx
import { BackgroundPattern } from '@/components/ui/backgrounds';

<BackgroundPattern variant="dots-sm">
  <Card>{/* Card content */}</Card>
</BackgroundPattern>;
```

#### Glass Card Overlay

```tsx
import { GlassCard, GradientBackground } from '@/components/ui/backgrounds';

<div className="relative h-64">
  <GradientBackground variant="mesh" className="absolute inset-0" />
  <GlassCard variant="normal">
    <h3>Featured Content</h3>
    <p>Glass effect creates depth and hierarchy</p>
  </GlassCard>
</div>;
```

#### Button with Glow

```tsx
<Button className="glow-purple-strong">Premium Action</Button>
```

### Best Practices

**DO:**

- ✅ Use gradients at 30-50% opacity for subtlety
- ✅ Combine mesh gradient + dot pattern for heroes
- ✅ Layer gradients behind content (z-index management)
- ✅ Test contrast ratios when overlaying text
- ✅ Use glow effects on primary CTAs
- ✅ Limit animated gradients to 1-2 per page

**DON'T:**

- ❌ Use high opacity gradients (>60%) on text backgrounds
- ❌ Mix too many pattern types on one page
- ❌ Apply glass effects to static content
- ❌ Overuse glow effects (reduces impact)
- ❌ Forget to test accessibility with patterns
- ❌ Use animated gradients everywhere

---

## 🔄 Version History

### Version 1.1 (November 2025)

- Added gradient system (mesh, radial, linear, animated)
- Implemented background patterns (dots, grid)
- Introduced glassmorphism effects
- Added glow effects for emphasis
- Created reusable background components
- Updated documentation with gradient examples

### Version 1.0 (November 2025)

- Initial design system establishment
- Improved color palette with WCAG AA compliance
- Enhanced contrast ratios (background lightened from 0.12 to 0.16)
- Comprehensive neutral scale (11 steps)
- Standardized component library
- Added semantic colors (success, warning)
- Refined spacing system
- Complete documentation

---

## 📚 Resources

- **Interactive Demo**: `/design-identity`
- **Component Library**: `/src/components/ui`
- **Global Styles**: `/src/app/globals.css`
- **Tailwind Config**: Inline in `globals.css`

---

## 🤝 Contributing

When adding new components or modifying existing ones:

1. Follow the established color palette
2. Maintain zero border radius (except avatars)
3. Test for WCAG AA contrast compliance
4. Use the spacing scale consistently
5. Ensure keyboard accessibility
6. Update this documentation

---

**Design System Maintained by**: jiji Team  
**Questions?**: Refer to `/design-identity` page for interactive examples
