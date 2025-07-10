import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import type { SurveyData } from '../../types/survey';
import { OriginalChoices } from '../../types/survey';

export default function DemographicsStep() {
  const { t } = useTranslation();
  const { control, watch, formState: { errors } } = useFormContext<SurveyData>();
  
  const q2Value = watch('q2');
  const q5Value = watch('q5');
  const q5aValues = watch('q5a') || [];
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t('survey.pages.basic_information.title')}
        </h2>
        
        <div className="space-y-6">
          {/* Q1 - Sex */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              {t('survey.questions.q1.title')} *
            </Label>
            <Controller
              name="q1"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={OriginalChoices.q1.male} id="male" />
                    <Label htmlFor="male">{t('survey.questions.q1.choices.male')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={OriginalChoices.q1.female} id="female" />
                    <Label htmlFor="female">{t('survey.questions.q1.choices.female')}</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.q1 && (
              <p className="text-sm text-red-600">{errors.q1.message}</p>
            )}
          </div>
          
          {/* Q2 - Profession */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                {t('survey.questions.q2.title')} *
              </Label>
              <Controller
                name="q2"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('survey.questions.q2.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={OriginalChoices.q2.paediatrician}>
                        {t('survey.questions.q2.choices.paediatrician')}
                      </SelectItem>
                      <SelectItem value={OriginalChoices.q2.dietitian}>
                        {t('survey.questions.q2.choices.dietitian')}
                      </SelectItem>
                      <SelectItem value={OriginalChoices.q2.allergist}>
                        {t('survey.questions.q2.choices.allergist')}
                      </SelectItem>
                      <SelectItem value={OriginalChoices.q2.nurse}>
                        {t('survey.questions.q2.choices.nurse')}
                      </SelectItem>
                      <SelectItem value={OriginalChoices.q2.other}>
                        {t('survey.questions.q2.other')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.q2 && (
                <p className="text-sm text-red-600">{errors.q2.message}</p>
              )}
            </div>
            
            {/* Q2 Other specification */}
            {q2Value === OriginalChoices.q2.other && (
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  {t('survey.questions.q2.other_specify')}
                </Label>
                <Controller
                  name="q2_other"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={t('survey.questions.q2.otherPlaceholder')}
                    />
                  )}
                />
              </div>
            )}
          </div>
          
          {/* Q3 & Q4 - Age and Years of practice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                {t('survey.questions.q3.title')} *
              </Label>
              <Controller
                name="q3"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder={t('survey.questions.q3.placeholder')}
                  />
                )}
              />
              {errors.q3 && (
                <p className="text-sm text-red-600">{errors.q3.message}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                {t('survey.questions.q4.title')} *
              </Label>
              <Controller
                name="q4"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder={t('survey.questions.q4.placeholder')}
                  />
                )}
              />
              {errors.q4 && (
                <p className="text-sm text-red-600">{errors.q4.message}</p>
              )}
            </div>
          </div>
          
          {/* Q5 - Additional education in allergy */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              {t('survey.questions.q5.title')} *
            </Label>
            <Controller
              name="q5"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="q5_yes" />
                    <Label htmlFor="q5_yes">{t('survey.questions.q5.choices.yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="q5_no" />
                    <Label htmlFor="q5_no">{t('survey.questions.q5.choices.no')}</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.q5 && (
              <p className="text-sm text-red-600">{errors.q5.message}</p>
            )}
          </div>
          
          {/* Q5a - Education specification (conditional) */}
          {q5Value === 'yes' && (
            <div className="ml-6 p-4 border-l-4 border-blue-200 bg-blue-50 space-y-4">
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  {t('survey.questions.q5a.title')} *
                </Label>
                <Controller
                  name="q5a"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { value: OriginalChoices.q5a.online_course, key: 'online_course' },
                        { value: OriginalChoices.q5a.university_course, key: 'university_course' },
                        { value: OriginalChoices.q5a.msc, key: 'msc' },
                        { value: OriginalChoices.q5a.phd, key: 'phd' },
                        { value: OriginalChoices.q5a.other, key: 'other' },
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
                            id={`q5a_${option.key}`}
                          />
                          <Label htmlFor={`q5a_${option.key}`} className="text-sm">
                            {t(`survey.questions.q5a.choices.${option.key}`)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
              
              {/* Q5a Other specification */}
              {q5aValues.includes(OriginalChoices.q5a.other) && (
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    {t('survey.questions.q5a.other_specify')}
                  </Label>
                  <Controller
                    name="q5a_other"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t('survey.questions.q5a.otherPlaceholder')}
                      />
                    )}
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Q6 - Country of work */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              {t('survey.questions.q6.title')} *
            </Label>
            <Controller
              name="q6"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t('survey.questions.q6.placeholder')}
                />
              )}
            />
            {errors.q6 && (
              <p className="text-sm text-red-600">{errors.q6.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}