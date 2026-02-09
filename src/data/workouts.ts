import { db } from "@/db";
import { workouts, workoutExercises } from "@/db/schema";
import { eq, and, gte, lt, asc } from "drizzle-orm";

export async function getWorkoutsByDate(userId: string, date: Date) {
  const startOfDay = new Date(date);
startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return db.query.workouts.findMany({
    where: and(
      eq(workouts.userId, userId),
      gte(workouts.startedAt, startOfDay),
      lt(workouts.startedAt, endOfDay)
    ),
    with: {
      workoutExercises: {
        orderBy: [asc(workoutExercises.order)],
        with: {
          exercise: true,
          sets: true,
        },
      },
    },
  });
}
