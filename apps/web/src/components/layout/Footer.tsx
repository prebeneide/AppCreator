export function Footer() {
  return (
    <footer className="border-t border-edge/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-accent/20 border border-accent/40 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-sm bg-accent" />
          </div>
          <span className="text-ink-2 font-medium">AppCreator</span>
        </div>
        <p>© {new Date().getFullYear()} AppCreator. Build something great.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-ink-2 transition-colors">Privacy</a>
          <a href="#" className="hover:text-ink-2 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  )
}
