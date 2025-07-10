import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Card, Descriptions, Tag, Alert } from 'antd';
import type { SurveyData } from '../../types/survey';
import styles from './SurveyForm.module.css';

export default function ReviewStep() {
  const { t } = useTranslation();
  const { watch } = useFormContext<SurveyData>();
  
  const formData = watch();
  
  const renderDemographics = () => (
    <Card title={t('survey.steps.demographics')} style={{ marginBottom: '20px' }}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label={t('survey.questions.q1.title')}>
          {formData.q1 ? t(`survey.questions.q1.choices.${formData.q1}`) : '-'}
        </Descriptions.Item>
        <Descriptions.Item label={t('survey.questions.q2.title')}>
          {formData.q2 || '-'}
          {formData.q2 === 'Other' && formData.q2_other && ` (${formData.q2_other})`}
        </Descriptions.Item>
        <Descriptions.Item label={t('survey.questions.q3.title')}>
          {formData.q3 || '-'}
        </Descriptions.Item>
        <Descriptions.Item label={t('survey.questions.q4.title')}>
          {formData.q4 || '-'}
        </Descriptions.Item>
        <Descriptions.Item label={t('survey.questions.q5.title')}>
          {formData.q5 ? t(`survey.questions.q5.choices.${formData.q5}`) : '-'}
        </Descriptions.Item>
        {formData.q5 === 'yes' && formData.q5a && formData.q5a.length > 0 && (
          <Descriptions.Item label={t('survey.questions.q5a.title')}>
            {formData.q5a.map(item => (
              <Tag key={item} color="blue">
                {t(`survey.questions.q5a.choices.${item.toLowerCase().replace(' ', '_')}`)}
              </Tag>
            ))}
            {formData.q5a.includes('Other') && formData.q5a_other && (
              <Tag color="blue">{formData.q5a_other}</Tag>
            )}
          </Descriptions.Item>
        )}
        <Descriptions.Item label={t('survey.questions.q6.title')}>
          {formData.q6 || '-'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
  
  const renderFeedingPractices = () => (
    <Card title={t('survey.steps.feeding_practices')} style={{ marginBottom: '20px' }}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label={t('survey.questions.q7.title')}>
          <div>
            {t('survey.questions.q7.breastfed')}: {formData.q7_breastfed || '-'} months<br/>
            {t('survey.questions.q7.formula')}: {formData.q7_formula || '-'} months<br/>
            {t('survey.questions.q7.increased_risk')}: {formData.q7_increased_risk || '-'} months
          </div>
        </Descriptions.Item>
        <Descriptions.Item label={t('survey.questions.q8.title')}>
          {formData.q8 && formData.q8.length > 0 ? (
            <div>
              {formData.q8.map(factor => (
                <Tag key={factor} color="orange">
                  {t(`survey.questions.q8.choices.${factor}`)}
                </Tag>
              ))}
              {formData.q8.includes('other') && formData.q8_other && (
                <Tag color="orange">{formData.q8_other}</Tag>
              )}
            </div>
          ) : '-'}
        </Descriptions.Item>
        <Descriptions.Item label={t('survey.questions.q9a.title')}>
          {formData.q9a ? t(`survey.questions.q9a.choices.${formData.q9a}`) : '-'}
        </Descriptions.Item>
        <Descriptions.Item label={t('survey.questions.q9b.title')}>
          {formData.q9b ? t(`survey.questions.q9b.choices.${formData.q9b}`) : '-'}
        </Descriptions.Item>
        <Descriptions.Item label={t('survey.questions.q10.title')}>
          {formData.q10_advise_order_low_risk ? t(`survey.questions.q10.choices.${formData.q10_advise_order_low_risk}`) : '-'}
        </Descriptions.Item>
        <Descriptions.Item label={t('survey.questions.q11.title')}>
          {formData.q11_advise_order_high_risk ? t(`survey.questions.q11.choices.${formData.q11_advise_order_high_risk}`) : '-'}
        </Descriptions.Item>
        {formData.q12 && (
          <Descriptions.Item label={t('survey.questions.q12.title')}>
            {formData.q12}
          </Descriptions.Item>
        )}
      </Descriptions>
    </Card>
  );
  
  const renderFoodPlans = () => {
    const hasLowRisk = formData.food_plan_low_risk && formData.food_plan_low_risk.length > 0;
    const hasHighRisk = formData.food_plan_high_risk && formData.food_plan_high_risk.length > 0;
    
    if (!hasLowRisk && !hasHighRisk) {
      return null;
    }
    
    return (
      <Card title={t('survey.steps.food_plans')} style={{ marginBottom: '20px' }}>
        {hasLowRisk && (
          <div style={{ marginBottom: '20px' }}>
            <h4>{t('survey.food_plan.low_risk_title')}</h4>
            {formData.food_plan_low_risk?.map((entry, index) => (
              <div key={index} style={{ marginBottom: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '4px' }}>
                <strong>{entry.month}</strong> - {entry.food_category}
                <div style={{ marginTop: '5px' }}>
                  {entry.food_items.map(item => (
                    <Tag key={item} color="green" style={{ marginBottom: '4px' }}>
                      {item}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {hasHighRisk && (
          <div>
            <h4>{t('survey.food_plan.high_risk_title')}</h4>
            {formData.food_plan_high_risk?.map((entry, index) => (
              <div key={index} style={{ marginBottom: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '4px' }}>
                <strong>{entry.month}</strong> - {entry.food_category}
                <div style={{ marginTop: '5px' }}>
                  {entry.food_items.map(item => (
                    <Tag key={item} color="red" style={{ marginBottom: '4px' }}>
                      {item}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  };
  
  return (
    <div className={styles.formContent}>
      <h2>{t('survey.steps.review')}</h2>
      
      <Alert
        message={t('survey.review.instructions')}
        type="info"
        showIcon
        style={{ marginBottom: '20px' }}
      />
      
      {renderDemographics()}
      {renderFeedingPractices()}
      {renderFoodPlans()}
    </div>
  );
}