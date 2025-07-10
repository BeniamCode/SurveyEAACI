import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { foodCategories, timelineMonths } from '../../data/foodCategories';
import type { FoodPlacement, FoodItem } from '../../data/foodCategories';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

interface FoodPlanningInterfaceProps {
  riskLevel: 'low' | 'high';
  title: string;
  onPlacementsChange: (placements: FoodPlacement[]) => void;
  initialPlacements?: FoodPlacement[];
}

export default function FoodPlanningInterface({ 
  riskLevel, 
  title, 
  onPlacementsChange,
  initialPlacements = []
}: FoodPlanningInterfaceProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['legumes']); // Start with legumes expanded
  const [placements, setPlacements] = useState<FoodPlacement[]>(initialPlacements);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    // If dropped on a month
    if (destination.droppableId.startsWith('month-')) {
      const foodItem = findFoodItemById(draggableId);
      if (!foodItem) return;

      const newPlacement: FoodPlacement = {
        foodItemId: draggableId,
        foodItemName: foodItem.name,
        monthId: destination.droppableId,
        riskLevel
      };

      // Remove existing placement of this food item (if any) and add new one
      const updatedPlacements = [
        ...placements.filter(p => p.foodItemId !== draggableId),
        newPlacement
      ];

      setPlacements(updatedPlacements);
      onPlacementsChange(updatedPlacements);
    }
  };

  const findFoodItemById = (id: string): FoodItem | undefined => {
    for (const category of foodCategories) {
      const item = category.items.find(item => item.id === id);
      if (item) return item;
    }
    return undefined;
  };

  const removePlacement = (foodItemId: string) => {
    const updatedPlacements = placements.filter(p => p.foodItemId !== foodItemId);
    setPlacements(updatedPlacements);
    onPlacementsChange(updatedPlacements);
  };

  const getPlacementsForMonth = (monthId: string) => {
    return placements.filter(p => p.monthId === monthId && p.riskLevel === riskLevel);
  };

  const getColorForRiskLevel = () => {
    return riskLevel === 'low' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50';
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={`border-l-4 ${riskLevel === 'low' ? 'border-green-400' : 'border-red-400'} p-4 bg-gray-50 space-y-4`}>
        <h4 className={`text-lg font-semibold ${riskLevel === 'low' ? 'text-green-700' : 'text-red-700'} mb-4`}>
          {title}
        </h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Food Categories Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Food Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {foodCategories.map((category) => (
                    <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full justify-between p-3 h-auto font-medium text-left"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="flex items-center gap-2">
                          <i className={`fas ${category.icon} text-sm`}></i>
                          <span className="text-sm">{category.name}</span>
                        </div>
                        {expandedCategories.includes(category.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      
                      {expandedCategories.includes(category.id) && (
                        <Droppable droppableId={`category-${category.id}`} isDropDisabled>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="pb-2"
                            >
                              {category.items.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`mx-3 mb-1 p-2 bg-white border border-gray-200 rounded text-xs cursor-grab transition-all ${
                                        snapshot.isDragging ? 'shadow-lg border-blue-300 bg-blue-50' : 'hover:border-gray-300 hover:shadow-sm'
                                      }`}
                                    >
                                      <div className="flex items-start gap-2">
                                        <i className={`fas ${item.icon} text-gray-500 mt-0.5 flex-shrink-0`}></i>
                                        <span className="leading-tight">{item.name}</span>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {riskLevel === 'low' ? 'Low-Risk Timeline' : 'High-Risk Timeline'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto space-y-1 p-3">
                  {timelineMonths.map((month) => {
                    const monthPlacements = getPlacementsForMonth(month.id);
                    
                    return (
                      <Droppable key={month.id} droppableId={month.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`min-h-12 border-2 border-dashed rounded p-2 transition-colors ${
                              snapshot.isDraggedOver 
                                ? `${riskLevel === 'low' ? 'border-green-400 bg-green-100' : 'border-red-400 bg-red-100'}`
                                : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}
                          >
                            <div className="font-medium text-sm mb-2">{month.label}</div>
                            
                            {monthPlacements.map((placement) => (
                              <div
                                key={placement.foodItemId}
                                className={`inline-flex items-center gap-1 m-1 px-2 py-1 rounded text-xs border ${
                                  riskLevel === 'low' ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'
                                }`}
                              >
                                <span className="truncate max-w-40">{placement.foodItemName}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 hover:bg-transparent"
                                  onClick={() => removePlacement(placement.foodItemId)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            
                            {monthPlacements.length === 0 && (
                              <div className="text-gray-400 text-xs italic">
                                Drag foods here for {month.label.toLowerCase()}
                              </div>
                            )}
                            
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {placements.length > 0 && (
          <div className="mt-4 p-3 bg-white border border-gray-200 rounded">
            <div className="text-sm font-medium mb-2">Summary: {placements.length} foods planned</div>
            <div className="text-xs text-gray-600">
              {placements.map(p => `${p.foodItemName} (${timelineMonths.find(m => m.id === p.monthId)?.label})`).join(', ')}
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
}