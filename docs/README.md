# jiji Design System Documentation

Welcome to the jiji design system documentation. This folder contains comprehensive guides for implementing and maintaining the design language.

## 📚 Documentation Files

### [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

**Complete design system specification**

The authoritative source for the entire design system, including:

- Brand identity and mission
- Design principles
- Complete color palette with hex codes
- Typography scales and font specifications
- Spacing system (4px base unit)
- Component library documentation
- Gradient and pattern system
- Accessibility standards (WCAG AA compliance)
- Usage guidelines and best practices

**When to use**: Reference for comprehensive understanding, onboarding new designers/developers, design decisions.

---

### [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

**Developer quick reference guide**

A condensed, searchable reference for day-to-day development:

- CSS class cheat sheet
- Color utilities (quick copy)
- Typography shortcuts
- Spacing scale
- Component usage examples
- Common UI patterns
- Gradient and pattern classes
- Accessibility checklist

**When to use**: Daily development, quick lookups, implementation guidance.

---

### [GRADIENT_EXTENSION.md](./GRADIENT_EXTENSION.md)

**Gradient system extension documentation**

Detailed documentation of the gradient and background pattern system:

- All gradient variants and specifications
- Background pattern types
- Glassmorphism effects
- Glow effects
- React component API
- Implementation examples
- Before/after comparison
- Future enhancement roadmap

**When to use**: Working with gradients, understanding the pattern system, advanced visual effects.

---

## 🎨 Design System at a Glance

### Core Principles

1. **Brutalist Minimalism** - Sharp edges, zero border radius
2. **WCAG AA Compliance** - Accessibility first
3. **Monospace Typography** - JetBrains Mono throughout
4. **Progressive Elevation** - Layered backgrounds for hierarchy

### Brand Colors

- **Primary**: Pastel Purple `oklch(0.78 0.14 285)`
- **Accent**: Pink-Purple `oklch(0.73 0.12 310)`
- **Background**: Matte Black `oklch(0.16 0 0)`

### Key Features

- ✅ Dark mode only (brutalist aesthetic)
- ✅ Sharp corners (0 border radius)
- ✅ High contrast text (WCAG AAA where possible)
- ✅ Purple gradient system
- ✅ Geometric background patterns
- ✅ Glassmorphism effects
- ✅ Purposeful glow effects

---

## 🚀 Quick Start

### For Designers

1. **Read**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Understand principles
2. **Visit**: `/design-identity` page - See interactive examples
3. **Reference**: Color palette, typography, spacing sections
4. **Test**: Use the neutral scale for complex UIs

### For Developers

1. **Bookmark**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
2. **Import**: Components from `@/components/ui`
3. **Use**: Pre-defined CSS classes from globals.css
4. **Check**: Accessibility guidelines before shipping

### For Product Managers

1. **Review**: Brand identity section in DESIGN_SYSTEM.md
2. **Understand**: Design constraints (sharp edges, dark mode)
3. **Reference**: Component library for feature discussions
4. **Align**: Ensure features match design principles

---

## 🧩 Component Library

All UI components are located in `/src/components/ui/`:

### Core Components

- `button.tsx` - 6 variants, 4 sizes
- `input.tsx` - Text input with focus states
- `card.tsx` - Container component
- `badge.tsx` - Status and category labels

### Background Components

- `backgrounds.tsx` - Gradients, patterns, glass effects

### Other Components

- `dialog.tsx` - Modal dialogs
- `dropdown-menu.tsx` - Context menus
- `popover.tsx` - Floating content
- `separator.tsx` - Visual dividers
- `label.tsx` - Form labels
- `avatar.tsx` - User avatars

---

## 📏 Spacing Scale

Base unit: **4px (0.25rem)**

| Name | Value | Common Use       |
| ---- | ----- | ---------------- |
| XS   | 8px   | Tight spacing    |
| SM   | 12px  | Compact elements |
| MD   | 16px  | Default spacing  |
| LG   | 24px  | Section spacing  |
| XL   | 32px  | Major sections   |
| 2XL  | 48px  | Page sections    |

---

## 🎨 Gradient Quick Reference

```tsx
// CSS Classes
className = 'gradient-purple-mesh'; // Hero backgrounds
className = 'gradient-purple-radial'; // Card accents
className = 'bg-dot-pattern'; // Subtle texture
className = 'glass-effect'; // Glassmorphism
className = 'glow-purple'; // Emphasis

// React Components
import {
  HeroGradient,
  BackgroundPattern,
  GlassCard,
} from '@/components/ui/backgrounds';
```

---

## ♿ Accessibility Standards

All design elements meet **WCAG AA** standards minimum:

- **Text Contrast**: 4.5:1 minimum (normal text)
- **Large Text**: 3:1 minimum
- **Focus States**: 3px purple ring on all interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Semantic HTML and ARIA labels

---

## 🔄 Version History

### v1.1 (November 2025)

- Added gradient system (mesh, radial, linear, animated)
- Implemented background patterns (dots, grid)
- Introduced glassmorphism and glow effects
- Created background component library

### v1.0 (November 2025)

- Initial design system establishment
- Improved color palette with WCAG AA compliance
- Comprehensive component library
- Complete documentation

---

## 🔗 Resources

- **Interactive Demo**: [/design-identity](/design-identity)
- **Component Source**: `/src/components/ui`
- **Global Styles**: `/src/app/globals.css`
- **GitHub**: Check repository for latest updates

---

## 🤝 Contributing

When making changes to the design system:

1. ✅ Follow established principles (brutalist, accessible, monospace)
2. ✅ Maintain WCAG AA compliance
3. ✅ Use the color palette (no arbitrary colors)
4. ✅ Test keyboard navigation
5. ✅ Update documentation
6. ✅ Add examples to `/design-identity` page

---

## 📞 Support

Questions about the design system?

1. Check [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for quick answers
2. Review [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for comprehensive info
3. Visit `/design-identity` for interactive examples
4. Check component source code for implementation details

---

**Last Updated**: November 2025  
**Design System Version**: 1.1  
**Maintained by**: jiji Team
