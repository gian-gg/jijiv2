import { cn } from '@/lib/utils';

interface BackgroundPatternProps {
  variant?: 'dots' | 'dots-sm' | 'grid' | 'grid-sm' | 'mesh' | 'radial';
  className?: string;
  children?: React.ReactNode;
}

/**
 * BackgroundPattern - Adds subtle background patterns to containers
 *
 * Variants:
 * - dots: Regular dot pattern (20px spacing)
 * - dots-sm: Small dot pattern (12px spacing)
 * - grid: Regular grid pattern (24px spacing)
 * - grid-sm: Small grid pattern (16px spacing)
 * - mesh: Multi-point radial gradient mesh
 * - radial: Single radial gradient
 */
export function BackgroundPattern({
  variant = 'dots',
  className,
  children,
}: BackgroundPatternProps) {
  const patternClasses = {
    dots: 'bg-dot-pattern',
    'dots-sm': 'bg-dot-pattern-sm',
    grid: 'bg-grid-pattern',
    'grid-sm': 'bg-grid-pattern-sm',
    mesh: 'gradient-purple-mesh',
    radial: 'gradient-purple-radial',
  };

  return (
    <div className={cn('relative', className)}>
      <div className={cn('absolute inset-0 -z-10', patternClasses[variant])} />
      {children}
    </div>
  );
}

interface GradientBackgroundProps {
  variant?: 'mesh' | 'radial' | 'linear' | 'glow' | 'animated';
  className?: string;
  children?: React.ReactNode;
  intensity?: 'subtle' | 'normal' | 'strong';
}

/**
 * GradientBackground - Adds gradient effects to containers
 *
 * Variants:
 * - mesh: Multi-point radial gradient (recommended for heroes)
 * - radial: Single centered radial gradient
 * - linear: Diagonal linear gradient
 * - glow: Top glow effect
 * - animated: Animated shifting gradient
 */
export function GradientBackground({
  variant = 'mesh',
  className,
  children,
  intensity = 'normal',
}: GradientBackgroundProps) {
  const gradientClasses = {
    mesh: 'gradient-purple-mesh',
    radial: 'gradient-purple-radial',
    linear: 'gradient-purple-linear',
    glow: 'gradient-accent-glow',
    animated: 'gradient-animated',
  };

  const intensityModifier =
    intensity === 'subtle'
      ? 'opacity-50'
      : intensity === 'strong'
        ? 'opacity-100'
        : 'opacity-75';

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'absolute inset-0 -z-10',
          gradientClasses[variant],
          intensityModifier
        )}
      />
      {children}
    </div>
  );
}

interface GlassCardProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'normal' | 'strong';
}

/**
 * GlassCard - Glassmorphism card with blur effect
 *
 * Usage: Use for floating cards, modals, or overlays
 */
export function GlassCard({
  className,
  children,
  variant = 'normal',
}: GlassCardProps) {
  const glassClass =
    variant === 'strong' ? 'glass-effect-strong' : 'glass-effect';

  return <div className={cn(glassClass, 'p-6', className)}>{children}</div>;
}

interface GradientBorderProps {
  className?: string;
  children?: React.ReactNode;
  borderWidth?: number;
}

/**
 * GradientBorder - Wrapper with purple gradient border
 *
 * Usage: Highlight important cards or CTAs
 */
export function GradientBorder({
  className,
  children,
  borderWidth = 1,
}: GradientBorderProps) {
  return (
    <div
      className={cn('border-gradient-purple', className)}
      style={{ padding: borderWidth }}
    >
      {children}
    </div>
  );
}

interface HeroGradientProps {
  className?: string;
}

/**
 * HeroGradient - Combined mesh gradient + dot pattern for hero sections
 */
export function HeroGradient({ className }: HeroGradientProps) {
  return (
    <div className={cn('absolute inset-0 -z-10 overflow-hidden', className)}>
      {/* Mesh gradient base */}
      <div className="gradient-purple-mesh absolute inset-0 opacity-80" />

      {/* Dot pattern overlay */}
      <div className="bg-dot-pattern absolute inset-0 opacity-40" />

      {/* Vignette effect */}
      <div className="to-background absolute inset-0 bg-gradient-to-b from-transparent via-transparent" />
    </div>
  );
}
