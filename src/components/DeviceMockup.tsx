import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DeviceMockupProps {
  children: ReactNode;
}

const NotebookMockup = ({ children }: { children: ReactNode }) => (
  <div className="w-[90%] max-w-[1100px] mx-auto">
    {/* Screen */}
    <div className="rounded-t-xl border border-border/50 bg-[hsl(240,15%,6%)] shadow-2xl shadow-primary/10 overflow-hidden">
      {/* macOS bar */}
      <div className="h-8 bg-muted/50 flex items-center px-4 gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,55%)]" />
        <div className="w-3 h-3 rounded-full bg-[hsl(45,80%,55%)]" />
        <div className="w-3 h-3 rounded-full bg-[hsl(120,55%,48%)]" />
        <span className="ml-3 text-xs text-muted-foreground font-body">Portfolio</span>
      </div>
      {/* Content area */}
      <div className="p-4 md:p-6 max-h-[520px] overflow-y-auto scrollbar-thin">
        {children}
      </div>
    </div>
    {/* Hinge / base */}
    <div className="mx-auto w-[110%] -ml-[5%] h-3 rounded-b-xl gradient-bg opacity-30" />
  </div>
);

const SmartphoneMockup = ({ children }: { children: ReactNode }) => (
  <div className="w-[320px] mx-auto rounded-[40px] border-[3px] border-muted bg-[hsl(240,15%,6%)] shadow-2xl shadow-primary/10 p-2 flex flex-col">
    {/* Notch / Dynamic Island */}
    <div className="flex justify-center pt-2 pb-3">
      <div className="w-24 h-5 rounded-full bg-muted" />
    </div>
    {/* Content area */}
    <div className="flex-1 rounded-[28px] overflow-hidden">
      <div className="p-3 max-h-[500px] overflow-y-auto scrollbar-thin">
        {children}
      </div>
    </div>
    {/* Home indicator */}
    <div className="flex justify-center py-2">
      <div className="w-32 h-1 rounded-full bg-muted/50" />
    </div>
  </div>
);

const DeviceMockup = ({ children }: DeviceMockupProps) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <SmartphoneMockup>{children}</SmartphoneMockup>
  ) : (
    <NotebookMockup>{children}</NotebookMockup>
  );
};

export default DeviceMockup;
