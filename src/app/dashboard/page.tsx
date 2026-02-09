import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { parse } from "date-fns";
import { Dumbbell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "./date-picker";
import { getWorkoutsByDate } from "@/data/workouts";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const params = await searchParams;
  const selectedDate = params.date
    ? parse(params.date, "yyyy-MM-dd", new Date())
    : new Date();
  const workouts = await getWorkoutsByDate(userId, selectedDate);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your workouts and progress
          </p>
        </div>
        <DatePicker date={selectedDate} />
      </div>

      <div className="space-y-4">
        {workouts.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Dumbbell className="mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                No workouts logged for this date.
              </p>
            </CardContent>
          </Card>
        ) : (
          workouts.map((workout) => (
            <Card
              key={workout.id}
              className="transition-shadow duration-200 hover:shadow-md"
            >
              {workout.workoutExercises.map((we) => (
                <div key={we.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                        <Dumbbell className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {we.exercise.name}
                        </CardTitle>
                        <CardDescription>
                          {we.sets.length}{" "}
                          {we.sets.length === 1 ? "set" : "sets"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {we.sets.map((set) => (
                        <div
                          key={set.id}
                          className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-sm transition-colors hover:bg-muted"
                        >
                          <span className="font-medium text-muted-foreground">
                            Set {set.setNumber}
                          </span>
                          <span className="font-medium">
                            {set.reps} reps @ {set.weight} kg
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              ))}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
