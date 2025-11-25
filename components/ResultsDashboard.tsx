import React from 'react';
import { AnalysisResult } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Zap, 
  Map,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultsDashboardProps {
  data: AnalysisResult;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data }) => {
  const getSentimentColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSentimentBg = (score: number) => {
    if (score >= 75) return 'bg-green-100 text-green-800';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Prepare data for chart
  const regionalChartData = data.regionalInsights.map(r => ({
    name: r.region,
    score: r.sentimentScore
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Executive Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Executive Summary</h3>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Recensioni Analizzate</p>
                <p className="text-2xl font-bold text-blue-900">{data.totalReviewsAnalyzed}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-300" />
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Sentiment Nazionale</p>
                <p className={`text-2xl font-bold ${getSentimentColor(data.averageSentiment)}`}>
                  {data.averageSentiment}/100
                </p>
              </div>
              <ThumbsUp className="h-8 w-8 text-purple-300" />
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
             <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600 font-medium">Regioni Coinvolte</p>
                <p className="text-2xl font-bold text-indigo-900">{data.regionalInsights.length}</p>
              </div>
              <Map className="h-8 w-8 text-indigo-300" />
            </div>
          </div>
        </div>
      </div>

      {/* SWOT Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white rounded-xl shadow-sm border border-l-4 border-green-500 overflow-hidden">
          <div className="p-4 bg-green-50 border-b border-green-100 flex items-center">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="font-bold text-green-900">Punti di Forza (Strengths)</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {data.swot.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Weaknesses */}
        <div className="bg-white rounded-xl shadow-sm border border-l-4 border-red-500 overflow-hidden">
          <div className="p-4 bg-red-50 border-b border-red-100 flex items-center">
            <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
            <h3 className="font-bold text-red-900">Punti di Debolezza (Weaknesses)</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {data.swot.weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Opportunities */}
        <div className="bg-white rounded-xl shadow-sm border border-l-4 border-blue-500 overflow-hidden">
          <div className="p-4 bg-blue-50 border-b border-blue-100 flex items-center">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-bold text-blue-900">Opportunità (Opportunities)</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {data.swot.opportunities.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Threats / Criticalities */}
        <div className="bg-white rounded-xl shadow-sm border border-l-4 border-orange-500 overflow-hidden">
          <div className="p-4 bg-orange-50 border-b border-orange-100 flex items-center">
            <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
            <h3 className="font-bold text-orange-900">Criticità / Minacce (Threats)</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {data.swot.threats.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Regional Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <Map className="w-5 h-5 mr-2 text-gray-500" />
          Analisi Territoriale
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalChartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f3f4f6'}}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                  {regionalChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 60 ? '#22c55e' : entry.score > 40 ? '#eab308' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-y-auto max-h-64 pr-2">
            <div className="space-y-3">
              {data.regionalInsights.map((region, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">{region.region}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSentimentBg(region.sentimentScore)}`}>
                      Score: {region.sentimentScore}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-green-600 font-medium block">Pro:</span>
                      <span className="text-gray-600">{region.keyStrength}</span>
                    </div>
                    <div>
                      <span className="text-red-600 font-medium block">Contro:</span>
                      <span className="text-gray-600">{region.keyIssue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};