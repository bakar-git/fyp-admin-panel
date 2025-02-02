import { cn } from '@/lib/utils';

interface LogoV1Props {
    className?: string;
}

const LogoV1: React.FC<LogoV1Props> = ({ className }) => {
  return (
    <svg
      className={cn(
        'size-24 text-primary mr-2',
        className
      )}
      style={{ strokeMiterlimit: 10 }}
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fillRule="evenodd"
        className="fill-current stroke-none"
        d="m256 241v30h-230v-30z"
      />
      <path
        fillRule="evenodd"
        className="fill-current stroke-none"
        d="m185 341l-30 0.1-0.3-170.1h30z"
      />
      <path
        fillRule="evenodd"
        className="fill-current stroke-none"
        d="m256 381l-30 0.1-0.5-250 30-0.1z"
      />
      <path
        fillRule="evenodd"
        className="fill-current stroke-none"
        d="m358 341l-30 0.1-0.3-170.1h30z"
      />
      <path
        fillRule="evenodd"
        className="fill-current stroke-none"
        d="m486 241v30h-158v-30z"
      />
    </svg>
  );
};

export default LogoV1;