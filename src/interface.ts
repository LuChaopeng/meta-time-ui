type Activity = 'sleep' | 'workout' | 'note'
export interface TimeProps {
  activity: Activity,
  description: string,
  timestamp: Date
 }
