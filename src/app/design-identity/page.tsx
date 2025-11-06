'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BackgroundPattern,
  GradientBackground,
  GlassCard,
  HeroGradient,
} from '@/components/ui/backgrounds';
import { Check, Copy, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function DesignIdentityPage() {
  return (
    <div className="bg-background relative min-h-screen py-12">
      {/* Background effects */}
      <div className="gradient-purple-mesh pointer-events-none absolute inset-0 opacity-30" />
      <div className="bg-dot-pattern-sm pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative z-10 container mx-auto max-w-6xl space-y-16 px-6">
        {/* Header */}
        <header className="border-border space-y-6 border-b pb-8">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 border-primary/20 flex h-16 w-16 items-center justify-center border">
              <Sparkles className="text-primary h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                jiji Design System
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                A brutalist, accessible design language
              </p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Built on matte black foundations and pastel purple accents. Sharp
            edges, high contrast, and purposeful minimalism define every
            interaction.
          </p>
        </header>

        {/* Mission Statement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Brand Identity</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-foreground leading-relaxed">
                <strong className="text-primary">jiji</strong> embraces a modern
                brutalist aesthetic that prioritizes{' '}
                <strong>clarity over decoration</strong> and{' '}
                <strong>function over form</strong>. Our design language
                combines the stark beauty of matte black surfaces with the
                gentle warmth of pastel purple accents, creating an interface
                that is both commanding and approachable. Every pixel serves a
                purpose; every interaction is intentional.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Design Principles */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Design Principles</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Brutalist Minimalism</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Sharp corners, zero border radius, and purposeful negative
                  space. We celebrate geometric purity and raw materials.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">WCAG AA Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  All text-background pairings meet or exceed WCAG AA contrast
                  standards (4.5:1 for body, 3:1 for large text).
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monospace Typography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  JetBrains Mono throughout for a technical, precise feel. Every
                  character has equal space and weight.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Color Palette</h2>

          {/* Brand Colors */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Brand Colors</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <ColorSwatch
                name="Primary (Pastel Purple)"
                value="oklch(0.78 0.14 285)"
                textColor="dark"
                usage="Brand color, CTA buttons, links, focus states"
              />
              <ColorSwatch
                name="Accent (Pink-Purple)"
                value="oklch(0.73 0.12 310)"
                textColor="dark"
                usage="Secondary highlights, special badges"
              />
            </div>
          </div>

          {/* Background Layers */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Background Layers</h3>
            <p className="text-muted-foreground text-sm">
              Progressive elevation system for visual hierarchy
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <ColorSwatch
                name="Background"
                value="oklch(0.16 0 0)"
                textColor="light"
                usage="Base page background"
              />
              <ColorSwatch
                name="Card"
                value="oklch(0.19 0 0)"
                textColor="light"
                usage="Elevated containers"
              />
              <ColorSwatch
                name="Popover"
                value="oklch(0.2 0 0)"
                textColor="light"
                usage="Floating UI elements"
              />
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Semantic Colors</h3>
            <div className="grid gap-4 md:grid-cols-4">
              <ColorSwatch
                name="Success"
                value="oklch(0.68 0.14 160)"
                textColor="dark"
                usage="Positive actions, confirmations"
              />
              <ColorSwatch
                name="Warning"
                value="oklch(0.75 0.16 80)"
                textColor="dark"
                usage="Cautions, important notices"
              />
              <ColorSwatch
                name="Destructive"
                value="oklch(0.62 0.22 27)"
                textColor="light"
                usage="Errors, delete actions"
              />
              <ColorSwatch
                name="Muted"
                value="oklch(0.22 0 0)"
                textColor="light"
                usage="Subtle backgrounds, disabled states"
              />
            </div>
          </div>

          {/* Neutrals */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Neutral Scale</h3>
            <div className="grid grid-cols-5 gap-2 md:grid-cols-11">
              {[
                { name: '50', value: 'oklch(0.98 0 0)' },
                { name: '100', value: 'oklch(0.92 0 0)' },
                { name: '200', value: 'oklch(0.82 0 0)' },
                { name: '300', value: 'oklch(0.68 0 0)' },
                { name: '400', value: 'oklch(0.52 0 0)' },
                { name: '500', value: 'oklch(0.42 0 0)' },
                { name: '600', value: 'oklch(0.32 0 0)' },
                { name: '700', value: 'oklch(0.26 0 0)' },
                { name: '800', value: 'oklch(0.19 0 0)' },
                { name: '900', value: 'oklch(0.14 0 0)' },
                { name: '950', value: 'oklch(0.10 0 0)' },
              ].map((color) => (
                <div key={color.name} className="space-y-2">
                  <div
                    className="border-border h-12 border"
                    style={{ backgroundColor: color.value }}
                  />
                  <p className="text-muted-foreground text-center text-xs">
                    {color.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Typography</h2>
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm">Font Family</p>
                <p className="font-mono text-2xl">
                  JetBrains Mono, Fira Code, monospace
                </p>
              </div>

              <div className="border-border border-t pt-6">
                <h3 className="mb-4 text-lg font-medium">Type Scale</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-4xl font-bold">
                      Heading 1 - 36px / Bold
                    </p>
                    <code className="text-muted-foreground text-xs">
                      text-4xl font-bold
                    </code>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-semibold">
                      Heading 2 - 30px / Semibold
                    </p>
                    <code className="text-muted-foreground text-xs">
                      text-3xl font-semibold
                    </code>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-semibold">
                      Heading 3 - 24px / Semibold
                    </p>
                    <code className="text-muted-foreground text-xs">
                      text-2xl font-semibold
                    </code>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-medium">
                      Heading 4 - 20px / Medium
                    </p>
                    <code className="text-muted-foreground text-xs">
                      text-xl font-medium
                    </code>
                  </div>
                  <div className="space-y-1">
                    <p className="text-base">Body - 16px / Regular</p>
                    <code className="text-muted-foreground text-xs">
                      text-base
                    </code>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">Small - 14px / Regular</p>
                    <code className="text-muted-foreground text-xs">
                      text-sm
                    </code>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs">Caption - 12px / Regular</p>
                    <code className="text-muted-foreground text-xs">
                      text-xs
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spacing System */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Spacing System</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6 text-sm">
                4px base unit (0.25rem). All spacing follows a consistent scale.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { name: 'xs', value: '0.5rem', px: '8px' },
                  { name: 'sm', value: '0.75rem', px: '12px' },
                  { name: 'md', value: '1rem', px: '16px' },
                  { name: 'lg', value: '1.5rem', px: '24px' },
                  { name: 'xl', value: '2rem', px: '32px' },
                  { name: '2xl', value: '3rem', px: '48px' },
                  { name: '3xl', value: '4rem', px: '64px' },
                  { name: '4xl', value: '6rem', px: '96px' },
                ].map((space) => (
                  <div key={space.name} className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="bg-primary h-6"
                        style={{ width: space.value }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{space.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {space.value} ({space.px})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Core Components</h2>

          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Buttons</h3>
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm">Variants</p>
                  <div className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm">Sizes</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm">States</p>
                  <div className="flex flex-wrap gap-3">
                    <Button>Normal</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Badges */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Badges</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Inputs</h3>
            <Card>
              <CardContent className="space-y-4 pt-6">
                <Input placeholder="Default input" />
                <Input placeholder="Disabled input" disabled />
                <Input type="email" placeholder="Email input" />
              </CardContent>
            </Card>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Cards</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>
                    A brief description explaining the card's purpose
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Card content goes here. Cards provide elevation and grouping
                    for related content.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Statistics Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$12,345</div>
                  <p className="text-muted-foreground mt-2 text-xs">
                    +20% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gradients & Background Patterns */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Gradients & Patterns</h2>
          <p className="text-muted-foreground text-sm">
            Subtle gradients and background patterns add depth and visual
            interest while maintaining the brutalist aesthetic.
          </p>

          {/* Gradient Backgrounds */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Gradient Backgrounds</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Mesh Gradient */}
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <div className="gradient-purple-mesh border-border h-32 border" />
                  <div>
                    <p className="font-medium">Mesh Gradient</p>
                    <p className="text-muted-foreground text-xs">
                      Multi-point radial gradients
                    </p>
                    <code className="text-muted-foreground mt-1 block text-xs">
                      gradient-purple-mesh
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Radial Gradient */}
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <div className="gradient-purple-radial border-border h-32 border" />
                  <div>
                    <p className="font-medium">Radial Gradient</p>
                    <p className="text-muted-foreground text-xs">
                      Single centered gradient
                    </p>
                    <code className="text-muted-foreground mt-1 block text-xs">
                      gradient-purple-radial
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Linear Gradient */}
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <div className="gradient-purple-linear border-border h-32 border" />
                  <div>
                    <p className="font-medium">Linear Gradient</p>
                    <p className="text-muted-foreground text-xs">
                      Diagonal gradient wash
                    </p>
                    <code className="text-muted-foreground mt-1 block text-xs">
                      gradient-purple-linear
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Glow Effect */}
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <div className="gradient-accent-glow border-border h-32 border" />
                  <div>
                    <p className="font-medium">Accent Glow</p>
                    <p className="text-muted-foreground text-xs">
                      Top-down glow effect
                    </p>
                    <code className="text-muted-foreground mt-1 block text-xs">
                      gradient-accent-glow
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Animated Gradient */}
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <div className="gradient-animated border-border h-32 border" />
                  <div>
                    <p className="font-medium">Animated Gradient</p>
                    <p className="text-muted-foreground text-xs">
                      Shifting gradient animation
                    </p>
                    <code className="text-muted-foreground mt-1 block text-xs">
                      gradient-animated
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Hero Gradient */}
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <div className="border-border relative h-32 overflow-hidden border">
                    <HeroGradient />
                  </div>
                  <div>
                    <p className="font-medium">Hero Gradient</p>
                    <p className="text-muted-foreground text-xs">
                      Mesh + dots + vignette
                    </p>
                    <code className="text-muted-foreground mt-1 block text-xs">
                      &lt;HeroGradient /&gt;
                    </code>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Background Patterns */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Background Patterns</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Dot Pattern */}
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <div className="bg-dot-pattern border-border h-32 border" />
                  <div>
                    <p className="font-medium">Dots</p>
                    <p className="text-muted-foreground text-xs">
                      20px spacing
                    </p>
                    <code className="text-muted-foreground mt-1 block text-xs">
                      bg-dot-pattern
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Dot Pattern Small */}
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <div className="bg-dot-pattern-sm border-border h-32 border" />
                  <div>
                    <p className="font-medium">Dots Small</p>
                    <p className="text-muted-foreground text-xs">
                      12px spacing
                    </p>
                    <code className="text-muted-foreground mt-1 block text-xs">
                      bg-dot-pattern-sm
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Grid Pattern */}
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <div className="bg-grid-pattern border-border h-32 border" />
                  <div>
                    <p className="font-medium">Grid</p>
                    <p className="text-muted-foreground text-xs">
                      24px spacing
                    </p>
                    <code className="text-muted-foreground mt-1 block text-xs">
                      bg-grid-pattern
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Grid Pattern Small */}
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <div className="bg-grid-pattern-sm border-border h-32 border" />
                  <div>
                    <p className="font-medium">Grid Small</p>
                    <p className="text-muted-foreground text-xs">
                      16px spacing
                    </p>
                    <code className="text-muted-foreground mt-1 block text-xs">
                      bg-grid-pattern-sm
                    </code>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Glassmorphism */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Glassmorphism Effects</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Normal Glass */}
              <div className="border-border relative h-48 overflow-hidden border">
                <div className="gradient-purple-mesh absolute inset-0" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <GlassCard variant="normal">
                    <p className="font-medium">Normal Glass Effect</p>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Backdrop blur with semi-transparent background
                    </p>
                    <code className="text-muted-foreground mt-2 block text-xs">
                      glass-effect
                    </code>
                  </GlassCard>
                </div>
              </div>

              {/* Strong Glass */}
              <div className="border-border relative h-48 overflow-hidden border">
                <div className="gradient-purple-mesh absolute inset-0" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <GlassCard variant="strong">
                    <p className="font-medium">Strong Glass Effect</p>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Enhanced blur with higher opacity
                    </p>
                    <code className="text-muted-foreground mt-2 block text-xs">
                      glass-effect-strong
                    </code>
                  </GlassCard>
                </div>
              </div>
            </div>
          </div>

          {/* Glow Effects */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Glow Effects</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glow-purple">
                <CardContent className="pt-6 text-center">
                  <p className="font-medium">Purple Glow</p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Subtle glow for emphasis
                  </p>
                  <code className="text-muted-foreground mt-3 block text-xs">
                    glow-purple
                  </code>
                </CardContent>
              </Card>

              <Card className="glow-purple-strong">
                <CardContent className="pt-6 text-center">
                  <p className="font-medium">Strong Purple Glow</p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Enhanced glow for CTAs
                  </p>
                  <code className="text-muted-foreground mt-3 block text-xs">
                    glow-purple-strong
                  </code>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Usage Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usage Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Hero Sections</p>
                <code className="text-muted-foreground bg-secondary block rounded-sm p-3 text-xs">
                  {`<div className="relative">
  <HeroGradient />
  {/* Your content */}
</div>`}
                </code>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Subtle Card Enhancement</p>
                <code className="text-muted-foreground bg-secondary block rounded-sm p-3 text-xs">
                  {`<Card className="gradient-purple-linear opacity-50">
  {/* Card content */}
</Card>`}
                </code>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Background Pattern</p>
                <code className="text-muted-foreground bg-secondary block rounded-sm p-3 text-xs">
                  {`<BackgroundPattern variant="dots">
  {/* Your content */}
</BackgroundPattern>`}
                </code>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Accessibility Standards</h2>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-lg font-medium">
                  <Check className="text-success h-5 w-5" />
                  WCAG AA Compliant
                </h3>
                <p className="text-muted-foreground text-sm">
                  All color combinations meet minimum contrast ratios (4.5:1 for
                  normal text, 3:1 for large text).
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-lg font-medium">
                  <Check className="text-success h-5 w-5" />
                  Keyboard Navigation
                </h3>
                <p className="text-muted-foreground text-sm">
                  All interactive elements are keyboard accessible with clear
                  focus indicators.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-lg font-medium">
                  <Check className="text-success h-5 w-5" />
                  Semantic HTML
                </h3>
                <p className="text-muted-foreground text-sm">
                  Proper use of headings, landmarks, and ARIA attributes for
                  screen readers.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Usage Guidelines */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Usage Guidelines</h2>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h3 className="mb-2 text-lg font-medium">Do's</h3>
                <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                  <li>
                    Maintain zero border radius for all components (sharp edges)
                  </li>
                  <li>Use primary purple for CTAs and interactive elements</li>
                  <li>Ensure minimum 24px spacing between major sections</li>
                  <li>
                    Test all new color combinations for WCAG AA compliance
                  </li>
                  <li>Use monospace typography consistently</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium">Don'ts</h3>
                <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                  <li>Don't add rounded corners or soft edges</li>
                  <li>Don't use colors outside the defined palette</li>
                  <li>
                    Don't create text-background pairs below 4.5:1 contrast
                  </li>
                  <li>Don't mix different font families</li>
                  <li>Don't use decorative elements without purpose</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-border border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            jiji Design System v1.0 · Last updated November 2025
          </p>
        </footer>
      </div>
    </div>
  );
}

// Color swatch component
function ColorSwatch({
  name,
  value,
  textColor,
  usage,
}: {
  name: string;
  value: string;
  textColor: 'light' | 'dark';
  usage: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden">
      <div
        className="border-border h-24 border-b transition-all hover:h-32"
        style={{ backgroundColor: value }}
      />
      <CardContent className="pt-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex-1">
            <p className="font-medium">{name}</p>
            <button
              onClick={copyToClipboard}
              className="text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1 text-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  {value}
                </>
              )}
            </button>
          </div>
        </div>
        <p className="text-muted-foreground text-xs">{usage}</p>
      </CardContent>
    </Card>
  );
}
