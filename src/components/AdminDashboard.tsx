import React from 'react';
import { Card, Typography, Statistic, Row, Col, Table, Tag } from 'antd';
import { useQuery } from 'convex/react';

const { Title } = Typography;

export default function AdminDashboard() {
  const surveyStats = useQuery("surveyResponses:getSurveyStats");
  const surveyResponses = useQuery("surveyResponses:getSurveyResponses", { limit: 50 });

  if (!surveyStats || !surveyResponses) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      title: 'Participant ID',
      dataIndex: 'participantId',
      key: 'participantId',
      render: (text: string) => text.substring(0, 20) + '...',
    },
    {
      title: 'Profession',
      dataIndex: 'profession',
      key: 'profession',
      render: (profession: string) => profession ? <Tag color="blue">{profession}</Tag> : '-',
    },
    {
      title: 'Country',
      dataIndex: 'countryOfWork',
      key: 'countryOfWork',
    },
    {
      title: 'Age',
      dataIndex: 'surveyData',
      key: 'age',
      render: (surveyData: any) => surveyData?.q3 || '-',
    },
    {
      title: 'Experience (years)',
      dataIndex: 'surveyData',
      key: 'yearsOfPractice',
      render: (surveyData: any) => surveyData?.q4 || '-',
    },
    {
      title: 'Status',
      dataIndex: 'isComplete',
      key: 'status',
      render: (isComplete: boolean) => (
        <Tag color={isComplete ? 'green' : 'orange'}>
          {isComplete ? 'Completed' : 'In Progress'}
        </Tag>
      ),
    },
    {
      title: 'Submitted',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      render: (timestamp: number) => new Date(timestamp).toLocaleDateString(),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Survey Administration Dashboard</Title>
      
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Responses" value={surveyStats.totalResponses} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Completed" value={surveyStats.completedResponses} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Low-Risk Recommendations" value={surveyStats.lowRiskRecommendations} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="High-Risk Recommendations" value={surveyStats.highRiskRecommendations} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={12}>
          <Card title="Profession Breakdown">
            {Object.entries(surveyStats.professionBreakdown).map(([profession, count]) => (
              <div key={profession} style={{ marginBottom: '8px' }}>
                <Tag color="blue">{profession}</Tag>
                <span style={{ marginLeft: '8px' }}>{count}</span>
              </div>
            ))}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Country Breakdown">
            {Object.entries(surveyStats.countryBreakdown).map(([country, count]) => (
              <div key={country} style={{ marginBottom: '8px' }}>
                <Tag color="green">{country}</Tag>
                <span style={{ marginLeft: '8px' }}>{count}</span>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      <Card title="Recent Survey Responses">
        <Table 
          dataSource={surveyResponses} 
          columns={columns} 
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
}