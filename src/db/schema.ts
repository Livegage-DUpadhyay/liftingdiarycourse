import {
  pgTable,
  serial,
  integer,
  smallint,
  varchar,
  real,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import {
  relations,
  type InferSelectModel,
  type InferInsertModel,
} from "drizzle-orm";

// ── Table 1: exercises (global catalog) ──

export const exercises = pgTable("exercises", {
  id: serial().primaryKey(),
  name: varchar({ length: 256 }).notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
});

// ── Table 2: workouts (sessions) ──

export const workouts = pgTable(
  "workouts",
  {
    id: serial().primaryKey(),
    userId: varchar({ length: 256 }).notNull(),
    name: varchar({ length: 256 }),
    startedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp({ withTimezone: true }),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index("workouts_user_id_idx").on(table.userId)]
);

// ── Table 3: workoutExercises (join + ordering) ──

export const workoutExercises = pgTable(
  "workout_exercises",
  {
    id: serial().primaryKey(),
    workoutId: integer()
      .notNull()
      .references(() => workouts.id, { onDelete: "cascade" }),
    exerciseId: integer()
      .notNull()
      .references(() => exercises.id, { onDelete: "cascade" }),
    order: smallint().notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index("workout_exercises_workout_id_idx").on(table.workoutId),
    index("workout_exercises_exercise_id_idx").on(table.exerciseId),
  ]
);

// ── Table 4: workoutSets (individual sets) ──

export const workoutSets = pgTable(
  "workout_sets",
  {
    id: serial().primaryKey(),
    workoutExerciseId: integer()
      .notNull()
      .references(() => workoutExercises.id, { onDelete: "cascade" }),
    setNumber: smallint().notNull(),
    weight: real(),
    reps: integer(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index("workout_sets_workout_exercise_id_idx").on(table.workoutExerciseId),
  ]
);

// ── Relations ──

export const exercisesRelations = relations(exercises, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));

export const workoutsRelations = relations(workouts, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));

export const workoutExercisesRelations = relations(
  workoutExercises,
  ({ one, many }) => ({
    workout: one(workouts, {
      fields: [workoutExercises.workoutId],
      references: [workouts.id],
    }),
    exercise: one(exercises, {
      fields: [workoutExercises.exerciseId],
      references: [exercises.id],
    }),
    sets: many(workoutSets),
  })
);

export const workoutSetsRelations = relations(workoutSets, ({ one }) => ({
  workoutExercise: one(workoutExercises, {
    fields: [workoutSets.workoutExerciseId],
    references: [workoutExercises.id],
  }),
}));

// ── Type exports ──

export type Exercise = InferSelectModel<typeof exercises>;
export type NewExercise = InferInsertModel<typeof exercises>;
export type Workout = InferSelectModel<typeof workouts>;
export type NewWorkout = InferInsertModel<typeof workouts>;
export type WorkoutExercise = InferSelectModel<typeof workoutExercises>;
export type NewWorkoutExercise = InferInsertModel<typeof workoutExercises>;
export type WorkoutSet = InferSelectModel<typeof workoutSets>;
export type NewWorkoutSet = InferInsertModel<typeof workoutSets>;
