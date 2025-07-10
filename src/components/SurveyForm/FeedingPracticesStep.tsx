import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import type { SurveyData } from '../../types/survey';
import { OriginalChoices } from '../../types/survey';
import FoodPlanningInterface from '../FoodPlanning/FoodPlanningInterface';
import type { FoodPlacement } from '../../data/foodCategories';

export default function FeedingPracticesStep() {
  const { t } = useTranslation();
  const { control, watch, formState: { errors } } = useFormContext<SurveyData>();
  
  // Watch Q10 and Q11 values for conditional display
  const q10Value = watch('q10');
  const q11Value = watch('q11');
  
  const q9aMainValue = watch('q9a_main');
  const q9bMainValue = watch('q9b_main');
  const q9aElaborateValues = watch('q9a_elaborate') || [];
  const q9bElaborateValues = watch('q9b_elaborate') || [];
  const q14Values = watch('q14') || [];
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t('survey.pages.complementary_feeding.title')}
        </h2>
        
        <div className="space-y-8">
          {/* Q7 - Age recommendations panel */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {t('survey.questions.q7.title')}
            </h3>
            
            {/* Q7a - Breast-fed infant */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                {t('survey.questions.q7.breast_fed')} *
              </Label>
              <div className="flex items-center gap-2">
                <Controller
                  name="q7a"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="0"
                      className="w-24"
                    />
                  )}
                />
                <span className="text-sm text-gray-500">{t('survey.questions.q7.months')}</span>
              </div>
              {errors.q7a && (
                <p className="text-sm text-red-600">{errors.q7a.message}</p>
              )}
            </div>
            
            {/* Q7b - Formula-fed infant */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                {t('survey.questions.q7.formula_fed')} *
              </Label>
              <div className="flex items-center gap-2">
                <Controller
                  name="q7b"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="0"
                      className="w-24"
                    />
                  )}
                />
                <span className="text-sm text-gray-500">{t('survey.questions.q7.months')}</span>
              </div>
              {errors.q7b && (
                <p className="text-sm text-red-600">{errors.q7b.message}</p>
              )}
            </div>
            
            {/* Q7c - At increased risk */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                {t('survey.questions.q7.increased_risk')} *
              </Label>
              <div className="flex items-center gap-2">
                <Controller
                  name="q7c"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="0"
                      className="w-24"
                    />
                  )}
                />
                <span className="text-sm text-gray-500">{t('survey.questions.q7.months')}</span>
              </div>
              {errors.q7c && (
                <p className="text-sm text-red-600">{errors.q7c.message}</p>
              )}
            </div>
          </div>
          
          {/* Q8 - Risk factors */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">
              {t('survey.questions.q8.title')} *
            </Label>
            <Controller
              name="q8"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  {[
                    { value: OriginalChoices.q8.coexisting_eczema, label: t('survey.questions.q8.choices.eczema') },
                    { value: OriginalChoices.q8.recurrent_bronchiolitis, label: t('survey.questions.q8.choices.bronchiolitis') },
                    { value: OriginalChoices.q8.family_history_allergies, label: t('survey.questions.q8.choices.family_history') },
                    { value: OriginalChoices.q8.other, label: t('survey.questions.q8.other') },
                  ].map((option) => (
                    <div key={option.value} className="flex items-start space-x-2">
                      <Checkbox
                        checked={field.value?.includes(option.value) || false}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          if (checked) {
                            field.onChange([...currentValues, option.value]);
                          } else {
                            field.onChange(currentValues.filter((v: string) => v !== option.value));
                          }
                        }}
                        id={`q8_${option.value}`}
                      />
                      <Label htmlFor={`q8_${option.value}`} className="text-sm leading-relaxed">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            />
            {errors.q8 && (
              <p className="text-sm text-red-600">{errors.q8.message}</p>
            )}
            
            {/* Q8 Other specification */}
            {watch('q8')?.includes(OriginalChoices.q8.other) && (
              <div className="ml-6 space-y-3">
                <Label className="text-base font-semibold">{t('survey.questions.q8.otherPlaceholder')}</Label>
                <Controller
                  name="q8_other"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder={t('survey.questions.q8.otherPlaceholder')} />
                  )}
                />
              </div>
            )}
          </div>
          
          {/* Q9a - Preventive measures for low risk */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">
              {t('survey.questions.q9a.title')} *
            </Label>
            <Controller
              name="q9a_main"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="q9a_yes" />
                    <Label htmlFor="q9a_yes">{t('survey.questions.q9a.choices.yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="q9a_no" />
                    <Label htmlFor="q9a_no">{t('survey.questions.q9a.choices.no')}</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.q9a_main && (
              <p className="text-sm text-red-600">{errors.q9a_main.message}</p>
            )}
            
            {/* Q9a Elaborate (conditional) */}
            {q9aMainValue === 'yes' && (
              <div className="ml-6 p-4 border-l-4 border-blue-200 bg-blue-50 space-y-4">
                <Label className="text-base font-semibold">{t('survey.questions.q9a.elaborate.title')} *</Label>
                <Controller
                  name="q9a_elaborate"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-3">
                      {[
                        { value: OriginalChoices.q9a_elaborate.soy_formula, label: t('survey.questions.q9a.elaborate.choices.soy_formula') },
                        { value: OriginalChoices.q9a_elaborate.hydrolysed_formula, label: t('survey.questions.q9a.elaborate.choices.hydrolysed_formula') },
                        { value: OriginalChoices.q9a_elaborate.restrict_allergens, label: t('survey.questions.q9a.elaborate.choices.restrict_allergens') },
                        { value: OriginalChoices.q9a_elaborate.emollients, label: t('survey.questions.q9a.elaborate.choices.emollients') },
                        { value: OriginalChoices.q9a_elaborate.prebiotics, label: t('survey.questions.q9a.elaborate.choices.prebiotics') },
                        { value: OriginalChoices.q9a_elaborate.vitamin_supplements, label: t('survey.questions.q9a.elaborate.choices.vitamin_supplements') },
                        { value: OriginalChoices.q9a_elaborate.regular_formula, label: t('survey.questions.q9a.elaborate.choices.regular_formula') },
                        { value: OriginalChoices.q9a_elaborate.exclusive_breastfeeding, label: t('survey.questions.q9a.elaborate.choices.exclusive_breastfeeding') },
                        { value: OriginalChoices.q9a_elaborate.other, label: t('survey.questions.q9a.elaborate.other') },
                      ].map((option) => (
                        <div key={option.value} className="flex items-start space-x-2">
                          <Checkbox
                            checked={field.value?.includes(option.value) || false}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value || [];
                              if (checked) {
                                field.onChange([...currentValues, option.value]);
                              } else {
                                field.onChange(currentValues.filter((v: string) => v !== option.value));
                              }
                            }}
                            id={`q9a_elaborate_${option.value}`}
                          />
                          <Label htmlFor={`q9a_elaborate_${option.value}`} className="text-sm leading-relaxed">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                />
                
                {/* Q9a Other specification */}
                {q9aElaborateValues.includes(OriginalChoices.q9a_elaborate.other) && (
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">{t('survey.questions.q9a.elaborate.otherPlaceholder')}</Label>
                    <Controller
                      name="q9a_elaborate_other"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder={t('survey.questions.q9a.elaborate.otherPlaceholder')} />
                      )}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Q9b - Preventive measures for high risk */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">
              {t('survey.questions.q9b.title')} *
            </Label>
            <Controller
              name="q9b_main"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="q9b_yes" />
                    <Label htmlFor="q9b_yes">{t('survey.questions.q9b.choices.yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="q9b_no" />
                    <Label htmlFor="q9b_no">{t('survey.questions.q9b.choices.no')}</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.q9b_main && (
              <p className="text-sm text-red-600">{errors.q9b_main.message}</p>
            )}
            
            {/* Q9b Elaborate (conditional) */}
            {q9bMainValue === 'yes' && (
              <div className="ml-6 p-4 border-l-4 border-blue-200 bg-blue-50 space-y-4">
                <Label className="text-base font-semibold">{t('survey.questions.q9b.elaborate.title')} *</Label>
                <Controller
                  name="q9b_elaborate"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-4">
                      {[
                        { value: OriginalChoices.q9b_elaborate.soy_formula, label: t('survey.questions.q9b.elaborate.choices.soy_formula') },
                        { value: OriginalChoices.q9b_elaborate.hydrolysed_formula, label: t('survey.questions.q9b.elaborate.choices.hydrolysed_formula') },
                        { value: OriginalChoices.q9b_elaborate.restrict_allergens, label: t('survey.questions.q9b.elaborate.choices.restrict_allergens') },
                        { value: OriginalChoices.q9b_elaborate.emollients, label: t('survey.questions.q9b.elaborate.choices.emollients') },
                        { value: OriginalChoices.q9b_elaborate.prebiotics, label: t('survey.questions.q9b.elaborate.choices.prebiotics') },
                        { value: OriginalChoices.q9b_elaborate.vitamin_supplements, label: t('survey.questions.q9b.elaborate.choices.vitamin_supplements') },
                        { value: OriginalChoices.q9b_elaborate.regular_formula, label: t('survey.questions.q9b.elaborate.choices.regular_formula') },
                        { value: OriginalChoices.q9b_elaborate.exclusive_breastfeeding, label: t('survey.questions.q9b.elaborate.choices.exclusive_breastfeeding') },
                        { value: OriginalChoices.q9b_elaborate.other, label: t('survey.questions.q9b.elaborate.other') },
                      ].map((option) => (
                        <div key={option.value} className="flex items-start space-x-2">
                          <Checkbox
                            checked={field.value?.includes(option.value) || false}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value || [];
                              if (checked) {
                                field.onChange([...currentValues, option.value]);
                              } else {
                                field.onChange(currentValues.filter((v: string) => v !== option.value));
                              }
                            }}
                            id={`q9b_elaborate_${option.value}`}
                          />
                          <Label htmlFor={`q9b_elaborate_${option.value}`} className="text-sm leading-relaxed">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                />
                
                {/* Q9b Other specification */}
                {q9bElaborateValues.includes(OriginalChoices.q9b_elaborate.other) && (
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">{t('survey.questions.q9b.elaborate.otherPlaceholder')}</Label>
                    <Controller
                      name="q9b_elaborate_other"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder={t('survey.questions.q9b.elaborate.otherPlaceholder')} />
                      )}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Q10 - Food introduction order for low risk */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">
              {t('survey.questions.q10.title')} *
            </Label>
            <Controller
              name="q10"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="q10_yes" />
                    <Label htmlFor="q10_yes">{t('survey.questions.q10.choices.yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="q10_no" />
                    <Label htmlFor="q10_no">{t('survey.questions.q10.choices.no')}</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.q10 && (
              <p className="text-sm text-red-600">{errors.q10.message}</p>
            )}
            
            {/* Q10 Food Plan Interface (conditional) */}
            {q10Value === 'yes' && (
              <div className="mt-6">
                <Controller
                  name="q10_food_plan"
                  control={control}
                  render={({ field }) => (
                    <FoodPlanningInterface
                      riskLevel="low"
                      title="Food Introduction Plan for Low-Risk Children"
                      onPlacementsChange={(placements) => field.onChange(placements)}
                      initialPlacements={field.value || []}
                    />
                  )}
                />
              </div>
            )}
          </div>
          
          {/* Q11 - Food introduction order for high risk */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">
              {t('survey.questions.q11.title')} *
            </Label>
            <Controller
              name="q11"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="q11_yes" />
                    <Label htmlFor="q11_yes">{t('survey.questions.q11.choices.yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="q11_no" />
                    <Label htmlFor="q11_no">{t('survey.questions.q11.choices.no')}</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.q11 && (
              <p className="text-sm text-red-600">{errors.q11.message}</p>
            )}
            
            {/* Q11 Food Plan Interface (conditional) */}
            {q11Value === 'yes' && (
              <div className="mt-6">
                <Controller
                  name="q11_food_plan"
                  control={control}
                  render={({ field }) => (
                    <FoodPlanningInterface
                      riskLevel="high"
                      title="Food Introduction Plan for High-Risk Children"
                      onPlacementsChange={(placements) => field.onChange(placements)}
                      initialPlacements={field.value || []}
                    />
                  )}
                />
              </div>
            )}
          </div>
          
          {/* Q12 - Traditional foods */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">
              {t('survey.questions.q12.title')}
            </Label>
            <Controller
              name="q12"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder={t('survey.questions.q12.title')}
                  rows={4}
                />
              )}
            />
          </div>
          
          {/* Q14 - Food supplements */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">
              {t('survey.questions.q14.title')} *
            </Label>
            <Controller
              name="q14"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  {[
                    { value: OriginalChoices.q14.iron, label: t('survey.questions.q14.choices.iron') },
                    { value: OriginalChoices.q14.multivitamin, label: t('survey.questions.q14.choices.multivitamin') },
                    { value: OriginalChoices.q14.omega_3, label: t('survey.questions.q14.choices.omega3') },
                    { value: OriginalChoices.q14.probiotic, label: t('survey.questions.q14.choices.probiotic') },
                    { value: OriginalChoices.q14.prebiotic, label: t('survey.questions.q14.choices.prebiotic') },
                    { value: OriginalChoices.q14.synbiotic, label: t('survey.questions.q14.choices.synbiotic') },
                    { value: OriginalChoices.q14.vitamin_a, label: t('survey.questions.q14.choices.vitamin_a') },
                    { value: OriginalChoices.q14.vitamin_c, label: t('survey.questions.q14.choices.vitamin_c') },
                    { value: OriginalChoices.q14.vitamin_d, label: t('survey.questions.q14.choices.vitamin_d') },
                    { value: OriginalChoices.q14.no_supplements, label: t('survey.questions.q14.choices.no_supplements') },
                    { value: OriginalChoices.q14.other, label: t('survey.questions.q14.other') },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes(option.value) || false}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          if (checked) {
                            field.onChange([...currentValues, option.value]);
                          } else {
                            field.onChange(currentValues.filter((v: string) => v !== option.value));
                          }
                        }}
                        id={`q14_${option.value}`}
                      />
                      <Label htmlFor={`q14_${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            />
            
            {/* Q14 Other specification */}
            {q14Values.includes(OriginalChoices.q14.other) && (
              <div className="space-y-3">
                <Label className="text-base font-semibold">{t('survey.questions.q14.otherPlaceholder')}</Label>
                <Controller
                  name="q14_other"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder={t('survey.questions.q14.otherPlaceholder')} />
                  )}
                />
              </div>
            )}
          </div>
          
          {/* Q15-Q18 - Introduction intervals */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Introduction Intervals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  {t('survey.questions.q15.title')} *
                </Label>
                <Controller
                  name="q15"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interval..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={OriginalChoices.intervals.one_day}>{t('survey.questions.q15.choices.1_day')}</SelectItem>
                        <SelectItem value={OriginalChoices.intervals.one_to_three_days}>{t('survey.questions.q15.choices.1_3_days')}</SelectItem>
                        <SelectItem value={OriginalChoices.intervals.more_than_three_days}>{t('survey.questions.q15.choices.more_3_days')}</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.q15 && (
                  <p className="text-sm text-red-600">{errors.q15.message}</p>
                )}
              </div>
              
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  {t('survey.questions.q16.title')} *
                </Label>
                <Controller
                  name="q16"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interval..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={OriginalChoices.intervals.one_day}>{t('survey.questions.q16.choices.1_day')}</SelectItem>
                        <SelectItem value={OriginalChoices.intervals.one_to_three_days}>{t('survey.questions.q16.choices.1_3_days')}</SelectItem>
                        <SelectItem value={OriginalChoices.intervals.more_than_three_days}>{t('survey.questions.q16.choices.more_3_days')}</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.q16 && (
                  <p className="text-sm text-red-600">{errors.q16.message}</p>
                )}
              </div>
              
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  {t('survey.questions.q17.title')} *
                </Label>
                <Controller
                  name="q17"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interval..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={OriginalChoices.intervals.one_day}>{t('survey.questions.q17.choices.1_day')}</SelectItem>
                        <SelectItem value={OriginalChoices.intervals.one_to_three_days}>{t('survey.questions.q17.choices.1_3_days')}</SelectItem>
                        <SelectItem value={OriginalChoices.intervals.more_than_three_days}>{t('survey.questions.q17.choices.more_3_days')}</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.q17 && (
                  <p className="text-sm text-red-600">{errors.q17.message}</p>
                )}
              </div>
              
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  {t('survey.questions.q18.title')} *
                </Label>
                <Controller
                  name="q18"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interval..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={OriginalChoices.intervals.one_day}>{t('survey.questions.q18.choices.1_day')}</SelectItem>
                        <SelectItem value={OriginalChoices.intervals.one_to_three_days}>{t('survey.questions.q18.choices.1_3_days')}</SelectItem>
                        <SelectItem value={OriginalChoices.intervals.more_than_three_days}>{t('survey.questions.q18.choices.more_3_days')}</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.q18 && (
                  <p className="text-sm text-red-600">{errors.q18.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}