// Updated FoodPlanningInterface.tsx with proper drag and drop instructions
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { useTranslation } from 'react-i18next';
import { foodCategories, timelineMonths } from '../../data/foodCategories';
import type { FoodPlacement, FoodItem } from '../../data/foodCategories';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChevronDown, ChevronRight, X, Info } from 'lucide-react';

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
  const { t } = useTranslation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['legumes']);
  const [placements, setPlacements] = useState<FoodPlacement[]>(initialPlacements);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if user is on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    
    if (destination.droppableId.startsWith('month-')) {
      const foodItem = findFoodItemById(draggableId);
      if (!foodItem) return;

      const newPlacement: FoodPlacement = {
        foodItemId: draggableId,
        foodItemName: foodItem.name,
        monthId: destination.droppableId,
        riskLevel
      };

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

  const getFoodItemPlacement = (foodItemId: string) => {
    const placement = placements.find(p => p.foodItemId === foodItemId && p.riskLevel === riskLevel);
    if (placement) {
      const month = timelineMonths.find(m => m.id === placement.monthId);
      return month?.label;
    }
    return null;
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={`border-l-4 ${riskLevel === 'low' ? 'border-green-400' : 'border-red-400'} p-4 bg-gray-50 space-y-4`}>
        <h4 className={`text-lg font-semibold ${riskLevel === 'low' ? 'text-green-700' : 'text-red-700'} mb-4`}>
          {title}
        </h4>
        
        {/* ADD DRAG AND DROP INSTRUCTIONS HERE */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h5 className="font-medium text-blue-900">{t('survey.foodPlanning.instructions.title')}</h5>
              <p className="text-sm text-blue-800">
                {t('survey.foodPlanning.instructions.general')}
              </p>
              {isMobile ? (
                <div className="flex items-start gap-2 p-2 bg-green-100 border border-green-300 rounded">
                  <div className="text-xs text-green-800">
                    📱 <strong>Mobile:</strong> {t('survey.interface.dragDrop.mobile')}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-blue-700">
                  🖱️ <strong>Desktop:</strong> {t('survey.interface.dragDrop.desktop')}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Food Categories Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{t('survey.foodPlanning.foodCategories')}</CardTitle>
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
                          <span className="text-sm">{t(`foodCategories.${category.name}`)}</span>
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
                              {category.items.map((item, index) => {
                                const currentPlacement = getFoodItemPlacement(item.id);
                                return (
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
                                        className={`mx-3 mb-1 p-2 bg-white border rounded text-xs cursor-grab transition-all ${
                                          snapshot.isDragging 
                                            ? 'shadow-lg border-green-400 bg-green-50' // GREEN BORDER WHEN DRAGGING
                                            : currentPlacement 
                                              ? 'border-gray-400 bg-gray-50'
                                              : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
                                        }`}
                                      >
                                        <div className="flex items-start justify-between gap-2">
                                          <div className="flex items-start gap-2 flex-1">
                                            <i className={`fas ${item.icon} text-gray-500 mt-0.5 flex-shrink-0`}></i>
                                            <span className="leading-tight">{t(`foodItems.${item.name}`)}</span>
                                          </div>
                                          {currentPlacement && (
                                            <span className="text-gray-400 text-xs font-medium ml-2 flex-shrink-0">
                                              {currentPlacement}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
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
                  {riskLevel === 'low' ? t('survey.foodPlanning.lowRiskTimeline') : t('survey.foodPlanning.highRiskTimeline')}
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
                                {t('survey.foodPlanning.dragHere')}
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
            <div className="text-sm font-medium mb-2">{t('survey.foodPlanning.summary')}</div>
            <div className="text-xs text-gray-600">
              {placements.map(p => `${p.foodItemName} (${timelineMonths.find(m => m.id === p.monthId)?.label})`).join(', ')}
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
}