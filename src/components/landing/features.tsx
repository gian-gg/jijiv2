import { GlassCard } from '@/components/ui/backgrounds';
import {
  MessageSquare,
  Zap,
  Shield,
  Database,
  TrendingUp,
  BookOpen,
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Natural Language Queries',
    description:
      'Ask questions in plain English, get instant insights from your transaction history',
  },
  {
    icon: Zap,
    title: 'Dual AI Providers',
    description:
      'Choose between OpenRouter and Gemini for optimal performance and cost',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'Your API keys never leave your device. Bring your own key for complete control',
  },
  {
    icon: Database,
    title: 'SQL Under the Hood',
    description:
      'Powered by NL2SQL technology for accurate, efficient transaction queries',
  },
  {
    icon: TrendingUp,
    title: 'AI-Powered Insights',
    description:
      'Get intelligent spending patterns and recommendations powered by advanced AI',
  },
  {
    icon: BookOpen,
    title: 'Transaction History',
    description:
      'Organize and view all your manually entered transactions in one place',
  },
];

export function Features() {
  return (
    <section className="relative w-full px-6 py-16 md:py-20">
      {/* Background accent */}
      <div className="bg-grid-pattern-sm absolute inset-0 -z-10 opacity-20" />

      <div className="mx-auto w-full max-w-7xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Core Capabilities
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base">
            Everything you need to take control of your finances with AI-powered
            intelligence
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              <GlassCard className="group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col gap-4">
                  {/* Icon */}
                  <div className="bg-primary/10 border-primary/20 flex size-12 items-center justify-center border">
                    <feature.icon className="text-primary size-6" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="mb-2 text-sm font-bold tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground/80 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Decorative corner brackets */}
                <div className="border-primary/50 absolute -top-1 -left-1 h-3 w-3 border-t border-l opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="border-primary/50 absolute -top-1 -right-1 h-3 w-3 border-t border-r opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="border-primary/50 absolute -bottom-1 -left-1 h-3 w-3 border-b border-l opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="border-primary/50 absolute -right-1 -bottom-1 h-3 w-3 border-r border-b opacity-0 transition-opacity group-hover:opacity-100" />
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
