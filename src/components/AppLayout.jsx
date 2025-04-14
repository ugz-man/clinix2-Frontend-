function AppLayout({ children }) {
  return (
    <div className="dark:bg-dark-background-500 flex h-[100dvh] flex-col justify-between gap-2 overflow-hidden p-4">
      {children}
    </div>
  );
}

export default AppLayout;
