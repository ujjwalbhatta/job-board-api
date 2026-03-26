import cron from "node-cron";
import { expireJobs } from "./expireJobs";
import { ScheduledTask } from "node-cron";
import { dailySummary } from "./dailySummary";

const tasks: ScheduledTask[] = [];

export function startCronJobs() {
  tasks.push(cron.schedule("0 * * * *", expireJobs));  // every hour
  tasks.push(cron.schedule("0 0 * * *", dailySummary)); // every day at 12:00
  console.log("Cron jobs started");
}

export function stopCronJobs() {
  tasks.forEach((task) => task.stop());
  console.log("Cron jobs stopped");
}
