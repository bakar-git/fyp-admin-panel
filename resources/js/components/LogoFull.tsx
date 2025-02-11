import { cn } from '@/lib/utils';
import LogoIcon from './LogoIcon';

interface LogoFullProps {
  className?: string;
}

const LogoFull: React.FC<LogoFullProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center gap-2 font-medium", className)}>
      <LogoIcon />
      POSTIFY
    </div>
  );
};

export default LogoFull;