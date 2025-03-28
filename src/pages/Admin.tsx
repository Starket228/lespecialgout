
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import CategoryManager from '@/components/admin/CategoryManager';
import FoodItemManager from '@/components/admin/FoodItemManager';

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [foodItems, setFoodItems] = useState<any[]>([]);

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
          
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);
        
        // Fetch food items
        const { data: foodItemsData, error: foodItemsError } = await supabase
          .from('food_items')
          .select('*')
          .order('name');
          
        if (foodItemsError) throw foodItemsError;
        setFoodItems(foodItemsData || []);
      } catch (error: any) {
        toast({
          title: "Erreur de chargement",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Set up real-time listeners
  useEffect(() => {
    // Listen for changes to categories
    const categoriesChannel = supabase
      .channel('categories-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'categories' }, 
        (payload) => {
          // Handle different event types
          if (payload.eventType === 'INSERT') {
            setCategories(prev => [...prev, payload.new]);
          } else if (payload.eventType === 'UPDATE') {
            setCategories(prev => 
              prev.map(item => item.id === payload.new.id ? payload.new : item)
            );
          } else if (payload.eventType === 'DELETE') {
            setCategories(prev => 
              prev.filter(item => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
      
    // Listen for changes to food items
    const foodItemsChannel = supabase
      .channel('food-items-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'food_items' },
        (payload) => {
          // Handle different event types
          if (payload.eventType === 'INSERT') {
            setFoodItems(prev => [...prev, payload.new]);
          } else if (payload.eventType === 'UPDATE') {
            setFoodItems(prev => 
              prev.map(item => item.id === payload.new.id ? payload.new : item)
            );
          } else if (payload.eventType === 'DELETE') {
            setFoodItems(prev => 
              prev.filter(item => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
      
    // Cleanup
    return () => {
      supabase.removeChannel(categoriesChannel);
      supabase.removeChannel(foodItemsChannel);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="mt-4 text-lg font-medium">Chargement du tableau de bord admin...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Tableau de Bord Administrateur</h1>
      
      <Tabs defaultValue="foodItems" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="foodItems">Plats</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="foodItems" className="space-y-4">
          <FoodItemManager 
            foodItems={foodItems} 
            categories={categories} 
          />
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <CategoryManager 
            categories={categories} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
