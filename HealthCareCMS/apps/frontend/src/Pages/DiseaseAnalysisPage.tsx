import  { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';

const DiseaseAnalysisPage = () => {
  const { doctorId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  interface ProcessedData {
    diseaseData: { name: string; value: number; percentage: string }[];
    severityData: { name: string; value: number; percentage: string }[];
    statistics: {
      totalCases: number;
      uniqueDiseases: number;
      severityTypes: number;
      mostCommonDisease: [string, number];
      severityPercentages: Record<string, string>;
    };
  }
  
  const [processedData, setProcessedData] = useState<ProcessedData>({
    diseaseData: [],
    severityData: [],
    statistics: {
      totalCases: 0,
      uniqueDiseases: 0,
      severityTypes: 0,
      mostCommonDisease: ['', 0],
      severityPercentages: {}
    }
  });

  interface DiseaseItem {
    doctorId: string;
    disease: string;
    severity: string;
  }

  const processData = useCallback((doctorData: DiseaseItem[]) => {
    if (!doctorData.length) return;

    const diseaseCount: Record<string, number> = {};
    doctorData.forEach(item => {
      diseaseCount[item.disease] = (diseaseCount[item.disease] || 0) + 1;
    });

    const severityCount: Record<string, number> = {};
    doctorData.forEach(item => {
      severityCount[item.severity] = (severityCount[item.severity] || 0) + 1;
    });

    const totalCases = doctorData.length;
    const mostCommonDisease = Object.entries(diseaseCount).sort((a, b) => b[1] - a[1])[0] || ["N/A", 0];

    const statistics = {
      totalCases,
      uniqueDiseases: Object.keys(diseaseCount).length,
      severityTypes: Object.keys(severityCount).length,
      mostCommonDisease,
      severityPercentages: Object.entries(severityCount).reduce((acc, [key, value]) => {
        acc[key] = ((value / totalCases) * 100).toFixed(1);
        return acc;
      }, {} as Record<string, string>)
    };

    setProcessedData({
      diseaseData: Object.entries(diseaseCount).map(([name, value]) => ({
        name,
        value,
        percentage: ((value / totalCases) * 100).toFixed(1)
      })),
      severityData: Object.entries(severityCount).map(([name, value]) => ({
        name,
        value,
        percentage: ((value / totalCases) * 100).toFixed(1)
      })),
      statistics
    });
  }, []);

  // Data fetching and processing logic remains the same
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/cms/v1/doctor/postdiseases');
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const result = await response.json();
        interface DiseaseItem {
          doctorId: string;
          disease: string;
          severity: string;
        }

        const doctorData = result.filter((item: DiseaseItem) => String(item.doctorId) === String(doctorId));
        
        if (!doctorData.length) throw new Error("No data found for this doctor");

        setData(doctorData);
        processData(doctorData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId, processData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Disease Analysis Dashboard</h1>
            <div className="mt-3 sm:mt-4 inline-block bg-blue-50 px-4 sm:px-6 py-2 rounded-lg">
              <p className="text-sm sm:text-base text-blue-600 font-semibold">Doctor ID: {doctorId}</p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6 rounded-xl text-white">
              <h3 className="text-base sm:text-lg font-medium opacity-90">Total Cases</h3>
              <p className="text-2xl sm:text-3xl font-bold mt-2">{processedData.statistics.totalCases}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 sm:p-6 rounded-xl text-white">
              <h3 className="text-base sm:text-lg font-medium opacity-90">Unique Diseases</h3>
              <p className="text-2xl sm:text-3xl font-bold mt-2">{processedData.statistics.uniqueDiseases}</p>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 sm:p-6 rounded-xl text-white">
              <h3 className="text-base sm:text-lg font-medium opacity-90">Most Common</h3>
              <p className="text-xl sm:text-2xl font-bold mt-2">{processedData.statistics.mostCommonDisease[0]}</p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Disease Distribution Chart */}
            <div className="bg-white rounded-xl shadow p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Disease Distribution</h2>
              <div className="h-64 sm:h-96 lg:h-80 xl:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={processedData.diseaseData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: '12px' }} />
                    <YAxis tick={{ fill: '#6B7280', fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]}>
                      {processedData.diseaseData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill="#4F46E5" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Severity Distribution Chart */}
            <div className="bg-white rounded-xl shadow p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Severity Distribution</h2>
              <div className="h-64 sm:h-96 lg:h-80 xl:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={processedData.severityData} 
                      cx="50%" 
                      cy="50%" 
                      label={{
                        fontSize: '12px'
                      }}
                      outerRadius="80%" 
                      dataKey="value"
                      innerRadius="60%"
                    >
                      {processedData.severityData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={["#4F46E5", "#10B981", "#EF4444"][index % 3]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Enhanced Disease Table */}
          <div className="overflow-hidden bg-white rounded-xl shadow">
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Disease Distribution Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">Disease</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">Cases</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">Percentage</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {processedData.diseaseData.map((disease, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{disease.name}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{disease.value}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center">
                          <span className="mr-2">{disease.percentage}%</span>
                          <div className="w-16 sm:w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${disease.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseAnalysisPage;