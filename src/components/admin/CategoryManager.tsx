import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { Pencil, Trash, Plus, Tag } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CategoryManagerProps {
  categories: any[];
}

export default function CategoryManager({ categories }: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('categories')
        .insert([{ name: newCategory.trim() }]);

      if (error) throw error;

      setNewCategory('');
      setIsAddDialogOpen(false);
      toast({
        title: "Succès",
        description: "Catégorie ajoutée avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editCategory || !editCategory.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('categories')
        .update({ name: editCategory.name.trim() })
        .eq('id', editCategory.id);

      if (error) throw error;

      setIsEditDialogOpen(false);
      toast({
        title: "Succès",
        description: "Catégorie mise à jour avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Catégorie supprimée avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-gradient-to-r from-secondary/10 to-transparent p-4 rounded-lg">
        <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
          <Tag className="h-5 w-5 text-secondary" />
          <span>Gestion des Catégories</span>
        </h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1 bg-secondary hover:bg-secondary/90 shadow-sm w-full sm:w-auto">
              <Plus size={16} />
              <span>Ajouter une catégorie</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nom de la catégorie"
                className="mb-2 border-secondary/30 focus-visible:ring-secondary"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                onClick={handleAddCategory} 
                disabled={loading}
                className="bg-secondary hover:bg-secondary/90"
              >
                {loading ? 'Ajout en cours...' : 'Ajouter'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isMobile ? (
          <div className="p-4 space-y-4">
            {categories.length === 0 ? (
              <div className="text-center py-4 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">Aucune catégorie trouvée. Ajoutez votre première catégorie.</p>
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="border rounded-md p-3 flex justify-between items-center bg-card hover:bg-muted/10 transition-colors">
                      <span className="font-medium">{category.name}</span>
                      <div className="flex gap-2">
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setEditCategory(category)}
                              className="h-8 w-8"
                            >
                              <Pencil size={14} />
                            </Button>
                          </DialogTrigger>
                          {editCategory && editCategory.id === category.id && (
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Modifier la catégorie</DialogTitle>
                              </DialogHeader>
                              <div className="py-4">
                                <Input
                                  value={editCategory.name}
                                  onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                                  placeholder="Nom de la catégorie"
                                  className="mb-2 border-secondary/30 focus-visible:ring-secondary"
                                />
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                  Annuler
                                </Button>
                                <Button onClick={handleUpdateCategory} disabled={loading} className="bg-secondary hover:bg-secondary/90">
                                  {loading ? 'Mise à jour...' : 'Mettre à jour'}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          )}
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon" className="h-8 w-8">
                              <Trash size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action supprimera définitivement la catégorie "{category.name}".
                                Cette action ne peut pas être annulée.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteCategory(category.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-4">
                    Aucune catégorie trouvée. Ajoutez votre première catégorie.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id} className="hover:bg-muted/10 transition-colors">
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditCategory(category)}
                          >
                            <Pencil size={16} />
                          </Button>
                        </DialogTrigger>
                        {editCategory && editCategory.id === category.id && (
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Modifier la catégorie</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <Input
                                value={editCategory.name}
                                onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                                placeholder="Nom de la catégorie"
                                className="mb-2 border-secondary/30 focus-visible:ring-secondary"
                              />
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Annuler
                              </Button>
                              <Button onClick={handleUpdateCategory} disabled={loading} className="bg-secondary hover:bg-secondary/90">
                                {loading ? 'Mise à jour...' : 'Mettre à jour'}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action supprimera définitivement la catégorie "{category.name}".
                              Cette action ne peut pas être annulée.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteCategory(category.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
