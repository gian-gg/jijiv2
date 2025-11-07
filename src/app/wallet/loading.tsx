export default function Loading() {
  return (
    <>
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <div className="bg-muted/40 h-7 w-32 animate-pulse" />
        <div className="bg-muted/40 h-4 w-48 animate-pulse" />
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-background/40 border-border border p-3">
            <div className="space-y-3">
              <div className="bg-muted/40 h-3 w-24 animate-pulse" />
              <div className="bg-muted/40 h-6 w-20 animate-pulse" />
              <div className="bg-muted/40 h-3 w-16 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="bg-background/40 border-border flex flex-1 flex-col gap-4 border p-4">
        <div className="bg-muted/40 h-6 w-40 animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-muted/40 size-10 animate-pulse" />
                <div className="space-y-2">
                  <div className="bg-muted/40 h-4 w-32 animate-pulse" />
                  <div className="bg-muted/40 h-3 w-24 animate-pulse" />
                </div>
              </div>
              <div className="bg-muted/40 h-5 w-16 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
