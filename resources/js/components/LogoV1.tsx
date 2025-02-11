import { cn } from '@/lib/utils';
import { GalleryVerticalEndIcon } from 'lucide-react';

interface LogoV1Props {
    className?: string;
}

const LogoV1: React.FC<LogoV1Props> = ({ className }) => {
  return (
    <GalleryVerticalEndIcon className={cn("size-6", className)} />
  );
};

export default LogoV1;