
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Loader2, ArrowLeftCircle, Home } from 'lucide-react';
import CategoryManager from '@/components/admin/CategoryManager';
import FoodItemManager from '@/components/admin/FoodItemManager';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalItems: 0,
    totalCategories: 0,
    specialItems: 0,
    regularItems: 0
  });

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

        // Calculate stats
        const specialItems = foodItemsData?.filter(item => item.is_special) || [];
        setStats({
          totalItems: foodItemsData?.length || 0,
          totalCategories: categoriesData?.length || 0,
          specialItems: specialItems.length,
          regularItems: (foodItemsData?.length || 0) - specialItems.length
        });
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
            setStats(prev => ({...prev, totalCategories: prev.totalCategories + 1}));
          } else if (payload.eventType === 'UPDATE') {
            setCategories(prev => 
              prev.map(item => item.id === payload.new.id ? payload.new : item)
            );
          } else if (payload.eventType === 'DELETE') {
            setCategories(prev => 
              prev.filter(item => item.id !== payload.old.id)
            );
            setStats(prev => ({...prev, totalCategories: prev.totalCategories - 1}));
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
            setStats(prev => {
              const isSpecial = payload.new.is_special;
              return {
                ...prev, 
                totalItems: prev.totalItems + 1,
                specialItems: isSpecial ? prev.specialItems + 1 : prev.specialItems,
                regularItems: isSpecial ? prev.regularItems : prev.regularItems + 1
              };
            });
          } else if (payload.eventType === 'UPDATE') {
            setFoodItems(prev => {
              const oldItem = prev.find(item => item.id === payload.new.id);
              const wasSpecial = oldItem?.is_special;
              const isSpecial = payload.new.is_special;
              
              // Update stats if special status changed
              if (wasSpecial !== isSpecial) {
                setStats(prevStats => ({
                  ...prevStats,
                  specialItems: isSpecial 
                    ? prevStats.specialItems + 1 
                    : prevStats.specialItems - 1,
                  regularItems: isSpecial 
                    ? prevStats.regularItems - 1 
                    : prevStats.regularItems + 1
                }));
              }
              
              return prev.map(item => item.id === payload.new.id ? payload.new : item);
            });
          } else if (payload.eventType === 'DELETE') {
            setFoodItems(prev => {
              const deletedItem = prev.find(item => item.id === payload.old.id);
              const wasSpecial = deletedItem?.is_special;
              
              setStats(prevStats => ({
                ...prevStats,
                totalItems: prevStats.totalItems - 1,
                specialItems: wasSpecial ? prevStats.specialItems - 1 : prevStats.specialItems,
                regularItems: wasSpecial ? prevStats.regularItems : prevStats.regularItems - 1
              }));
              
              return prev.filter(item => item.id !== payload.old.id);
            });
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
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tableau de Bord Administrateur</h1>
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home size={16} />
            <span>Retour à l'accueil</span>
          </Button>
        </Link>
      </div>
      
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total des Plats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalItems}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Catégories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalCategories}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Plats Spéciaux</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.specialItems}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Plats Réguliers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.regularItems}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Category Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Aperçu des Catégories</CardTitle>
            <CardDescription>Toutes les catégories disponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="flex flex-wrap gap-2">
                {categories.length === 0 ? (
                  <p className="text-muted-foreground">Aucune catégorie trouvée.</p>
                ) : (
                  categories.map(category => (
                    <Badge key={category.id} variant="outline" className="text-sm">
                      {category.name}
                    </Badge>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Répartition des Plats par Catégorie</CardTitle>
            <CardDescription>Nombre de plats dans chaque catégorie</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {categories.map(category => {
                  const itemsInCategory = foodItems.filter(item => item.category === category.name);
                  const percentage = foodItems.length > 0 
                    ? Math.round((itemsInCategory.length / foodItems.length) * 100) 
                    : 0;
                  
                  return (
                    <div key={category.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{category.name}</span>
                        <span>{itemsInCategory.length} plats ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                
                {categories.length === 0 && (
                  <p className="text-muted-foreground">Aucune catégorie trouvée.</p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Management */}
      <Tabs defaultValue="foodItems" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="foodItems">Gestion des Plats</TabsTrigger>
          <TabsTrigger value="categories">Gestion des Catégories</TabsTrigger>
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
