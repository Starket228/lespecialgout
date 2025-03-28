
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Loader2, ArrowLeftCircle, Home, LayoutDashboard, Utensils, ListOrdered } from 'lucide-react';
import CategoryManager from '@/components/admin/CategoryManager';
import FoodItemManager from '@/components/admin/FoodItemManager';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
          <LayoutDashboard className="h-7 w-7 text-primary" />
          <span>Tableau de Bord Admin</span>
        </h1>
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto shadow-sm hover:shadow-md transition-all">
            <Home size={16} />
            <span>Retour à l'accueil</span>
          </Button>
        </Link>
      </div>
      
      {/* Dashboard Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <Card className="shadow-md hover:shadow-lg transition-all border-l-4 border-l-primary">
          <CardHeader className="pb-2 space-y-0 pt-4 px-4">
            <CardTitle className="text-base sm:text-lg flex items-center justify-between">
              <span>Total des Plats</span>
              <Utensils className="h-5 w-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-4">
            <p className="text-2xl sm:text-3xl font-bold">{stats.totalItems}</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-all border-l-4 border-l-secondary">
          <CardHeader className="pb-2 space-y-0 pt-4 px-4">
            <CardTitle className="text-base sm:text-lg flex items-center justify-between">
              <span>Catégories</span>
              <ListOrdered className="h-5 w-5 text-secondary" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-4">
            <p className="text-2xl sm:text-3xl font-bold">{stats.totalCategories}</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-all border-l-4 border-l-green-500">
          <CardHeader className="pb-2 space-y-0 pt-4 px-4">
            <CardTitle className="text-base sm:text-lg flex items-center justify-between">
              <span>Plats Spéciaux</span>
              <Badge variant="outline" className="bg-green-100 text-green-800">Spécial</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-4">
            <p className="text-2xl sm:text-3xl font-bold">{stats.specialItems}</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-all border-l-4 border-l-blue-500">
          <CardHeader className="pb-2 space-y-0 pt-4 px-4">
            <CardTitle className="text-base sm:text-lg flex items-center justify-between">
              <span>Plats Réguliers</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">Régulier</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-4">
            <p className="text-2xl sm:text-3xl font-bold">{stats.regularItems}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Category Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card className="col-span-1 shadow-md hover:shadow-lg transition-all">
          <CardHeader className="bg-gradient-to-r from-secondary/10 to-transparent border-b">
            <CardTitle className="text-lg md:text-xl">Aperçu des Catégories</CardTitle>
            <CardDescription>Toutes les catégories disponibles</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ScrollArea className="h-[180px] md:h-[200px]">
              <div className="flex flex-wrap gap-2">
                {categories.length === 0 ? (
                  <p className="text-muted-foreground">Aucune catégorie trouvée.</p>
                ) : (
                  categories.map(category => (
                    <Badge key={category.id} variant="outline" className="text-sm bg-secondary/10 hover:bg-secondary/20 transition-colors">
                      {category.name}
                    </Badge>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2 shadow-md hover:shadow-lg transition-all">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b">
            <CardTitle className="text-lg md:text-xl">Répartition des Plats par Catégorie</CardTitle>
            <CardDescription>Nombre de plats dans chaque catégorie</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ScrollArea className="h-[180px] md:h-[200px]">
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
                          className="h-full bg-primary transition-all duration-500 ease-in-out" 
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
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2'} mb-6 md:mb-8 bg-gradient-to-r from-muted to-transparent p-1`}>
          <TabsTrigger value="foodItems" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
            <Utensils className="mr-2 h-4 w-4" />
            Gestion des Plats
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
            <ListOrdered className="mr-2 h-4 w-4" />
            Gestion des Catégories
          </TabsTrigger>
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
