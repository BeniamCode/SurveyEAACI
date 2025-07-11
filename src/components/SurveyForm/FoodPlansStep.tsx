import React from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Trash2 } from 'lucide-react';
import type { SurveyData, FoodPlanEntry } from '../../types/survey';

export default function FoodPlansStep() {
  const { t } = useTranslation();
  const { control, watch, getValues, formState: { errors } } = useFormContext<SurveyData>();
  
  const q10Value = watch('q10');
  const q11Value = watch('q11');
  
  const lowRiskArray = useFieldArray({
    control,
    name: 'food_plan_low_risk',
  });
  
  const highRiskArray = useFieldArray({
    control,
    name: 'food_plan_high_risk',
  });
  
  // Simplified food categories for testing
  const categories = [
    'STARCH/GLUTEN',
    'VEGETABLES', 
    'LEGUMES',
    'MEAT',
    'FISH/SHELLFISH',
    'FRUIT',
    'DAIRY PRODUCTS / SUBSTITUTES',
    'EGG',
    'FAT/OIL',
    'SWEETS',
    'NUTS/SEEDS',
    'SALT/SPICES',
    'ADDITIONAL GUIDANCE'
  ];
  
  const months = Array.from({ length: 19 }, (_, i) => 
    i === 0 ? 'Birth' : `Month ${i}`
  );
  
  const handleAddEntry = (type: 'low_risk' | 'high_risk') => {
    const newEntry: FoodPlanEntry = {
      id: `${type}_${Date.now()}`,
      month: '',
      food_category: '',
      food_items: [],
    };
    
    if (type === 'low_risk') {
      lowRiskArray.append(newEntry);
    } else {
      highRiskArray.append(newEntry);
    }
  };
  
  const handleRemoveEntry = (type: 'low_risk' | 'high_risk', index: number) => {
    if (type === 'low_risk') {
      lowRiskArray.remove(index);
    } else {
      highRiskArray.remove(index);
    }
  };
  
  const renderFoodPlanSection = (
    type: 'low_risk' | 'high_risk',
    title: string,
    entries: any[],
    onAdd: () => void,
    onRemove: (index: number) => void
  ) => {
    const fieldName = type === 'low_risk' ? 'food_plan_low_risk' : 'food_plan_high_risk';
    
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {entries.map((entry, index) => {
            return (
              <Card key={entry.id} className="border border-gray-200">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      {/* Month Selection */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Month of Introduction *
                        </Label>
                        <Controller
                          name={`${fieldName}.${index}.month`}
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select month" />
                              </SelectTrigger>
                              <SelectContent>
                                {months.map(month => (
                                  <SelectItem key={month} value={month}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                      
                      {/* Category Selection */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Food Category *
                        </Label>
                        <Controller
                          name={`${fieldName}.${index}.food_category`}
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map(cat => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onRemove(index)}
                      className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Simplified Food Items */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Food Items (simplified for testing)
                    </Label>
                    <Controller
                      name={`${fieldName}.${index}.food_items`}
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-3">
                          {['Item 1', 'Item 2', 'Item 3'].map(item => {
                            const isChecked = field.value?.includes(item) || false;
                            
                            return (
                              <div key={item} className="flex items-start space-x-2">
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValues, item]);
                                    } else {
                                      field.onChange(currentValues.filter((v: string) => v !== item));
                                    }
                                  }}
                                  id={`${fieldName}_${index}_${item}`}
                                />
                                <Label 
                                  htmlFor={`${fieldName}_${index}_${item}`}
                                  className="text-sm leading-relaxed"
                                >
                                  {item}
                                </Label>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          <Button
            type="button"
            variant="outline"
            onClick={onAdd}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Food Plans
        </h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <p className="text-blue-800 text-sm">
            Please specify the introduction order by adding entries for each month and food category you wish to include.
          </p>
        </div>
      </div>
      
      {q10Value === 'yes' && (
        <>
          {renderFoodPlanSection(
            'low_risk',
            'Food Introduction Plan for Low-Risk Children',
            lowRiskArray.fields,
            () => handleAddEntry('low_risk'),
            (index) => handleRemoveEntry('low_risk', index)
          )}
        </>
      )}
      
      {q11Value === 'yes' && (
        <>
          {renderFoodPlanSection(
            'high_risk',
            'Food Introduction Plan for High-Risk Children',
            highRiskArray.fields,
            () => handleAddEntry('high_risk'),
            (index) => handleRemoveEntry('high_risk', index)
          )}
        </>
      )}
      
      {q10Value !== 'yes' && q11Value !== 'yes' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-800 text-sm">
            No food plans needed based on your previous answers.
          </p>
        </div>
      )}
    </div>
  );
}