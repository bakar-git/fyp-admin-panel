import { cn } from '@/lib/utils';
import { GalleryVerticalEndIcon } from 'lucide-react';

interface LogoIconProps {
    className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className }) => {
  return (
    <GalleryVerticalEndIcon className={cn("size-6", className)} />
  );
};

export default LogoIcon;