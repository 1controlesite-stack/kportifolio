import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface MonitorMockupProps {
  image: string;
  title: string;
  slug: string;
  color: string;
}

const tabColors: Record<string, string> = {
  "kenkya-purple": "from-kenkya-purple to-kenkya-blue",
  "kenkya-blue": "from-kenkya-blue to-kenkya-cyan",
  "kenkya-cyan": "from-kenkya-cyan to-kenkya-purple",
};

const MonitorMockup = ({ image, title, slug, color }: MonitorMockupProps) => {
  const gradient = tabColors[color] || tabColors["kenkya-purple"];

  return (
    <Link to={`/projeto/${slug}`} className="group block relative">
      <div className="flex">
        {/* Monitor */}
        <div className="flex-1">
          {/* Screen frame */}
          <div className="rounded-t-lg border border-border/30 bg-card overflow-hidden shadow-2xl shadow-primary/10 transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-primary/25">
            {/* Screen content */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="flex items-center gap-2 px-5 py-2.5 rounded-full gradient-bg text-primary-foreground font-display font-bold text-sm">
                  Ver projeto
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Monitor base - neck */}
          <div className="flex justify-center">
            <div className="w-16 h-5 bg-card border-x border-border/20" />
          </div>
          {/* Monitor base - foot */}
          <div className="flex justify-center">
            <div className="w-28 h-2 rounded-b-md bg-card border border-t-0 border-border/20" />
          </div>
        </div>

        {/* Vertical side tab */}
        <div
          className={`w-10 rounded-r-lg bg-gradient-to-b ${gradient} flex items-center justify-center self-stretch -ml-[1px]`}
          style={{ marginBottom: "1.75rem" /* align with screen, not base */ }}
        >
          <span
            className="text-primary-foreground font-display font-bold text-xs uppercase tracking-widest whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MonitorMockup;
