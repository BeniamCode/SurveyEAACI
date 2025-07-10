import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import type { SurveyData } from '../../types/survey';

export default function ReviewStep() {
  const { t } = useTranslation();
  const { watch } = useFormContext<SurveyData>();
  
  const formData = watch();
  
  const renderDemographics = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t('survey.steps.demographics')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="border-b pb-2">
            <div className="font-medium text-sm text-gray-600">{t('survey.questions.q1.title')}</div>
            <div className="mt-1">{formData.q1 ? t(`survey.questions.q1.choices.${formData.q1}`) : '-'}</div>
          </div>
          <div className="border-b pb-2">
            <div className="font-medium text-sm text-gray-600">{t('survey.questions.q2.title')}</div>
            <div className="mt-1">
              {formData.q2 || '-'}
              {formData.q2 === 'Other' && formData.q2_other && ` (${formData.q2_other})`}
            </div>
          </div>
          <div className="border-b pb-2">
            <div className="font-medium text-sm text-gray-600">{t('survey.questions.q3.title')}</div>
            <div className="mt-1">{formData.q3 || '-'}</div>
          </div>
          <div className="border-b pb-2">
            <div className="font-medium text-sm text-gray-600">{t('survey.questions.q4.title')}</div>
            <div className="mt-1">{formData.q4 || '-'}</div>
          </div>
          <div className="border-b pb-2">
            <div className="font-medium text-sm text-gray-600">{t('survey.questions.q5.title')}</div>
            <div className="mt-1">{formData.q5 ? t(`survey.questions.q5.choices.${formData.q5}`) : '-'}</div>
          </div>
          {formData.q5 === 'yes' && formData.q5a && formData.q5a.length > 0 && (
            <div className="border-b pb-2">
              <div className="font-medium text-sm text-gray-600">{t('survey.questions.q5a.title')}</div>
              <div className="mt-1 flex flex-wrap gap-2">
                {formData.q5a.map(item => (
                  <Badge key={item} variant="info">
                    {t(`survey.questions.q5a.choices.${item.toLowerCase().replace(' ', '_')}`)}
                  </Badge>
                ))}
                {formData.q5a.includes('Other') && formData.q5a_other && (
                  <Badge variant="info">{formData.q5a_other}</Badge>
                )}
              </div>
            </div>
          )}
          <div>
            <div className="font-medium text-sm text-gray-600">{t('survey.questions.q6.title')}</div>
            <div className="mt-1">{formData.q6 || '-'}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  const renderFeedingPractices = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t('survey.steps.feeding_practices')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="border-b pb-2">
            <div className="font-medium text-sm text-gray-600">{t('survey.questions.q7.title')}</div>
            <div className="mt-1 space-y-1">
              <div>{t('survey.questions.q7.breast_fed')}: {formData.q7a || '-'} months</div>
              <div>{t('survey.questions.q7.formula_fed')}: {formData.q7b || '-'} months</div>
              <div>{t('survey.questions.q7.increased_risk')}: {formData.q7c || '-'} months</div>
            </div>
          </div>
          <div className="border-b pb-2">
            <div className="font-medium text-sm text-gray-600">{t('survey.questions.q8.title')}</div>
            <div className="mt-1">
              {formData.q8 && formData.q8.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.q8.map(factor => (
                    <Badge key={factor} variant="warning">
                      {t(`survey.questions.q8.choices.${factor}`)}
                    </Badge>
                  ))}
                  {formData.q8.includes('other') && formData.q8_other && (
                    <Badge variant="warning">{formData.q8_other}</Badge>
                  )}
                </div>
              ) : '-'}
            </div>
          </div>
          <div className="border-b pb-2">
            <div className="font-medium text-sm text-gray-600">{t('survey.questions.q9a.title')}</div>
            <div className="mt-1">{formData.q9a_main ? t(`survey.questions.q9a.choices.${formData.q9a_main}`) : '-'}</div>
          </div>
          <div className="border-b pb-2">
            <div className="font-medium text-sm text-gray-600">{t('survey.questions.q9b.title')}</div>
            <div className="mt-1">{formData.q9b_main ? t(`survey.questions.q9b.choices.${formData.q9b_main}`) : '-'}</div>
          </div>
          <div className="border-b pb-2">
            <div className="font-medium text-sm text-gray-600">{t('survey.questions.q10.title')}</div>
            <div className="mt-1">{formData.q10 ? t(`survey.questions.q10.choices.${formData.q10}`) : '-'}</div>
          </div>
          <div className="border-b pb-2">
            <div className="font-medium text-sm text-gray-600">{t('survey.questions.q11.title')}</div>
            <div className="mt-1">{formData.q11 ? t(`survey.questions.q11.choices.${formData.q11}`) : '-'}</div>
          </div>
          {formData.q12 && (
            <div>
              <div className="font-medium text-sm text-gray-600">{t('survey.questions.q12.title')}</div>
              <div className="mt-1">{formData.q12}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
  
  const renderFoodPlans = () => {
    const hasLowRisk = formData.food_plan_low_risk && formData.food_plan_low_risk.length > 0;
    const hasHighRisk = formData.food_plan_high_risk && formData.food_plan_high_risk.length > 0;
    
    if (!hasLowRisk && !hasHighRisk) {
      return null;
    }
    
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t('survey.steps.food_plans')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {hasLowRisk && (
            <div>
              <h4 className="font-semibold text-lg mb-4">Food Plan for Low-Risk Children</h4>
              <div className="space-y-3">
                {formData.food_plan_low_risk?.map((entry, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="font-medium">{entry.month} - {entry.food_category}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {entry.food_items.map(item => (
                        <Badge key={item} variant="success">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {hasHighRisk && (
            <div>
              <h4 className="font-semibold text-lg mb-4">Food Plan for High-Risk Children</h4>
              <div className="space-y-3">
                {formData.food_plan_high_risk?.map((entry, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="font-medium">{entry.month} - {entry.food_category}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {entry.food_items.map(item => (
                        <Badge key={item} variant="destructive">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('survey.steps.review')}</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <p className="text-blue-800 text-sm">
            Please review your answers before submitting. You can go back to make changes if needed.
          </p>
        </div>
      </div>
      
      {renderDemographics()}
      {renderFeedingPractices()}
      {renderFoodPlans()}
    </div>
  );
}