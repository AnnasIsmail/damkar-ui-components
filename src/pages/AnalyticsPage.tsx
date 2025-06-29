import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Zap, 
  DollarSign,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { useToastActions } from '../components/ui/Toast'

interface MetricCard {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  color: string
}

const metrics: MetricCard[] = [
  {
    title: 'Total Requests',
    value: '12,847',
    change: '+12.5%',
    trend: 'up',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-blue-600'
  },
  {
    title: 'Active Users',
    value: '2,341',
    change: '+8.2%',
    trend: 'up',
    icon: <Users className="w-5 h-5" />,
    color: 'text-green-600'
  },
  {
    title: 'Total Spend',
    value: '$1,247.82',
    change: '-3.1%',
    trend: 'down',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'text-purple-600'
  },
  {
    title: 'Avg Response Time',
    value: '1.2s',
    change: '+0.3s',
    trend: 'down',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'text-orange-600'
  }
]

const usageData = [
  { domain: 'LLM Chat', requests: 4521, tokens: 1250000, cost: 425.30, growth: 15.2 },
  { domain: 'Code Assistant', requests: 3210, tokens: 890000, cost: 312.45, growth: 8.7 },
  { domain: 'Paraphrase', requests: 2847, tokens: 650000, cost: 198.20, growth: 12.1 },
  { domain: 'Grammar Check', requests: 2269, tokens: 420000, cost: 156.87, growth: -2.3 }
]

const timeRanges = [
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: '90d', label: '90 Days' },
  { id: '1y', label: '1 Year' }
]

export function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState('30d')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const toast = useToastActions()

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success('Data Refreshed', 'Analytics data has been updated')
    }, 1500)
  }

  const handleExport = () => {
    toast.info('Export Started', 'Your analytics report is being generated')
  }

  return (
    <div className="h-full overflow-y-auto">
      <PageContainer 
        title="Analytics Dashboard" 
        description="Monitor your AI platform usage and performance metrics"
      >
        <div className="space-y-6">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Time Range:</span>
              </div>
              <div className="flex rounded-lg border p-1">
                {timeRanges.map((range) => (
                  <Button
                    key={range.id}
                    variant={selectedRange === range.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedRange(range.id)}
                    className="h-8"
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                loading={isRefreshing}
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Export
              </Button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${metric.color}`}>
                        {metric.icon}
                      </div>
                      <div className="flex items-center gap-1">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : metric.trend === 'down' ? (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        ) : null}
                        <span className={`text-sm font-medium ${
                          metric.trend === 'up' ? 'text-green-600' :
                          metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold mb-1">{metric.value}</p>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Usage by Domain */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                  <BarChart3 className="w-5 h-5" />
                </div>
                Usage by AI Domain
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usageData.map((domain, index) => (
                  <motion.div
                    key={domain.domain}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{domain.domain}</h3>
                        <Badge 
                          variant={domain.growth > 0 ? 'success' : 'destructive'}
                          className="text-xs"
                        >
                          {domain.growth > 0 ? '+' : ''}{domain.growth}%
                        </Badge>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        ${domain.cost.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Requests:</span>
                        <span className="font-medium">{domain.requests.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Tokens:</span>
                        <span className="font-medium">{domain.tokens.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Avg Cost/Request:</span>
                        <span className="font-medium">${(domain.cost / domain.requests).toFixed(4)}</span>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(domain.requests / Math.max(...usageData.map(d => d.requests))) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className="bg-blue-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Volume Chart */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Request Volume Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm text-muted-foreground">Chart visualization would be here</p>
                    <p className="text-xs text-muted-foreground">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Analysis Chart */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-center">
                    <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm text-muted-foreground">Cost breakdown chart</p>
                    <p className="text-xs text-muted-foreground">Shows spending patterns over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: '2 minutes ago', action: 'LLM Chat request completed', cost: '$0.045' },
                  { time: '5 minutes ago', action: 'Code generation task finished', cost: '$0.032' },
                  { time: '8 minutes ago', action: 'Grammar check performed', cost: '$0.012' },
                  { time: '12 minutes ago', action: 'Text paraphrasing completed', cost: '$0.028' },
                  { time: '15 minutes ago', action: 'API key regenerated', cost: '-' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    {activity.cost !== '-' && (
                      <Badge variant="outline" className="font-mono text-xs">
                        {activity.cost}
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </div>
  )
}