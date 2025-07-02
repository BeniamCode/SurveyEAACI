import React, { useState, useEffect } from 'react';
import { Collapse, Checkbox, Typography, Card, Space, Divider } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { foodDatabase } from '../data/foodDatabase';

interface FoodItem {
  label: string;
  value: string;
}

interface FoodCategory {
  name: string;
  code: string;
  items: FoodItem[];
}

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface CollapsibleFoodTimelineProps {
  title: string;
  description?: string;
  onChange: (data: MonthFoodData) => void;
  value?: MonthFoodData;
  riskLevel: 'low' | 'high';
}

interface MonthFoodData {
  [month: string]: {
    [categoryCode: string]: string[];
  };
}

const months = [
  { key: 'birth', label: 'Birth' },
  { key: 'month1', label: 'Month 1' },
  { key: 'month2', label: 'Month 2' },
  { key: 'month3', label: 'Month 3' },
  { key: 'month4', label: 'Month 4' },
  { key: 'month5', label: 'Month 5' },
  { key: 'month6', label: 'Month 6' },
  { key: 'month7', label: 'Month 7' },
  { key: 'month8', label: 'Month 8' },
  { key: 'month9', label: 'Month 9' },
  { key: 'month10', label: 'Month 10' },
  { key: 'month11', label: 'Month 11' },
  { key: 'month12', label: 'Month 12' },
  { key: 'month13', label: 'Month 13' },
  { key: 'month14', label: 'Month 14' },
  { key: 'month15', label: 'Month 15' },
  { key: 'month16', label: 'Month 16' },
  { key: 'month17', label: 'Month 17' },
  { key: 'month18', label: 'Month 18' },
];

export default function CollapsibleFoodTimeline({
  title,
  description,
  onChange,
  value = {},
  riskLevel
}: CollapsibleFoodTimelineProps) {
  const [data, setData] = useState<MonthFoodData>(value);
  const [activeMonthPanels, setActiveMonthPanels] = useState<string[]>([]);
  const [activeCategoryPanels, setActiveCategoryPanels] = useState<{[month: string]: string[]}>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    onChange(data);
  }, [data, onChange]);

  const handleFoodItemChange = (month: string, categoryCode: string, foodValue: string, checked: boolean) => {
    setData(prevData => {
      const newData = { ...prevData };
      
      if (!newData[month]) {
        newData[month] = {};
      }
      
      if (!newData[month][categoryCode]) {
        newData[month][categoryCode] = [];
      }
      
      if (checked) {
        // Add food item if not already present
        if (!newData[month][categoryCode].includes(foodValue)) {
          newData[month][categoryCode] = [...newData[month][categoryCode], foodValue];
        }
      } else {
        // Remove food item
        newData[month][categoryCode] = newData[month][categoryCode].filter(item => item !== foodValue);
        
        // Clean up empty arrays
        if (newData[month][categoryCode].length === 0) {
          delete newData[month][categoryCode];
        }
      }
      
      // Clean up empty months
      if (Object.keys(newData[month] || {}).length === 0) {
        delete newData[month];
      }
      
      return newData;
    });
  };

  const handleCategoryPanelChange = (month: string, activePanels: string | string[]) => {
    setActiveCategoryPanels(prev => ({
      ...prev,
      [month]: Array.isArray(activePanels) ? activePanels : [activePanels]
    }));
  };

  const isItemSelected = (month: string, categoryCode: string, foodValue: string): boolean => {
    return data[month]?.[categoryCode]?.includes(foodValue) || false;
  };

  const getSelectedItemsCount = (month: string): number => {
    if (!data[month]) return 0;
    return Object.values(data[month]).reduce((total, items) => total + items.length, 0);
  };

  const getCategorySelectedCount = (month: string, categoryCode: string): number => {
    return data[month]?.[categoryCode]?.length || 0;
  };

  const renderFoodCategory = (month: string, category: FoodCategory) => {
    const selectedCount = getCategorySelectedCount(month, category.code);
    const totalItems = category.items.length;

    return (
      <Panel
        key={category.code}
        header={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text strong>{category.name}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {selectedCount}/{totalItems} selected
            </Text>
          </div>
        }
        style={{ marginBottom: '8px' }}
      >
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '8px',
          padding: '8px 0'
        }}>
          {category.items.map((item: FoodItem) => (
            <Checkbox
              key={item.value}
              checked={isItemSelected(month, category.code, item.value)}
              onChange={(e) => handleFoodItemChange(month, category.code, item.value, e.target.checked)}
              style={{ 
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <span style={{ fontSize: isMobile ? '13px' : '14px' }}>
                {item.label}
              </span>
            </Checkbox>
          ))}
        </div>
      </Panel>
    );
  };

  const renderMonth = (month: { key: string; label: string }) => {
    const selectedCount = getSelectedItemsCount(month.key);
    
    return (
      <Panel
        key={month.key}
        header={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={isMobile ? 5 : 4} style={{ margin: 0 }}>
              {month.label} - Which foods do you recommend introducing?
            </Title>
            <Text 
              type={selectedCount > 0 ? "success" : "secondary"} 
              strong={selectedCount > 0}
              style={{ fontSize: isMobile ? '12px' : '14px' }}
            >
              {selectedCount} foods selected
            </Text>
          </div>
        }
        style={{ marginBottom: '16px' }}
      >
        <div style={{ padding: '16px 0' }}>
          <Text type="secondary" style={{ fontSize: isMobile ? '13px' : '14px', marginBottom: '16px', display: 'block' }}>
            Expand food categories below to select specific items:
          </Text>
          
          <Collapse
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            activeKey={activeCategoryPanels[month.key] || []}
            onChange={(keys) => handleCategoryPanelChange(month.key, keys)}
            size="small"
          >
            {foodDatabase.map(category => renderFoodCategory(month.key, category))}
          </Collapse>
        </div>
      </Panel>
    );
  };

  return (
    <Card 
      style={{ 
        marginTop: '20px',
        backgroundColor: '#fafafa',
        border: '1px solid #d9d9d9'
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <Title level={isMobile ? 4 : 3} style={{ margin: 0, marginBottom: '8px' }}>
          {title}
        </Title>
        {description && (
          <Text type="secondary" style={{ fontSize: isMobile ? '13px' : '14px' }}>
            {description}
          </Text>
        )}
      </div>

      <Divider style={{ margin: '16px 0' }} />

      <div>
        <Text strong style={{ fontSize: isMobile ? '14px' : '16px', marginBottom: '16px', display: 'block' }}>
          Select introduction timeline by month:
        </Text>
        
        <Collapse
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          activeKey={activeMonthPanels}
          onChange={(keys) => setActiveMonthPanels(Array.isArray(keys) ? keys : [keys])}
          size="large"
        >
          {months.map(month => renderMonth(month))}
        </Collapse>
      </div>

      {Object.keys(data).length > 0 && (
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '6px' }}>
          <Text strong style={{ color: '#52c41a', fontSize: isMobile ? '13px' : '14px' }}>
            Summary: You have selected foods for {Object.keys(data).length} month(s) with a total of{' '}
            {Object.values(data).reduce((total, monthData) => 
              total + Object.values(monthData).reduce((monthTotal, items) => monthTotal + items.length, 0), 0
            )} food items.
          </Text>
        </div>
      )}
    </Card>
  );
}