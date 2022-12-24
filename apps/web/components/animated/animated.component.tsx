import { motion } from 'framer-motion';

export const Animated = ({
  children,
  activeKey,
  className,
}: {
  children: React.ReactNode;
  activeKey?: any;
  className?: string;
}) => {
  return (
    <motion.div
      key={activeKey}
      className={className}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};
