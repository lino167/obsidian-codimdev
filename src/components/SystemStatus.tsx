import { motion } from "framer-motion";

const SystemStatus = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm"
    >
      <div className="container flex items-center justify-between py-2 text-xs">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-mono text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 status-pulse" />
            <span>SYSTEM: ONLINE</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 status-pulse" />
            <span>SERVER: ACTIVE</span>
          </div>
        </div>
        <div className="font-mono text-muted-foreground">
          <span className="text-primary">v1.0</span> // BUILD STABLE
        </div>
      </div>
    </motion.div>
  );
};

export default SystemStatus;
