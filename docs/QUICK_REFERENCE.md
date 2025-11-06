# Quick Reference - jiji Design System

A quick reference guide for developers working with the jiji design system.

---

## 🎨 Colors (Quick Copy)

### Brand

```tsx
// Primary CTA
className = 'bg-primary text-primary-foreground';

// Accent highlight
className = 'bg-accent text-accent-foreground';
```

### Backgrounds

```tsx
// Base page
className = 'bg-background text-foreground';

// Elevated card
className = 'bg-card text-card-foreground';

// Popover/dropdown
className = 'bg-popover text-popover-foreground';
```

### Semantic

```tsx
// Success
className = 'bg-success text-success-foreground';

// Warning
className = 'bg-warning text-warning-foreground';

// Error/Destructive
className = 'bg-destructive text-destructive-foreground';

// Muted/Secondary
className = 'bg-secondary text-secondary-foreground';
```

### Text Colors

```tsx
className = 'text-foreground'; // Primary text (high contrast)
className = 'text-muted-foreground'; // Secondary text (medium contrast)
className = 'text-primary'; // Brand color text
className = 'text-destructive'; // Error text
```

### Borders

```tsx
className = 'border border-border'; // Standard border
className = 'border-destructive'; // Error border
className = 'border-primary'; // Accent border
```

---

## 📐 Typography

### Headings

```tsx
className = 'text-4xl font-bold'; // H1 - Page titles
className = 'text-3xl font-semibold'; // H2 - Section headers
className = 'text-2xl font-semibold'; // H3 - Subsections
className = 'text-xl font-medium'; // H4 - Card titles
```

### Body

```tsx
className = 'text-base'; // 16px - Default body
className = 'text-sm'; // 14px - Secondary text
className = 'text-xs'; // 12px - Captions
```

### Weights

```tsx
className = 'font-bold'; // 700
className = 'font-semibold'; // 600
className = 'font-medium'; // 500
className = 'font-normal'; // 400
```

---

## 📏 Spacing

### Gaps

```tsx
className = 'space-y-2'; // 8px vertical
className = 'space-y-3'; // 12px vertical
className = 'space-y-4'; // 16px vertical
className = 'space-y-6'; // 24px vertical
className = 'space-y-8'; // 32px vertical
className = 'space-y-12'; // 48px vertical

className = 'gap-2'; // 8px flex/grid
className = 'gap-4'; // 16px flex/grid
className = 'gap-6'; // 24px flex/grid
className = 'gap-8'; // 32px flex/grid
```

### Padding

```tsx
className = 'p-3'; // 12px all sides (compact)
className = 'p-4'; // 16px all sides (default)
className = 'p-6'; // 24px all sides (comfortable)
className = 'p-8'; // 32px all sides (spacious)

className = 'px-6 py-3'; // Common for headers/buttons
```

### Margins

```tsx
className = 'mt-6'; // 24px top margin
className = 'mb-8'; // 32px bottom margin
className = 'my-12'; // 48px vertical margin
```

---

## 🎨 Gradients & Patterns (Quick Use)

### Gradient Classes

```tsx
// Mesh gradient (hero sections)
className = 'gradient-purple-mesh';

// Radial gradient (focal elements)
className = 'gradient-purple-radial';

// Linear gradient (sections)
className = 'gradient-purple-linear';

// Top glow effect
className = 'gradient-accent-glow';

// Animated gradient (premium CTAs)
className = 'gradient-animated';
```

### Background Patterns

```tsx
// Dot patterns
className = 'bg-dot-pattern'; // 20px spacing
className = 'bg-dot-pattern-sm'; // 12px spacing

// Grid patterns
className = 'bg-grid-pattern'; // 24px spacing
className = 'bg-grid-pattern-sm'; // 16px spacing
```

### Glass Effects

```tsx
className = 'glass-effect'; // Normal glass
className = 'glass-effect-strong'; // Enhanced glass
```

### Glow Effects

```tsx
className = 'glow-purple'; // Subtle glow
className = 'glow-purple-strong'; // Strong glow (CTAs)
```

### Background Components

```tsx
import {
  BackgroundPattern,
  GradientBackground,
  GlassCard,
  HeroGradient
} from '@/components/ui/backgrounds';

// Hero section
<div className="relative">
  <HeroGradient />
  {/* content */}
</div>

// Subtle pattern
<BackgroundPattern variant="dots-sm">
  {/* content */}
</BackgroundPattern>

// Gradient overlay
<GradientBackground variant="mesh" intensity="subtle">
  {/* content */}
</GradientBackground>

// Glass card
<GlassCard variant="normal">
  {/* content */}
</GlassCard>
```

---

## 🎯 Common Patterns

### Page Container

```tsx
<div className="bg-background min-h-screen">
  <header className="border-border bg-background/95 sticky top-0 z-50 border-b px-6 py-3 backdrop-blur">
    {/* Header */}
  </header>

  <main className="mx-auto max-w-7xl px-6 py-8">
    <div className="space-y-8">{/* Content */}</div>
  </main>

  <footer className="border-border border-t px-6 py-6">{/* Footer */}</footer>
</div>
```

### Section Header

```tsx
<div className="space-y-2">
  <h2 className="text-4xl font-bold tracking-tight">Section Title</h2>
  <p className="text-muted-foreground text-lg">Section description</p>
</div>
```

### Form Field

```tsx
<div className="space-y-3">
  <Label htmlFor="field">Field Label</Label>
  <Input id="field" placeholder="Placeholder" />
  <p className="text-muted-foreground text-xs">Helper text</p>
</div>
```

### Card Grid

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Card>
    <CardHeader>
      <CardTitle>Title</CardTitle>
      <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent>{/* Content */}</CardContent>
  </Card>
  {/* More cards */}
</div>
```

### Stat Card

```tsx
<Card>
  <CardHeader>
    <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold">$12,345</div>
    <p className="text-muted-foreground mt-2 text-xs">+20% from last month</p>
  </CardContent>
</Card>
```

### Button Group

```tsx
<div className="flex flex-wrap gap-2">
  <Button>Primary Action</Button>
  <Button variant="outline">Secondary</Button>
  <Button variant="ghost">Tertiary</Button>
</div>
```

### Alert/Notice

```tsx
<div className="border-destructive bg-destructive/10 rounded-sm border-2 border-dashed p-4">
  <p className="text-destructive text-sm">Error or warning message</p>
</div>
```

---

## 🎯 Component Quick Reference

### Button

```tsx
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="link">Link</Button>

<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

<Button disabled>Disabled</Button>
```

### Input

```tsx
<Input type="text" placeholder="Text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input disabled placeholder="Disabled" />
```

### Badge

```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>
```

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

---

## 🔍 Focus States

All interactive elements automatically get purple focus rings:

```tsx
// Applied automatically via global styles
focus-visible:border-ring
focus-visible:ring-ring/50
focus-visible:ring-[3px]
```

No need to add manually unless customizing!

---

## ♿ Accessibility Checklist

✅ **Color contrast**: All combinations are WCAG AA compliant  
✅ **Focus indicators**: Purple ring on all interactive elements  
✅ **Keyboard navigation**: Tab through all elements  
✅ **ARIA labels**: Added where needed  
✅ **Semantic HTML**: Use proper heading hierarchy  
✅ **Alt text**: All images have descriptions

---

## 🚫 Common Mistakes to Avoid

❌ Adding `rounded-*` classes (keep sharp edges!)  
❌ Using arbitrary colors outside the palette  
❌ Low contrast text (always check!)  
❌ Mixing font families  
❌ Arbitrary spacing values (use the scale!)  
❌ Missing focus states on interactive elements  
❌ Skipping keyboard accessibility

---

## 💡 Pro Tips

1. **Use semantic HTML**: `<button>` not `<div onClick>`
2. **Space consistently**: Stick to the 4px base unit
3. **Layer properly**: background → card → popover
4. **Test contrast**: Use browser DevTools
5. **Test keyboard**: Tab through your UI
6. **Use the scale**: Don't invent new spacing values
7. **Stay sharp**: No rounded corners (except avatars)
8. **Primary is precious**: Use purple only for CTAs

---

## 🔗 Quick Links

- **Interactive Examples**: [/design-identity](/design-identity)
- **Full Documentation**: `/docs/DESIGN_SYSTEM.md`
- **Component Source**: `/src/components/ui`
- **Global Styles**: `/src/app/globals.css`

---

Last Updated: November 2025
