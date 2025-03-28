
import { cn } from '../lib/utils';

interface CategoryListProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export default function CategoryList({
  categories,
  activeCategory,
  onSelectCategory,
  className = ''
}: CategoryListProps) {
  return (
    <div className={cn("flex overflow-x-auto py-3 px-2 no-scrollbar gap-2", className)}>
      {categories.map((category) => (
        <button
          key={category}
          className={cn(
            "px-4 py-2.5 rounded-full text-sm whitespace-nowrap flex-shrink-0 transition-all duration-300",
            category === activeCategory 
              ? "bg-primary text-white font-medium shadow-md shadow-primary/20 scale-105" 
              : "bg-white text-gray-700 hover:bg-gray-100"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
