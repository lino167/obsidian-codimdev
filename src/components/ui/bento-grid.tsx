import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  status,
  load,
  version,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  status?: string;
  load?: string;
  version?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative row-span-1 flex flex-col justify-between p-6 border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-500",
        className
      )}
    >
      {/* Hover gradient border effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute inset-[1px] bg-card" />
      </div>

      {/* Status bar */}
      <div className="absolute top-3 right-3 flex items-center gap-3 font-mono text-[10px] text-muted-foreground z-10">
        {status && (
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-emerald-500 status-pulse" />
            {status}
          </span>
        )}
        {load && <span className="text-primary">{load}</span>}
        {version && <span className="border border-border px-1.5 py-0.5">{version}</span>}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {header}
        <div className="mt-4 flex items-start gap-3">
          {icon && (
            <div className="flex-shrink-0 p-2 border border-border bg-secondary/50 text-primary group-hover:border-primary/30 transition-colors">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom scan line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};
