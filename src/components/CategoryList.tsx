
import { useState } from 'react';

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
    <div className={`flex overflow-x-auto py-3 px-2 no-scrollbar ${className}`}>
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap mr-3 transition-colors duration-200 flex-shrink-0 shadow-sm ${
            category === activeCategory
              ? 'bg-primary text-white font-medium'
              : 'bg-white text-gray-700'
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
