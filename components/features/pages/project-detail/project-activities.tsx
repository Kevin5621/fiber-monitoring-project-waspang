import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card";
import { ProjectActivity } from "@/data/project/activities";

interface ProjectActivitiesProps {
  activities: ProjectActivity[];
}

export default function ProjectActivities({ activities }: ProjectActivitiesProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Project Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <p className="text-muted-foreground">No activities found for this project.</p>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <p className="font-medium">{activity.action}</p>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                    {activity.user && (
                      <p className="text-sm text-muted-foreground">By {activity.user}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}