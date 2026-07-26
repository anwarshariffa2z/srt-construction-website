export function GrainOverlay() {
  return (
    <>
      <div 
        className="fixed -inset-[100px] pointer-events-none z-[200] opacity-[0.055]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          animation: "grain 900ms steps(4) infinite"
        }}
        aria-hidden="true"
      />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes grain {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-40px, 30px); }
          50% { transform: translate(30px, -45px); }
          75% { transform: translate(-25px, -20px); }
          100% { transform: translate(0, 0); }
        }
      `}} />
    </>
  );
}
